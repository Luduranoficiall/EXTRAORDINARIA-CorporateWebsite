import os
import subprocess
import sys


def test_generate_creates_files():
    here = os.path.dirname(__file__)
    script = os.path.join(here, 'generate_gotm.py')
    # Run the generator
    result = subprocess.run([sys.executable, script], capture_output=True, text=True)
    if result.returncode != 0:
        print('STDOUT:\n', result.stdout)
        print('STDERR:\n', result.stderr)
    assert result.returncode == 0, f"Generator failed with code {result.returncode}"

    repo_root = os.path.abspath(os.path.join(here, '..', '..', '..', '..'))
    md = os.path.join(repo_root, 'docs', 'BotGPT_GoToMarket.md')
    html = os.path.join(repo_root, 'docs', 'botgpt_landing_snippet.html')
    assert os.path.exists(md), 'Markdown output not found'
    assert os.path.exists(html), 'HTML snippet not found'


if __name__ == '__main__':
    test_generate_creates_files()
    print('OK')
