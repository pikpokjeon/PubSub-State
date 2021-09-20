import {nodeResolve} from "@rollup/plugin-node-resolve"
import babel from '@rollup/plugin-babel';

export default {
  input: "./src/lib/pubsub.js",
  plugins: [nodeResolve(), babel({babelHelpers: 'bundled'})],
  output: [
    {
      name: 'Pubsub',
      dir: "dist/cjs",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
  ],
}