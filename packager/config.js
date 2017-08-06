const npmconfig = require("../package.json");

const config = {
  dir: './',
  out: './dist',
  name: npmconfig.name,
  platform: 'darwin',
  arch: 'x64',
  electronVersion: '1.6.11',
  appBundleId: 'me.muraka' + npmconfig.name,
  appVersion: npmconfig.version,
  appCopyright: "piroz",
  overwrite: true,
  asar: true,
  prune: true,
  // 無視ファイル
  ignore: "node_modules/(electron-packager|electron-prebuilt|\.bin)|front/src",
};

module.exports = config;