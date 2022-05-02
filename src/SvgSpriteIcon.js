const React = require("react");
const SpriteSymbol = require("{{symbolPath}}");
const sprite = require("{{spritePath}}");

const symbol = new SpriteSymbol("{{spriteSymbol}}");
sprite.add(symbol);

const SvgSpriteIcon = ({ ...props }) =>
  React.createElement(
    "svg",
    Object.assign(
      {
        viewBox: symbol.viewBox,
      },
      { ...props }
    ),
    React.createElement("use", {
      xlinkHref: "#" + symbol.id,
    })
  );

SvgSpriteIcon.viewBox = symbol.viewBox;
SvgSpriteIcon.id = symbol.id;
SvgSpriteIcon.content = symbol.content;
SvgSpriteIcon.url = symbol.url;
SvgSpriteIcon.toString = symbol.toString;

module.exports = SvgSpriteIcon;
module.exports.default = SvgSpriteIcon;
