var Web3 = require('web3')
var rp = require('request-promise')
var storage = require('./storage')
var uuid = require('node-uuid')


var data = 256
var j = 1
var k = 1
var i = 1
var m = 0
var pending = []

storage.get("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2").catch((data) => {
  storage.save("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2", [])
})

setInterval(() => {
  save()

}, 100)

const params = function(k, i, j, m) {
  return {
    uri: `http://${k}.${i}.${j}.${m}:8545`,

    //uri: `http://54.218.109.153:8545`,
    method: 'POST',
    body: '{"id":9999999999,"jsonrpc":"2.0","method":"net_listening","params":[]},"uri":${uri}',
  }
}

getData(k, i, j, m , 20)
getData(21, i, j, m, 40)
getData(41, i, j, m, 60)
getData(61, i, j, m, 80)
getData(81, i, j, m, 100)
getData(101, i, j, m, 120)
getData(121, i, j, m, 140)
getData(141, i, j, m, 160)
getData(161, i, j, m, 180)
getData(181, i, j, m, 200)
getData(201, i, j, m, 220)
getData(221, i, j, m, 240)
getData(241, i, j, m, 255)

function save() {
  console.log(pending);
  if (pending.length > 0) {
    const node = pending.pop()
    storage.get("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2").then((data) => {
      data.push(node.uri)
      return storage.save("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2", data)
    }).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
      pending.push(uri)
    })
  }
}

function getData(k, i, j, m ,limit) {
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
    if (k> limit)
      return 0

    getData(k, i, j, m, limit)


    const p = new params(k, i, j, m)
      //console.log(p);

    rp(p).then((response) => {
      const data = JSON.parse(response)
      if (data.result) {
        pending.push(p)
      }

    })

    //data = web3.isConnected()
    console.log(k, i, j, m)
  }, 0)
}
