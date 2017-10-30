/* eslint-disable no-console */
import webpack from 'webpack';
import config from '../webpack.config.prod';
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from './chalkConfig';

process.env.NODE_ENV = 'production'; // 确保 react 运行生产模式

console.log(chalkProcessing('正在生成压缩打包文件。。。'));

webpack(config).run((error, stats) => {
  if (error) {
    console.log(chalkError(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map((error) => console.log(chalkError(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalkWarning('webpack 发现了一些警告: '));
    jsonStats.warnings.map((warning) => console.log(chalkWarning(warning)));
  }

  console.log(`Webpack 状态: ${stats}`);

  console.log(chalkSuccess('打包成功了，请看 dist 目录'));

  return 0;
});
