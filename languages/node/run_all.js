const { execSync } = require('child_process');

function run(cmd) {
  console.log('\n$ ' + cmd);
  try {
    const out = execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error('Command failed:', e.message);
  }
}

run('node ./languages/node/sample_crypto.js');
