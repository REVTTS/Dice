import istanbul from 'rollup-plugin-istanbul';

let pkg = require('./package.json');
let externals = Object.keys(pkg.dependencies);

const globals = Object.assign(
  {},
  ...externals.map(
    external => ({ [external]: external })
  )
);

const plugins = [];

if (process.env.BUILD !== 'production') {
  plugins.push(istanbul({
    exclude: ['src/**/*.test.js', 'node_modules/**/*']
  }));
}

export default [
  {
    external: externals,
    input: 'src/index.js',
    output: {
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
      file: pkg.module,
      format: 'esm',
    },
    plugins: plugins
  }
];
