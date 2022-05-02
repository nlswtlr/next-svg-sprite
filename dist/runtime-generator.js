const { stringifyRequest } = require("loader-utils");
const { stringifySymbol } = require("svg-sprite-loader/lib/utils");

module.exports = ({ symbol, config, context }) => {
  const { spriteModule, symbolModule } = config;
  const spriteRequest = stringifyRequest({ context }, spriteModule);
  const symbolRequest = stringifyRequest({ context }, symbolModule);

  return `
    const React = require('react');
    const SpriteSymbol = require('${symbolRequest}');
    const sprite = require('${spriteRequest}');
    
    const symbol = new SpriteSymbol(${stringifySymbol(symbol)});
    sprite.add(symbol);

    const SvgSpriteIcon = ({...props}) => React.createElement(
      'svg',
      Object.assign({
        viewBox: symbol.viewBox
      }, {...props}),
      React.createElement(
        'use',
        {
          xlinkHref: '#' + symbol.id
        }
      )
    )

    SvgSpriteIcon.viewBox = symbol.viewBox;
    SvgSpriteIcon.id = symbol.id;
    SvgSpriteIcon.content = symbol.content;
    SvgSpriteIcon.url = symbol.url;
    SvgSpriteIcon.toString = symbol.toString;

    module.exports = SvgSpriteIcon;
    module.exports.default = SvgSpriteIcon;

  `;
};
