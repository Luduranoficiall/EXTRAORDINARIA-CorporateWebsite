"""Cria um repositório GitHub via API e faz push do repositório local para origin.

Usa as variáveis de ambiente GITHUB_TOKEN e (opcional) GITHUB_OWNER.
"""
import os
import sys
import subprocess
import json
from urllib import request, parse


def run(cmd, check=True):
    print('>>>', ' '.join(cmd))
    res = subprocess.run(cmd, check=check)
    return res.returncode


def create_remote_repo(name, token):
    payload = json.dumps({"name": name}).encode('utf8')
    req = request.Request('https://api.github.com/user/repos', data=payload, headers={
        'Authorization': f'token {token}', 'Content-Type': 'application/json', 'User-Agent': 'python-script'
    })
    with request.urlopen(req) as resp:
        data = resp.read().decode()
        return json.loads(data)


def main():
    token = os.environ.get('GITHUB_TOKEN')
    if not token:
        print('GITHUB_TOKEN not set')
        sys.exit(1)
    owner = os.environ.get('GITHUB_OWNER') or os.environ.get('USER') or 'owner'
    repo = sys.argv[1] if len(sys.argv) > 1 else 'CorporateWebsite'

    print('Creating remote repo', repo)
    try:
        resp = create_remote_repo(repo, token)
        print('Created:', resp.get('full_name'))
    except Exception as e:
        print('Failed to create repo via API:', e)

    # configure remote and push
    try:
        # remove origin if exists
        subprocess.run(['git', 'remote', 'remove', 'origin'], check=False)
        remote_url = f'https://{owner}:{token}@github.com/{owner}/{repo}.git'
        run(['git', 'remote', 'add', 'origin', remote_url])
        run(['git', 'branch', '-M', 'master'])
        run(['git', 'push', '-u', 'origin', 'master', '--force'])
        print('Pushed to remote')
    except Exception as e:
        print('Push failed:', e)


if __name__ == '__main__':
    main()
"""Cria um repositório no GitHub via API usando GITHUB_TOKEN e faz push do remote 'origin'.
Uso: set GITHUB_TOKEN na sessão e rode: python gh_push_via_token.py <repo-name> [--private]
"""
from __future__ import annotations
import os
import subprocess
import sys
import json
from pathlib import Path
from urllib.request import Request, urlopen


def api_create_repo(name: str, private: bool = True):
    token = os.getenv('GITHUB_TOKEN')
    if not token:
        print('GITHUB_TOKEN não definido')
        return None
    url = 'https://api.github.com/user/repos'
    data = json.dumps({'name': name, 'private': private}).encode('utf-8')
    req = Request(url, data=data, headers={'Authorization': f'token {token}', 'Content-Type': 'application/json'})
    try:
        with urlopen(req) as resp:
            return json.load(resp)
    except Exception as e:
        print('Erro criando repositório:', e)
        return None


def run_git_push(repo_name: str, private: bool = True):
    root = Path(__file__).parents[2]
    resp = api_create_repo(repo_name, private)
    if not resp:
        return 2
    clone_url = resp.get('clone_url')
    if not clone_url:
        print('Resposta da API não contém clone_url')
        return 2
    # use token in remote temporarily
    token = os.getenv('GITHUB_TOKEN')
    auth_url = clone_url.replace('https://', f'https://{token}@')
    subprocess.check_call(['git', 'remote', 'add', 'origin', auth_url])
    subprocess.check_call(['git', 'push', '-u', 'origin', 'HEAD'])
    # reset remote to remove token
    subprocess.check_call(['git', 'remote', 'set-url', 'origin', clone_url])
    print('Repo criado em:', resp.get('html_url'))
    return 0


def main():
    if len(sys.argv) < 2:
        print('Uso: python gh_push_via_token.py <repo-name> [--private]')
        sys.exit(1)
    name = sys.argv[1]
    private = '--private' in sys.argv
    sys.exit(run_git_push(name, private))


if __name__ == '__main__':
    main()
