#!/usr/bin/env bash
set -euo pipefail
MODE="${1:-local-server}"
CLIENT_ID="${CLIENT_ID:-}"
CLIENT_SECRET="${CLIENT_SECRET:-}"
SCOPES="${SCOPES:-}"
DOTENV="${DOTENV:-}"
SA_FILE="${SA_FILE:-}"
SUBJECT="${SUBJECT:-}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJ_PATH="$SCRIPT_DIR/GDriveAuthTool.csproj"
RID="linux-x64"
OS="$(uname -s)"
if [[ "$OS" == "Darwin" ]]; then RID="osx-x64"; fi
BIN="$SCRIPT_DIR/bin/Release/net9.0/$RID/publish/GDriveAuthTool"

if [[ ! -f "$BIN" ]]; then
  dotnet publish "$PROJ_PATH" -c Release -r "$RID" --self-contained=false
fi

ARGS=("--mode" "$MODE")
[[ -n "$CLIENT_ID" ]] && ARGS+=("--client-id" "$CLIENT_ID")
[[ -n "$CLIENT_SECRET" ]] && ARGS+=("--client-secret" "$CLIENT_SECRET")
[[ -n "$SCOPES" ]] && ARGS+=("--scopes" "$SCOPES")
[[ -n "$DOTENV" ]] && ARGS+=("--write-dotenv" "$DOTENV")
[[ -n "$SA_FILE" ]] && ARGS+=("--service-account-file" "$SA_FILE")
[[ -n "$SUBJECT" ]] && ARGS+=("--subject" "$SUBJECT")

"$BIN" "${ARGS[@]}"
