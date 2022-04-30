# SVG sprite generation for Next.js

## Installation

`const withSvgSprite = require("next-svg-sprite"); ...`

globals.d.ts
`declare module "*.svg?sprite";`

```
import MyIcon from 'icons/icon.svg?sprite'

...

return (
  <>
    <MyIcon width="30" height="30">
  </>
)

```
