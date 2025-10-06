const { spawnSync } = require('child_process');
const path = require('path');

function run(cmd, args, opts) {
  console.log(`$ ${cmd} ${args.join(' ')}`);
  const res = spawnSync(cmd, args, { stdio: 'inherit', shell: true, ...opts });
  if (res.error) console.error(res.error);
  return res.status;
}

// Run python tests fallback for environments with python
run('node', [path.join(__dirname, 'sample_crypto.js')]);

// Run Java tests if mvn available
run('mvn', ['-f', path.join('languages','java'), 'test']);

console.log('\nRunner finished.');
