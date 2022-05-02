'use strict';

var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var withSvgSprite = function (_a) {
    var nextConfig = __rest(_a, []);
    return Object.assign({}, nextConfig, {
        // TODO: enhance types
        webpack: function (config, options) {
            // TODO: enhance types
            config.module.rules.forEach(function (rule) {
                if (rule.loader === "next-image-loader") {
                    var origRule = Object.assign({}, rule);
                    delete rule.loader;
                    delete rule.options;
                    rule.oneOf = [];
                    rule.oneOf.push({
                        resourceQuery: /sprite/,
                        use: [
                            {
                                loader: "svg-sprite-loader",
                                options: {
                                    symbolId: "[name]-[hash:8]",
                                    runtimeGenerator: path__default["default"].resolve(process.cwd(), "node_modules", "next-svg-sprite", "dist", "runtime-generator.js"),
                                },
                            },
                        ],
                    });
                    rule.oneOf.push({
                        use: [
                            {
                                loader: "next-image-loader",
                                options: origRule.options,
                            },
                        ],
                    });
                }
            });
            return config;
        },
    });
};

module.exports = withSvgSprite;
