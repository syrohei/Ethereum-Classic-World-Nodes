var Web3 = require('web3')
var rp = require('request-promise')
var storage = require('./storage')
var uuid = require('node-uuid')


var data = 256
var j = 1
var k = 1
var i = 1
var m = 0
var nodes = []

getData(k, i, j, m)
getData(10, i, j, m)

storage.get("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2").then((data) => {
  if (!data)
    storage.save("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2", [])
})


function getData(k, i, j, m) {
  setTimeout(function() {
    m++;
    if (m == data) {
      m = 0
      j++
    }
    if (j == data) {
      j = 0
      i++
    }
    if (i == data) {
      j = 0
      k++
    }

    getData(k, i, j, m)
    params = {
      uri: `http://${k}.${i}.${j}.${m}:8545`,
      //uri: `http://54.218.109.153:8545`,
      method: 'POST',
      body: '{"id":9999999999,"jsonrpc":"2.0","method":"net_listening","params":[]}'
    }
    rp(params).then((result) => {
      if (result.errorMessage)
        console.log(result.errorMessage);
      else {
        const data = JSON.parse(result)
        if (data.result) {
          console.log(params.uri);
          storage.get("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2").then((data) => {
            data.push(params.uri)
            storage.save("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2", data)
          })
        }
      }
    })

    //data = web3.isConnected()
    console.log(k, i, j, m)
  }, 0)
}
