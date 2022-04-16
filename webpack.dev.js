const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  entry: {
    main: "./src/main.js",
    api: {
      import: "./src/components/api.js",
      filename: "components/[name].[hash].js",
    },
    list: {
      import: "./src/components/list.js",
      filename: "components/[name].[hash].js",
    },
    login: {
      import: "./src/components/login.js",
      filename: "components/[name].[hash].js",
    },
    modal: {
      import: "./src/components/modal.js",
      filename: "components/[name].[hash].js",
    },
    search: {
      import: "./src/components/search.js",
      filename: "components/[name].[hash].js",
    },
    zoom: {
      import: "./src/components/zoom.js",
      filename: "components/[name].[hash].js",
    },
  },

  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/[name].[hash][ext]",
  },

  plugins: [new MiniCssExtractPlugin({ filename: "[name].[hash].css" })],
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: "body",
        minify: {
          removeAttributeQuotes: false,
          collapseWhitespace: false,
          removeComments: false,
        },
      }),

      new HtmlWebpackPlugin({
        template: "./src/logowanie.html",
        filename: "logowanie.html",
        inject: "body",
        minify: {
          removeAttributeQuotes: false,
          collapseWhitespace: false,
          removeComments: false,
        },
      }),

      new HtmlWebpackPlugin({
        template: "./src/podroze.html",
        filename: "podroze.html",
        inject: "body",
        minify: {
          removeAttributeQuotes: false,
          collapseWhitespace: false,
          removeComments: false,
        },
      }),
    ],
  },
  devServer: {
    hot: false,
    liveReload: true,
  },
});
