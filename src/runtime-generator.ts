import { stringifyRequest } from "loader-utils";
import { stringifySymbol } from "svg-sprite-loader/lib/utils";

export default ({ symbol, config, context }: any) => {
  const { spriteModule, symbolModule } = config;
  const spriteRequest = stringifyRequest({ context }, spriteModule);
  const symbolRequest = stringifyRequest({ context }, symbolModule);

  return `
    const React = require('react');
    const SpriteSymbol = require('${symbolRequest}');
    const sprite = require('${spriteRequest}');
    
    const symbol = new SpriteSymbol(${stringifySymbol(symbol)});
    sprite.add(symbol);

    const SvgSpriteIcon = (props) => React.createElement(
      'svg',
      Object.assign({
        viewBox: symbol.viewBox
      }, props),
      React.createElement(
        'use',
        {
          xlinkHref: '#' + symbol.id
        }
      )
    )

    module.exports = SvgSpriteIcon;
    module.exports.default = SvgSpriteIcon;
  `;
};
