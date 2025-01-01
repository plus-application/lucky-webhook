/**
 * 以环境变量为主
 * @param {*} config 
 * @param {*} prefix 
 */
function resolveConfig(config, prefix = '') {
    const resolvedConfig = {};
  
    for (const key in config) {
      if (typeof config[key] === 'object' && !Array.isArray(config[key])) {
        resolvedConfig[key] = resolveConfig(config[key], `${prefix}${key.toUpperCase()}_`);
      } else {
        resolvedConfig[key] = process.env[`${prefix}${key.toUpperCase()}`] || config[key];
      }
    }
  
    return resolvedConfig;
  }

  module.exports = {
    resolveConfig
  }