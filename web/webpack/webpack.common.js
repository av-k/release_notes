const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const makePath = to => path.resolve(__dirname, to);

module.exports = {
  entry: './src',
  output: {
    filename: 'bundle.js',
    path: makePath('../public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import',
              'babel-plugin-dynamic-import-webpack'
            ],
          },
        },
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve('../node_modules/bootstrap/scss/mixins')
              ]
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      library: makePath('../src/lib/'),
      pages: makePath('../src/pages/'),
      components: makePath('../src/components/'),
      config: makePath('../src/config'),
      utils: makePath('../src/utils'),
      node_modules: makePath('../node_modules')
    },
    plugins: [
      new DirectoryNamedWebpackPlugin({
        honorIndex: true,
        exclude: /node_modules/,
        transformFn(dirName) {
          return [dirName, dirName.toLowerCase()];
        }
      }),
      require('autoprefixer')
    ]
  }
};
