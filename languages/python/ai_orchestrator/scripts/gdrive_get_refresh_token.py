import argparse
import os
from pathlib import Path
from typing import List

from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2 import service_account

# Tentativa de usar o wrapper .NET quando disponível
def _try_dotnet_wrapper(mode: str, client_id: str | None, client_secret: str | None, scopes: list[str] | None):
    """Tenta usar o wrapper .NET para obter refresh token. Retorna o token ou None se não for possível."""
    try:
        # Importa dinamicamente o wrapper no mesmo diretório
        import importlib
        mod = importlib.import_module("gdrive_get_refresh_token_dotnet_wrapper")
        scopes_str = " ".join(scopes) if scopes else None
        token, _out, _err = mod.run_and_capture(mode, client_id, client_secret, scopes_str)
        return token
    except Exception:
        return None

DEFAULT_SCOPES = ["https://www.googleapis.com/auth/drive.file"]


def parse_scopes(scopes_str: str | None) -> List[str]:
    if not scopes_str:
        return DEFAULT_SCOPES
    # Accept comma or space separated
    parts = [p.strip() for p in scopes_str.replace(",", " ").split() if p.strip()]
    return parts or DEFAULT_SCOPES


def write_dotenv(env_path: Path, entries: dict):
    lines = []
    for k, v in entries.items():
        if v is None:
            continue
        lines.append(f"{k}={v}")
    env_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return env_path


def oauth_local_server(client_id: str, client_secret: str, scopes: List[str]):
    client_config = {
        "installed": {
            "client_id": client_id,
            "client_secret": client_secret,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": ["http://localhost"],
        }
    }
    flow = InstalledAppFlow.from_client_config(client_config, scopes)
    creds = flow.run_local_server(port=0)
    return creds.refresh_token


def oauth_device_code(client_id: str, client_secret: str, scopes: List[str]):
    client_config = {
        "installed": {
            "client_id": client_id,
            "client_secret": client_secret,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"],
        }
    }
    flow = InstalledAppFlow.from_client_config(client_config, scopes)
    # This prints the URL and code in the console; doesn't require a local webserver
    creds = flow.run_console()
    return creds.refresh_token


def service_account_info(sa_file: str | None, sa_json_env: str | None, scopes: List[str], subject: str | None):
    # Validate and normalize Service Account configuration.
    import json

    info: dict = {
        "GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON": None,  # either JSON text or absolute path
        "GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT": subject,
    }

    if sa_file and Path(sa_file).exists():
        abs_path = str(Path(sa_file).resolve())
        # Validate by loading credentials
        _ = service_account.Credentials.from_service_account_file(abs_path, scopes=scopes, subject=subject)
        info["GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON"] = abs_path
    elif sa_json_env:
        # If it's a file path in env, allow it as well
        if Path(sa_json_env).exists():
            abs_path = str(Path(sa_json_env).resolve())
            _ = service_account.Credentials.from_service_account_file(abs_path, scopes=scopes, subject=subject)
            info["GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON"] = abs_path
        else:
            try:
                sa_info = json.loads(sa_json_env)
            except json.JSONDecodeError as e:
                raise SystemExit(f"GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON não é um JSON válido nem caminho de arquivo: {e}")
            _ = service_account.Credentials.from_service_account_info(sa_info, scopes=scopes, subject=subject)
            info["GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON"] = sa_json_env
    else:
        raise SystemExit("Forneça --service-account-file ou a variável GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON.")

    return info


def main():
    parser = argparse.ArgumentParser(description="Google Drive auth helper: 3 opções (local-server, device, service-account)")
    parser.add_argument("--mode", choices=["local-server", "device", "service-account"], default="local-server")
    parser.add_argument("--client-id", dest="client_id", default=os.getenv("GOOGLE_DRIVE_CLIENT_ID") or os.getenv("GOOGLE_CLIENT_ID"))
    parser.add_argument("--client-secret", dest="client_secret", default=os.getenv("GOOGLE_DRIVE_CLIENT_SECRET") or os.getenv("GOOGLE_CLIENT_SECRET"))
    parser.add_argument("--scopes", help="Escopos separados por vírgula ou espaço", default=None)
    parser.add_argument("--write-dotenv", dest="dotenv", help="Caminho opcional para salvar um .env com as variáveis.")
    parser.add_argument("--service-account-file", dest="sa_file", help="Caminho para JSON de Service Account")
    parser.add_argument("--subject", dest="subject", help="E-mail para impersonar (Domain-wide Delegation)")

    args = parser.parse_args()
    scopes = parse_scopes(args.scopes)

    if args.mode in ("local-server", "device"):
        if not args.client_id or not args.client_secret:
            raise SystemExit("Defina --client-id e --client-secret ou as variáveis GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET.")

        # 1) Preferir wrapper .NET se disponível (melhor UX e padronização)
        refresh_token = _try_dotnet_wrapper(args.mode, args.client_id, args.client_secret, scopes)

        # 2) Fallback para implementação Python caso .NET não esteja disponível
        if not refresh_token:
            if args.mode == "local-server":
                refresh_token = oauth_local_server(args.client_id, args.client_secret, scopes)
            else:
                refresh_token = oauth_device_code(args.client_id, args.client_secret, scopes)

        # Console output (usa nomes esperados pelo provider)
        print("\nCopie estas variáveis para seu ambiente (.env ou Secrets):")
        print(f"GOOGLE_DRIVE_CLIENT_ID={args.client_id}")
        print(f"GOOGLE_DRIVE_CLIENT_SECRET=<seu_segredo>")
        print(f"GOOGLE_DRIVE_REFRESH_TOKEN={refresh_token}")

        if args.dotenv:
            dotenv_path = Path(args.dotenv)
            write_dotenv(dotenv_path, {
                "GOOGLE_DRIVE_CLIENT_ID": args.client_id,
                "GOOGLE_DRIVE_CLIENT_SECRET": args.client_secret,
                "GOOGLE_DRIVE_REFRESH_TOKEN": refresh_token,
            })
            print(f"\nArquivo .env salvo em: {dotenv_path}")
        print("\nPowerShell (temporário nesta sessão):")
        print(f"$Env:GOOGLE_DRIVE_CLIENT_ID=\"{args.client_id}\"")
        print(f"$Env:GOOGLE_DRIVE_CLIENT_SECRET=\"<seu_segredo>\"")
        print(f"$Env:GOOGLE_DRIVE_REFRESH_TOKEN=\"{refresh_token}\"")

    else:  # service-account
        sa_json_env = os.getenv("GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON")
        info = service_account_info(args.sa_file, sa_json_env, scopes, args.subject)

        print("Service Account configurada. Não há refresh token nesse modo.")
        print("Use estas variáveis:")
        if info.get("GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON"):
            print(f"GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON={info['GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON']}")
        else:
            print("GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON=<JSON ou caminho para sua Service Account>")
        if info.get("GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT"):
            print(f"GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT={info['GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT']}")

        if args.dotenv:
            dotenv_path = Path(args.dotenv)
            write_dotenv(dotenv_path, {
                "GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON": info.get("GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON") or "<JSON-ou-caminho>",
                "GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT": info.get("GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT", ""),
            })
            print(f"\nArquivo .env salvo em: {dotenv_path}")

        print("\nPowerShell (temporário nesta sessão):")
        if info.get("GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON"):
            print(f"$Env:GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON=\"{info['GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON']}\"")
        else:
            print("$Env:GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON=\"<JSON ou caminho para sua Service Account>\"")
        if info.get("GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT"):
            print(f"$Env:GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT=\"{info['GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT']}\"")


if __name__ == "__main__":
    main()
