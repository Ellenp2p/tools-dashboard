const { defineConfig } = require('@rspack/cli');
const rspack = require('@rspack/core');

module.exports = defineConfig({
  entry: './src/index.tsx',
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ['builtin:lightningcss-loader'],
        type: 'css',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
});