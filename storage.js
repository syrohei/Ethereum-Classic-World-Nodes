/*eslint-env es6*/
/*global require*/
/*global module*/

'use strict'

const Store = require("jfs");
const Storage = new Store('./storage.json')

module.exports = {
  get(key) {
    return new Promise((resolve, reject) => {
      Storage.get(key, (err, data) => {
        if (err)
          reject(new Error(err))
        if (data){
          resolve(data)
        }
      })
    })
  },
  save(key, data) {
    return new Promise((resolve, reject) => {
      Storage.save(key, data, (err) => {
        if (err){
          reject(new Error(err))
        }
        resolve("saved")
      })
    })
  }
}
