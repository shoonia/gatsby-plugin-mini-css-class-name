beforeEach(() => {
  jest.resetAllMocks();
});

exports.createMock = (config) => {
  return {
    stage: 'build-javascript',
    actions: {
      replaceWebpackConfig: jest.fn(),
    },
    getConfig: jest.fn(() => config),
  };
};
