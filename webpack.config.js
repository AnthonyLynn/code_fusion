const pageNames = ["home", "bar"];

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const generateHtmlPlugin = (page) => {
  return new HtmlWebpackPlugin({
    inject: true,
    title: page,
    filename: `${page}.html`,
    template: `./src/pages/${page}/index.html`,
    chunks: [page],
    //favicon: "./src/images/favicon.ico",
  });
};

const htmlPlugins = pageNames.map(generateHtmlPlugin);
const entrys = pageNames.reduce((config, page) => {
  config[page] = `./src/scripts/${page}.js`;
  return config;
}, {});

module.exports = {
  entry: entrys,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  mode: "development",
  devtool: "inline-source-map",
  stats: "errors-only",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: true,
    liveReload: true,
    hot: false,
  },
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()].concat(
    htmlPlugins
  ),
};
