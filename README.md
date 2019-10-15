# gatsby-plugin-mini-css-class-name

Minifying CSS class name

## Install
```bash
```

## How to use
```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-mini-css-class-name`,
      options: {
        prefix: "x__",
        suffix: "--",
        hash: 4,
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

## License
[MIT](./LICENSE)
