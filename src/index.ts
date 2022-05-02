import path from "path";

const withSvgSprite = ({ ...nextConfig }) => {
  return Object.assign({}, nextConfig, {
    // TODO: enhance types
    webpack(config: any, options: any) {
      // TODO: enhance types
      config.module.rules.forEach((rule: any) => {
        if (rule.loader === "next-image-loader") {
          const origRule = Object.assign({}, rule);

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
                  runtimeGenerator: path.resolve(
                    process.cwd(),
                    "node_modules",
                    "next-svg-sprite",
                    "dist",
                    "runtime-generator.js"
                  ),
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

export default withSvgSprite;
