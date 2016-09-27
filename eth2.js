var Web3 = require('web3')
var rp = require('request-promise')
var storage = require('./storage')
var uuid = require('node-uuid')


var data = 256
var j = 1
var k = 1
var i = 1
var m = 0
var port = 1000

var pending = []

storage.get("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2").catch((data) => {
  storage.save("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2", [])
})

setInterval(() => {
  save()

}, 100)

const params = function(port, k, i, j, m) {
  return {
    uri: `http://${k}.${i}.${j}.${m}:${port}`,

    //uri: `http://54.218.109.153:8545`,
    method: 'POST',
    body: '{"id":9999999999,"jsonrpc":"2.0","method":"net_listening","params":[]},"uri":${uri}',
  }
}

//getData(k, i, j, m , 1000, 1000, 20)
//getData(54, 218, 109, 153 , 1000, 1000, 20)
//getData(106,184,3,183, 1000,1000,20)
//getData(161,202,82,11, 1000, 1000,20)
getData(59,147,62,153, 1000, 1000,20)

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

function getData( k, i, j, m ,port,portinit ,limit) {
  setTimeout(function() {
    port++
    if (port == 65535){
      port = portinit
      m++
    }
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
    if (k == data)
      k = 0


    getData(k, i, j, m,port, portinit, limit)


    const p = new params(port, k, i, j, m)
      //console.log(p);

    rp(p).then((response) => {
      const data = JSON.parse(response)
      if (data.result) {
        pending.push(p)
      }

    })

    //data = web3.isConnected()
    console.log(k, i, j, m, port)
  }, 20)
}
