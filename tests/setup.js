beforeEach(() => {
  jest.resetAllMocks();
});

const createMock = (config) => {
  return {
    stage: 'build-javascript',
    actions: { replaceWebpackConfig: jest.fn() },
    getConfig: () => config,
  };
};

module.exports = {
  createMock,
};
