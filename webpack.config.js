const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@constants': path.resolve(__dirname, 'cypress/common/constants'),
      '@page': path.resolve(__dirname, 'cypress/common/page'),
      '@api': path.resolve(__dirname, 'cypress/common/api')
    },
    fallback: {
      path: require.resolve('path-browserify'),
      // crypto: require.resolve("crypto-browserify"),
      stream: false,
      fs: false
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },

  node: {
    __dirname: true
  }
}
