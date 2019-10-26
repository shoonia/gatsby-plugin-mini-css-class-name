# gatsby-plugin-mini-css-class-name

Minifying CSS class names if using [css-modules](https://github.com/css-modules/css-modules#readme).

> [mini-css-class-name](https://github.com/shoonia/mini-css-class-name#readme)

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

## Options
|    Name          |   Type     | Default | Description |
|:----------------:|:----------:|:-------:|:-----------:|
| **prefix**       | `{String}` |  `""`   | A custom prefix will be added to each class name
| **suffix**       | `{String}` |  `""`   | A custom suffix will be added to each class name
|  **hash**        | `{Number}` |   `0`   | A length of generating a random hash tail for each class name
|**excludePattern**| `{RegExp}` | `null`  | A regular expression for removing characters

> ⚠️ This plugin contributes change to Webpack config that way this plugin must be the last plugin witch work with CSS in your `gatsby-config.js`

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-mini-css-class-name`, // after PostCSS
  ],
}
```

## License
[MIT](./LICENSE)
