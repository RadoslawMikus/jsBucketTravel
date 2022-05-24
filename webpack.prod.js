const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

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
    navigat: {
      import: "./src/components/navigat.js",
      filename: "components/[name].js",
    },
    search: {
      import: "./src/components/search.js",
      filename: "components/[name].js",
    },
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    assetModuleFilename: "assets/[name][ext]",
  },

  plugins: [new MiniCssExtractPlugin({ filename: "[name].css" })],

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: "body",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),

      new TerserPlugin(),
    ],
  },
});
