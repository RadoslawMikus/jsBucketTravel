const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  entry: {
    main: "./src/main.js",

    list: {
      import: "./src/components/list.js",
      filename: "components/[name].js",
    },
    login: {
      import: "./src/components/login.js",
      filename: "components/[name].js",
    },
    search: {
      import: "./src/components/search.js",
      filename: "components/[name].js",
    },
  },

  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    assetModuleFilename: "assets/[name].[ext]",
  },

  plugins: [new MiniCssExtractPlugin({ filename: "[name].css" })],
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
    ],
  },
  devServer: {
    hot: false,
    liveReload: true,
  },
});
