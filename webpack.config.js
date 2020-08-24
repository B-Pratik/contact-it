const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

module.exports = {
  entry: "./web/src/index.js",
  mode: "development",
  output: {
    filename: "[hash].main.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: { version: 3, proposals: true },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({}),
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body",
      scriptLoading: "defer",
      favicon: "./web/assets/favicon.ico",
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    //new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      minSize: 100000,
      minChunks: 1,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          reuseExistingChunk: true,
          priority: -10,
        },
        antD: {
          test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
          name: "ant-d",
          chunks: "all",
          reuseExistingChunk: true,
          priority: -9,
        },
      },
    },
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    hot: true,
    port: 8080,
    open: true,
    host: "0.0.0.0",
    disableHostCheck: true,
    useLocalIp: true,
    historyApiFallback: true,
  },
};
