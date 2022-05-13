import path from "path";
import { Configuration } from "webpack";
import "webpack-dev-server";

const config: Configuration = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "../public/js"),
    filename: "bundle.js",
    publicPath: '/js/'
  },
  devServer: {
    static: path.join(__dirname, "../public"),
    compress: true,
    port: 4000,
  },
};

export default config;