var webpack = require('webpack');
var path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    "faker", 
    "lodash",
    "react",
    "react-dom",
    "react-input-range",
    "react-redux",
    "redux",
    "redux-form",
    "redux-thunk"
]

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' // chunkhash is a hash that when some file is updated it gets a different name
  },

  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/ //exclude js in node_modules
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ // no need to install separately
      names: ['vendor', 'manifest'] // only add vendor code to vendor.js and not in bundle.js as well
      // manifest file will contain info regarding if vendor file has been changed
    }),
    new HtmlWebPackPlugin({ // needed to automatically add script tags to the index.html file
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({// React looks for process.env.NODE_ENV to check if this is production
                              // and handle error checking. We set ourselves process.env.NODE_ENV
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
