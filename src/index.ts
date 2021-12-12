import path from "path";

export default ({ ...nextConfig }) => {
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
                  runtimeGenerator: path.resolve(__dirname, "rtg.js"),
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
