const { createMock } = require('./setup');

const plugin = require('../gatsby-node');

describe('replace webpack config', () => {
  it('should add the getLocalIdent plugin to css-loader v1.*', () => {
    const { stage, actions, getConfig } = createMock({
      module: {
        rules: [
          {
            oneOf: [
              {
                test: /\.css$/,
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      localIdentName: '[local]_[hash:base64:4]',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    plugin.onCreateWebpackConfig({ stage, actions, getConfig });

    expect(getConfig).toHaveBeenCalledTimes(1);
    expect(actions.replaceWebpackConfig).toHaveBeenCalledTimes(1);
    expect(actions.replaceWebpackConfig).toHaveBeenLastCalledWith({
      module: {
        rules: [
          {
            oneOf: [
              {
                test: /\.css$/,
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      getLocalIdent: expect.any(Function),
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });
});
