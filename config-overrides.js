const { injectBabelPlugin, compose } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const lessVariables = require('./less-variables');

function lazyLoadComponentStyles() {
  return config =>
    injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
}

function addLessCompiler(variables = {}) {
  return (config, env) =>
    rewireLess.withLoaderOptions({
      modifyVars: variables,
    })(config, env);
}

module.exports = compose(
  lazyLoadComponentStyles(),
  addLessCompiler(lessVariables),
);
