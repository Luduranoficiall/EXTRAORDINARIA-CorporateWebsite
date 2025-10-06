const fs = require('fs');
const { execSync } = require('child_process');

function run(cmd) {
  console.log(`$ ${cmd}`);
  try { console.log(execSync(cmd, { stdio: 'inherit' })); } catch (e) { console.error(e.message); process.exit(1); }
}

const repo = process.argv[2] || 'CorporateWebsite';
const owner = process.env.GITHUB_OWNER || process.env.USER || 'owner';
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('GITHUB_TOKEN not set in environment');
  process.exit(1);
}

// create remote via API
const repoName = `${owner}/${repo}`;
console.log('Creating repo', repoName);
try {
  execSync(`curl -H "Authorization: token ${token}" -d '{\"name\":\"${repo}\"}' https://api.github.com/user/repos`, { stdio: 'inherit' });
} catch (e) {
  console.error('Failed to create repo via API:', e.message);
}

// push
try {
  execSync('git remote remove origin || true', { stdio: 'inherit', shell: true });
  execSync(`git remote add origin https://github.com/${owner}/${repo}.git`, { stdio: 'inherit', shell: true });
  execSync('git branch -M master', { stdio: 'inherit', shell: true });
  execSync('git push -u origin master --force', { stdio: 'inherit', shell: true });
  console.log('Pushed to remote');
} catch (e) {
  console.error('Push failed:', e.message);
  process.exit(1);
}
