const cloneDeepWith = require("lodash/cloneDeepWith");
const miniClassNames = require("mini-css-class-name/css-loader");

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }, options) => {
  if (stage.includes("build")) {
    const config = getConfig();
    const getLocalIdent = miniClassNames(options);

    config.module.rules = cloneDeepWith(config.module.rules, (value, key) => {
      if (key === "options" && value.modules) {
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
