const { createMock } = require('./setup');

const plugin = require('../gatsby-node');

describe('replace webpack config', () => {
  it('should add the getLocalIdent plugin to css-loader v1.*', () => {
    const mockConfig = {
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
    };

    const expectedConfig = {
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
    };

    const { stage, actions, getConfig } = createMock(mockConfig);

    plugin.onCreateWebpackConfig({ stage, actions, getConfig });

    expect(getConfig).toHaveBeenCalledTimes(1);
    expect(actions.replaceWebpackConfig).toHaveBeenCalledTimes(1);
    expect(actions.replaceWebpackConfig).toHaveBeenCalledWith(expectedConfig);
  });
});
