const { createMock } = require('./setup');

const plugin = require('../gatsby-node');

describe('replace webpack config with Gatsby v3', () => {
  it('should add the getLocalIdent plugin to css-loader v5.*', () => {
    const { stage, actions, getConfig } = createMock({
      module: {
        rules: [
          {
            oneOf: [
              {
                test: /\.css$/,
                use: [
                  {
                    loader: '/Users/bob/Desktop/blog/node_modules/css-loader/dist/cjs.js',
                    options: {
                      sourceMap: false,
                      modules: {
                        namedExport: true,
                        localIdentName: '[local]_[hash:base64:4]',
                        exportLocalsConvention: 'dashesOnly',
                        exportOnlyLocals: true
                      }
                    }
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    plugin.onCreateWebpackConfig({ stage, actions, getConfig });

    expect(actions.replaceWebpackConfig).toHaveBeenCalledTimes(1);
    expect(actions.replaceWebpackConfig).toHaveBeenCalledWith({
      module: {
        rules: [
          {
            oneOf: [
              {
                test: /\.css$/,
                use: [
                  {
                    loader: '/Users/bob/Desktop/blog/node_modules/css-loader/dist/cjs.js',
                    options: {
                      sourceMap: false,
                      modules: {
                        namedExport: true,
                        exportLocalsConvention: 'dashesOnly',
                        exportOnlyLocals: true,
                        getLocalIdent: expect.any(Function),
                      }
                    }
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
