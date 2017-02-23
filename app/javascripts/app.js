// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import weatherapicall_artifacts from '../../build/contracts/WeatherApiCall.json'

// WeatherApiCall is our usable abstraction, which we'll use through the code below.
var WeatherApiCall = contract(weatherapicall_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;


window.App = {
  start: function() {
    var self = this;

    // Bootstrap the WeatherApiCall abstraction for Use.
    WeatherApiCall.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
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

    });
  },




queryRecheck: function(contract){

    var bn = web3.eth.blockNumber;
    var logger = contract.LOG_Oraclize_Callback(null, { fromBlock: bn });

    console.log('Waiting on Oraclize queries...');

    return new Promise(function (resolve, reject) {
        var ctr = setInterval(function () {
            logger.get(function (error, events) {
                try {
                    events.forEach(function (evt) {
                        if (evt.args.block.toNumber() > bn) {
                            clearInterval(ctr);
                            resolve();
                        }
                    });
                } catch (e) {
                    console.log('Error encountered during query wait: ' + e);
                    reject(e);
                }
            });
        }, 1000);
    });
},

 sendRequest: function() {
   var self = this;
   var fromdata = document.getElementById("from").value;
   var to = document.getElementById("to").value;
   var persons = parseInt(document.getElementById("persons").value);
   var date = document.getElementById("date").value;
   var time = document.getElementById("time").value;
   //verifying at javascript console
   console.log(fromdata);
   console.log(to);
   console.log(persons);
   console.log(date);
   console.log(time);
   var timeperiod;     
   if ((time >= '00:00:00') && (time < '03:00:00')) {
                        timeperiod = '00:00:00';
   } else if ((time >= '03:00:00') && (time < '06:00:00')) {
                        timeperiod = '03:00:00';
   } else if ((time >= '06:00:00') && (time < '09:00:00')) {
                        timeperiod = '06:00:00';
   } else if ((time >= '09:00:00') && (time < '12:00:00')) {
                        timeperiod = '09:00:00';
   } else if ((time >= '12:00:00') && (time < '15:00:00')) {
                       timeperiod = '12:00:00';
   } else if ((time >= '15:00:00') && (time < '18:00:00')) {
                      timeperiod = '15:00:00';
   } else if ((time >= '18:00:00') && (time < '21:00:00')) {
                      timeperiod = '18:00:00';
   } else if ((time >= '21:00:00') && (time < '24:00:00')) {
                      timeperiod = '21:00:00';
   }
   var datetime = date + ' ' + timeperiod;
   console.log(datetime); 

   var weatherapicallinstance;
   WeatherApiCall.deployed().then(function(instance) {

                          console.log("Initializing"); 
                          instance.update(to,datetime, {from: account, gas: 3000000})
                                  .then(function(v){
                                        console.log(v);
                                        console.log("Function Executed");
                                        queryRecheck(WeatherApiCall);
                                       
                                   });
    
                         }).then(function() {
                                                 console.log("Testing"); 
                         }).catch(function(e) {
                                                  console.log(e);
                         });
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  App.start();
});

