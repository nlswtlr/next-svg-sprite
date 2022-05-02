# SVG Sprite Generator for Next.js

## Installation

Install the Next SVG Sprite package with the needed dependencies: `npm i next-svg-sprite svg-sprite-loader svg-baker-runtime`

## Usage

Import the plugin in the `next.config.js` file via:

```
const withSvgSprite = require("next-svg-sprite");

[...]

module.exports = withSvgSprite({})
```

## Typescript

If your are using Typescript declare a module for the query string imports: `declare module "*.svg?sprite";`

## Usage

```
import MyIcon from 'icons/icon.svg?sprite'

[...]

return (
  <>
    <MyIcon width="30" height="30">
  </>
)
```
