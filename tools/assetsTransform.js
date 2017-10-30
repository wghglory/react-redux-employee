// 保证 jest 能够处理静态资源 import，比如 image import。在 package.json jest 部分配置
const path = require('path');

module.exports = {
  process(src, filename /*, config, options */) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  }
};
