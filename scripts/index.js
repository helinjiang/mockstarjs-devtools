const path = require('path');
const shelljs = require('shelljs');

const dirs = ['sidebar', 'panel'];
const cwd = process.cwd();

(function () {
  const isInstall = process.env.install;

  // 删除文件
  shelljs.rm('-rf', 'build');
  shelljs.cp('-r', 'public', 'build');

  // 编译打包
  for (const item of dirs) {
    const current = path.resolve(cwd, item);

    if (isInstall) {
      shelljs.exec('tnpm i', { cwd: current });
    }

    shelljs.exec('tnpm run build', { cwd: current });

    shelljs.cp(
      '-r',
      path.resolve(current, 'build'),
      path.resolve(`build/${item}`)
    );
  }
})();
