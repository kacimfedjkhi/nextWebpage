const HtmlWebPackPlugin = require(`html-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const postcssPresetEnv = require(`postcss-preset-env`);
const OptimizeCSSAssetsPlugin = require(`optimize-css-assets-webpack-plugin`);
const webpack = require(`webpack`);

const HtmlCriticalWebpackPlugin = require(`html-critical-webpack-plugin`);
const path = require(`path`);

module.exports = (env, { mode }) => {
  const plugins = [
    new HtmlWebPackPlugin({
      template: `./src/index.html`,
      filename: `./index.html`
    }),
    new MiniCssExtractPlugin({
      filename: `style.[contenthash].css`
    }),
    new OptimizeCSSAssetsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ];

  if (mode === `production`) {
    plugins.push(
      new HtmlCriticalWebpackPlugin({
        base: path.resolve(__dirname, `dist`),
        src: `index.html`,
        dest: `index.html`,
        inline: true,
        minify: true,
        extract: true,
        width: 1200,
        height: 565,
        penthouse: {
          blockJSRequests: false
        }
      })
    );
    console.log(plugins);
  }

  // TODO: kijk of mode production is
  // indien ja, new HtmlCritval... in de array plugins steken

  return {
    output: {
      filename: `[name].[hash].js`
    },
    devServer: {
      overlay: true,
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: `babel-loader`
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: `html-srcsets-loader`,
              options: {
                attrs: [`:src`, `:srcset`]
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|png|svg|webp|woff|woff2)$/,
          use: {
            loader: `url-loader`,
            options: {
              limit: 1000,
              context: `./src`,
              name: `[path][name].[ext]`
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            mode === `production`
              ? MiniCssExtractPlugin.loader
              : `style-loader`,
            `css-loader`,
            `resolve-url-loader`,
            {
              loader: `postcss-loader`,
              options: {
                sourceMap: true,
                plugins: [
                  require(`postcss-import`),
                  postcssPresetEnv({ stage: 0 }),
                  require(`postcss-will-change`)
                ]
              }
            }
          ]
        }
      ]
    },
    plugins
  };
};
