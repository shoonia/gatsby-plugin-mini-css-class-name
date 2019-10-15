const cloneDeepWith = require("lodash/cloneDeepWith");
// const miniClassNames = require("mini-css-class-name/css-loader");

function getGenerator(options) {
  // TODO:
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }, options) => {
  if (stage.includes("build")) {
    const config = getConfig();

    config.module.rules = cloneDeepWith(config.module.rules, (value, key) => {
      if (key === "options" && value.modules) {
        return {
          ...value,
          localIdentName: undefined,
          getLocalIdent: getGenerator(options),
        };
      }
    });

    actions.replaceWebpackConfig(config);
  }
};
