const cloneDeepWith = require('lodash/cloneDeepWith');
const isString = require('lodash/isString');
const has = require('lodash/has');
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
      if (key === 'options') {
        // css-loader <= v2.0.0
        if (value.modules === true && isString(value.localIdentName)) {
          delete value.localIdentName;

          value.getLocalIdent = getLocalIdent;
        }

        // css-loader >= v3.0.0
        else if (has(value, 'modules.localIdentName') && isString(value.modules.localIdentName)) {
          delete value.modules.localIdentName;

          value.modules.getLocalIdent = getLocalIdent;
        }

        return value;
      }
    });

    actions.replaceWebpackConfig(config);
  }
};
