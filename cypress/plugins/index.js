/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')

const mysql = require('mysql')

const webpack = require('@cypress/webpack-preprocessor')

/**
 * 查询测试数据库
 * @param {*} query
 * @param {*} config
 * @returns
 */
function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.testDb)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}

/**
 * 查询预发布数据库
 * @param {*} query
 * @param {*} config
 * @returns
 */
function queryPreStageDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.prestageDb)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}

module.exports = (on, config) => {
  config.env.NODE_ENV = process.env.NODE_ENV
  const options = {
    webpackOptions: require('../../webpack.config')
  }
  on('file:preprocessor', webpack(options))
  on('task', { downloadFile })
  on('task', {
    queryPreStageDb: (query) => {
      return queryPreStageDb(query, config)
    }
  })
  on('task', {
    queryTestDb: (query) => {
      return queryTestDb(query, config)
    }
  })
  return config
}
