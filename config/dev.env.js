'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  useEslint: true,
  NODE_ENV: '"development"',
  BASE_API: '"/api"'
})
