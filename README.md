# gatsby-plugin-mini-css-class-name

Minifying CSS class names if using [CSS Modules](https://www.gatsbyjs.org/docs/css-modules/).

## Install
```bash
npm i gatsby-plugin-mini-css-class-name
#or
yarn add gatsby-plugin-mini-css-class-name
```

## How to use
```js
// In your gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-mini-css-class-name`],
}
```
If you need to pass plugin [options](#options):
```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-mini-css-class-name`,
      options: {
        prefix: `x-`,
      },
    },
  ],
}
```

> ⚠️ This plugin must be the last plugin witch work with CSS in your `gatsby-config.js`. This plugin contributes change to Webpack config and other plugins can delete the changes.

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-mini-css-class-name`, // after PostCSS
  ],
}
```

## Options
|    Name          |   Type     | Default | Description |
|:----------------:|:----------:|:-------:|:-----------:|
| **prefix**       | `{String}` |  `""`   | A custom prefix will be added to each class name
| **suffix**       | `{String}` |  `""`   | A custom suffix will be added to each class name
|**excludePattern**| `{RegExp}` | `null`  | A regular expression for removing characters

> [mini-css-class-name](https://github.com/shoonia/mini-css-class-name#readme)

## License
[MIT](./LICENSE)
