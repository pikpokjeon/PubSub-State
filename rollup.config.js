import {nodeResolve} from "@rollup/plugin-node-resolve"
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: "./src/lib/pubsub.js",
  plugins: [nodeResolve(), babel({babelHelpers: 'bundled'}), commonjs()],
  output: [
    {
      name: 'Pubsub',
      dir: "dist/cjs",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      name: 'Pubsub',
      dir: "dist/umd",
      format: "umd",
      exports: "named",
      sourcemap: true,
    },
    {
      name: 'Pubsub',
      dir: "dist/es",
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
}
