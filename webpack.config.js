const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@constants': path.resolve(__dirname, 'cypress/common/constants'),
      '@page': path.resolve(__dirname, 'cypress/common/page'),
      '@api': path.resolve(__dirname, 'cypress/common/api')
    }
  }
}
