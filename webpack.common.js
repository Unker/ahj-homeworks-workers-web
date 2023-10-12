const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config({ path: './.env' }); 

const cachedFilesRegex = /^(index\.html|index\.js|app\.js|placeholderNews\.js|css\/placeholderNews\.css)/;

module.exports = {
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new GenerateSW({
      swDest: 'service-worker.js', // Путь к файлу сервис-воркера
      clientsClaim: true, // Принудительно активировать новый сервис-воркер сразу после установки
      skipWaiting: true, // Пропустить ожидание завершения работы старого сервис-воркера
      runtimeCaching: [
        {
          urlPattern: /\/(index\.html|index\.js|app\.js|placeholderNews\.js|css\/placeholderNews\.css)/,
          handler: 'CacheFirst', // Стратегия кэширования (пробовать загрузить из кеша сперва)
        },
      ],
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};
