import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [
    typescript(),
    nodeResolve(),
    copy({
      targets: [
        { src: "src/SvgSpriteIcon.js", dest: "dist" },
        { src: "src/runtime-generator.js", dest: "dist" },
      ],
    }),
  ],
};
