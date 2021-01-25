const cloneDeepWith = require('lodash/cloneDeepWith');
const miniClassName = require('mini-css-class-name');

const cache = new Map();

const createLocaiIdent = (options) => {
  const generate = miniClassName(options);

  return (context, _, localName) => {
    const key = context.resourcePath + localName;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const className = generate();

    cache.set(key, className);

    return className;
  };
};

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }, options) => {
  if (stage.includes('build')) {
    const config = getConfig();
    const getLocalIdent = createLocaiIdent(options);

    config.module.rules = cloneDeepWith(config.module.rules, (value, key) => {
      if (key === 'options' && value.modules === true) {
        return {
          ...value,
          localIdentName: undefined,
          getLocalIdent: getLocalIdent,
        };
      }
    });

    actions.replaceWebpackConfig(config);
  }
};
