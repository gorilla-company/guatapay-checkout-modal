const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {

  entry: './src/ModoModal.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // https://webpack.js.org/guides/author-libraries/#authoring-a-library
    // https://webpack.js.org/configuration/output/#outputlibrary
    library: 'ModoSDK',
  },

  // https://webpack.js.org/guides/asset-management/
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        //type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new Dotenv(),
  ],
  
//  mode: 'development'
  // mode: '',
  //  The 'mode' option has not been set, webpack will fallback to 'production' for this value.
  //  Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
  //  You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
  
};