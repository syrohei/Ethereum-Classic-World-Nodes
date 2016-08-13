var accounts;
var account;
var balance;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var meta = MetaCoin.deployed();

  meta.getBalance.call(account, {
    from: account
  }).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function sendCoin() {
  var meta = MetaCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {
    from: account
  }).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

function initialize() {
  earth = new WE.map('earth_div', {
    sky: true,
    atmosphere: true,
    zoom: 3,
    unconstrainedRotation: false,
    center: [24.355406305811105, 135.01886814587635]
  });

  /*

  WE.tileLayer('http://data.webglearth.com/natural-earth-color/{z}/{x}/{y}.jpg', {
    tileSize: 256,
    tms: true
  }).addTo(earth);

  WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' ,{
    opacity: 0.6
  }).addTo(earth);

  WE.tileLayer('https://tileserver.maptiler.com/cassini-terrestrial/{z}/{x}/{y}.jpg', {
    opacity: 0.1
  }).addTo(earth);
  */

  WE.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.',
    opacity: 0.4
  }).addTo(earth);



  var marker = WE.marker([51.5, -0.1], "https://www.coingecko.com/assets/coin-250/ethereum%20classic-8c58eab0a183e0c94a84a17fd9bb488b.png", 30, 60).addTo(earth)
  marker.bindPopup('<b>Hello world!</br><b>Hello world!</br><b>Hello world!</br><b>Hello world!</br>', 400, true)
  marker.on('click', function(e) {
    const data = earth.getCenter()
    if (data[1] < -0.2 || data[1] > 0.0)
      earth.panInsideBounds([
        [51.5, 0.0],
        [51.5, -0.2]
      ]);
  })
  var options = {
    color: '#000',
    opacity: 0.001,
    fillColor: '#ff0',
    fillOpacity: 1,
    weight: 1
  };
  polygonB = WE.polygon([
    [51.5, -0.1],
    [51.5, -0.1],
    [50.8, 5.5]
  ], options).addTo(earth);
  polygonC = WE.polygon([
    [51.5, -0.1],
    [51.5, -0.4],
    [24.355406305811105, -135.01886814587635]
  ], options).addTo(earth);

}



setInterval(function() {
  const data = polygonB.getPoints()
  24.355406305811105, 135.01886814587635
  const diff_lat = data[0].lat - 24.355406305811105
  const diff_lng = data[0].lng - 135.01886814587635
  const diff = diff_lat / diff_lng
  console.log(diff)
  polygonB.movePoint(0, data[0].lat + diff * 10, data[0].lng + 10)
  polygonB.movePoint(1, data[1].lat + diff * 10, data[1].lng + 10)
  polygonB.movePoint(2, data[2].lat + diff * 10, data[2].lng + 10)
}, 6000)

/*

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    refreshBalance();
  });
}*/
