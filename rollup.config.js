import { readFileSync } from 'node:fs';

import istanbul from 'rollup-plugin-istanbul';
import { terser } from 'rollup-plugin-terser';

let pkg = require('./package.json');

const copyright = '/*!\n' + readFileSync('./COPYRIGHT') + '\n*/';
const externals = Object.keys(pkg.dependencies);

const globals = Object.assign(
  {},
  ...externals.map(
    external => ({ [external]: external })
  )
);

const plugins = [];

if (process.env.BUILD == 'production') {
  plugins.push(terser({
    keep_classnames: true
  }));
} else {
  plugins.push(istanbul({
    exclude: ['src/**/*.test.js', 'node_modules/**/*']
  }));
}

export default [
  {
    external: externals,
    input: 'src/index.js',
    output: {
      banner: copyright,
      file: pkg.browser,
      format: 'umd',
      globals: globals,
      name: 'Dice',
      sourcemap: true
    },
    plugins: plugins
  },
  {
    external: externals,
    input: 'src/index.js',
    output: {
      banner: copyright,
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    },
    plugins: plugins
  }
];
