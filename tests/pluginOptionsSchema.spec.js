const { testPluginOptionsSchema } = require('gatsby-plugin-utils');

const { pluginOptionsSchema } = require('../gatsby-node');

describe('Options Schema', () => {
  it('should be valid with empty options', async () => {
    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, {});

    expect(isValid).toBe(true);
    expect(errors).toEqual([]);
  });

  it('should be valid a schema', async () => {
    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, {
      prefix: 'a',
      suffix: 'b',
      excludePattern: /x/,
    });

    expect(isValid).toBe(true);
    expect(errors).toEqual([]);
  });

  it('should be invalid a schema', async () => {
    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, {
      prefix: 1,
      suffix: 2,
      excludePattern: 3,
    });

    expect(isValid).toBe(false);
    expect(errors).toEqual([
      '"prefix" must be a string',
      '"suffix" must be a string',
      '"excludePattern" must be of type object',
    ]);
  });
});
