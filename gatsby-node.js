const cloneDeepWith = require('lodash/cloneDeepWith');
const createLocaiIdent = require('mini-css-class-name/css-loader');

const cache = new Map();
const isString = (val) => typeof val === 'string';

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }, options) => {
  if (stage.includes('build')) {
    const config = getConfig();
    const getLocalIdent = createLocaiIdent({ cache, ...options });

    config.module.rules = cloneDeepWith(config.module.rules, (value, key) => {
      if (key === 'options') {
        // css-loader <= v2.0.0
        if (value.modules === true && isString(value.localIdentName)) {
          delete value.localIdentName;

          value.getLocalIdent = getLocalIdent;
        }

        // css-loader >= v3.0.0
        else if (isString(value.modules?.localIdentName)) {
          delete value.modules.localIdentName;

          value.modules.getLocalIdent = getLocalIdent;
        }

        return value;
      }
    });

    actions.replaceWebpackConfig(config);
  }
};

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    prefix: Joi.string(),
    suffix: Joi.string(),
    excludePattern: Joi.object().regex(),
  });
};
