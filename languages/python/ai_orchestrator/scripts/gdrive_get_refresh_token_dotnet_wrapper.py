import os
import re
import platform
import subprocess
from pathlib import Path
from typing import Optional, Tuple

# Structure reference:
# current file: CorporateWebsite/languages/python/ai_orchestrator/scripts/gdrive_get_refresh_token_dotnet_wrapper.py
# we want:       CorporateWebsite/languages/dotnet/GDriveAuthTool
LANGUAGES_DIR = Path(__file__).resolve().parents[3]
DOTNET_DIR = LANGUAGES_DIR / "dotnet" / "GDriveAuthTool"
CS_PROJ = DOTNET_DIR / "GDriveAuthTool.csproj"

def _detect_rid_and_bin() -> Tuple[str, Path]:
    sys = platform.system().lower()
    if sys.startswith("win"):
        rid = "win-x64"
        bin_name = "GDriveAuthTool.exe"
    elif sys == "darwin":
        rid = "osx-x64"
        bin_name = "GDriveAuthTool"
    else:
        rid = "linux-x64"
        bin_name = "GDriveAuthTool"
    bin_path = DOTNET_DIR / "bin" / "Release" / "net9.0" / rid / "publish" / bin_name
    return rid, bin_path


def ensure_published() -> Path:
    rid, dotnet_tool = _detect_rid_and_bin()
    if dotnet_tool.exists():
        return dotnet_tool
    # Publish if not present
    cmd = ["dotnet", "publish", str(CS_PROJ), "-c", "Release", "-r", rid, "--self-contained", "false"]
    subprocess.run(cmd, check=True)
    return dotnet_tool


def run_and_capture(mode: str, client_id: Optional[str], client_secret: Optional[str], scopes: Optional[str]) -> Tuple[str, str, str]:
    dotnet_tool = ensure_published()
    args = [str(dotnet_tool), "--mode", mode]
    if client_id:
        args += ["--client-id", client_id]
    if client_secret:
        args += ["--client-secret", client_secret]
    if scopes:
        args += ["--scopes", scopes]
    proc = subprocess.run(args, check=True, text=True, capture_output=True)
    out = proc.stdout
    # Parse the output lines to grab the token
    m = re.search(r"GOOGLE_DRIVE_REFRESH_TOKEN=([0-9A-Za-z_\-/.~]+)", out)
    if not m:
        raise SystemExit("Não foi possível encontrar o refresh token na saída do utilitário .NET")
    refresh_token = m.group(1)
    # Also capture echo suggestions
    return refresh_token, out, proc.stderr


if __name__ == "__main__":
    import argparse

    p = argparse.ArgumentParser()
    p.add_argument("--mode", choices=["local-server", "device"], default="local-server")
    p.add_argument("--client-id", dest="client_id", default=os.getenv("GOOGLE_DRIVE_CLIENT_ID") or os.getenv("GOOGLE_CLIENT_ID"))
    p.add_argument("--client-secret", dest="client_secret", default=os.getenv("GOOGLE_DRIVE_CLIENT_SECRET") or os.getenv("GOOGLE_CLIENT_SECRET"))
    p.add_argument("--scopes", default=None)
    p.add_argument("--write-dotenv", dest="dotenv", default=None)
    args = p.parse_args()

    if args.mode in ("local-server", "device"):
        if not args.client_id or not args.client_secret:
            raise SystemExit("Defina --client-id e --client-secret ou as variáveis GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET.")
        token, out, _ = run_and_capture(args.mode, args.client_id, args.client_secret, args.scopes)
        print(out)
        if args.dotenv:
            Path(args.dotenv).write_text(
                f"GOOGLE_DRIVE_CLIENT_ID={args.client_id}\nGOOGLE_DRIVE_CLIENT_SECRET={args.client_secret}\nGOOGLE_DRIVE_REFRESH_TOKEN={token}\n",
                encoding="utf-8",
            )
            print(f"\nArquivo .env salvo em: {args.dotenv}")
    else:
        raise SystemExit("Use o utilitário Python original para service-account, ou execute o .NET com --mode service-account.")
