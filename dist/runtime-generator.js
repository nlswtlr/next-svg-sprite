const { sep } = require("path");
const { stringifySymbol } = require("svg-sprite-loader/lib/utils");

module.exports = ({ symbol, config }) => {
  const { spriteModule, symbolModule } = config;
  const nmBasePath = `${process.cwd()}${sep}node_modules${sep}`;

  return `
    const React = require('react');
    const SpriteSymbol = require('${symbolModule.replace(nmBasePath, "")}');
    const sprite = require('${spriteModule.replace(nmBasePath, "")}');
    
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
