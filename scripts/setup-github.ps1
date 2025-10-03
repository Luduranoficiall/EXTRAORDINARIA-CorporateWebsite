<#
PowerShell helper to initialize git, create GitHub repo (if gh is available), and push.
Usage: Open PowerShell as user and run: .\scripts\setup-github.ps1 -RepoName "my-repo" -Private:$true -AutoPush:$false
#>
param(
  [string]$RepoName = "corporate-website-development",
  [bool]$Private = $true,
  [bool]$AutoPush = $false
)

function Ensure-GitInstalled {
  if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "git not found in PATH. Please install Git and retry."
    exit 1
  }
}

Ensure-GitInstalled

if (-not (Test-Path .git)) {
  git init
  git add -A
  git commit -m "chore: initial commit"
  Write-Host "Git repo initialized and initial commit created."
} else {
  Write-Host ".git already exists — skipping git init."
}

# If gh CLI exists, try to create remote repo
$gh = Get-Command gh -ErrorAction SilentlyContinue
if ($gh) {
  Write-Host "gh CLI found — attempting to create repo '$RepoName' on GitHub (you may be prompted to login)."
  $createCmd = "gh repo create $RepoName --public"
  if ($Private) { $createCmd = "gh repo create $RepoName --private" }
  Invoke-Expression $createCmd
  # set remote if created
  $remoteUrl = git remote get-url origin 2>$null
  if (-not $remoteUrl) {
    # fetch url from gh
    $info = gh repo view --json sshUrl,cloneUrl -q .
    if ($info) {
      try { git remote add origin (gh repo view --json cloneUrl -q .) } catch { }
    }
  }
  Write-Host "Remote should be configured."
} else {
  Write-Host "gh CLI not found; skipping remote creation. You can add remote manually: git remote add origin <url>"
}

if ($AutoPush) {
  Write-Host "Pushing to origin/main..."
  git branch -M main
  git push -u origin main
}

Write-Host "Setup complete. Review .git/config and run 'git remote -v' to confirm."