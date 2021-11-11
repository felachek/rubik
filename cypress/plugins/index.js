const cucumber = require('cypress-cucumber-preprocessor').default 
const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = (on, config) => {

  on('file:preprocessor', cucumber())
  initPlugin(on, config);

  return config
}
