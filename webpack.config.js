module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(jpg|png)$/i,
        use: {
          loader: 'url-loader',
        },
      },
    ]
  },
  // resolve: {
  //   extensions: ['*', '.js', '.jsx']
  // }
};