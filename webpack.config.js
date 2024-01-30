import path from 'path'
import { fileURLToPath } from 'url'

// https://stackoverflow.com/a/50052194
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    assetModuleFilename: '[name][ext]',
  },
  entry: './index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(html|css)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        // options: { presets: ['@babel/env'] },
      },
    ],
  },
}
