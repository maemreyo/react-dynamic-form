
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-dynamic-form.cjs.production.min.js')
} else {
  module.exports = require('./react-dynamic-form.cjs.development.js')
}
