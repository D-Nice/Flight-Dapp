var UsingOraclize = artifacts.require("./usingOraclize.sol");
var WeatherApiCall = artifacts.require("./WeatherApiCall.sol");
//var BinaryTrading = artifacts.require("./BinaryTrading.sol");

module.exports = function(deployer) {
  deployer.deploy(UsingOraclize);
  deployer.link(UsingOraclize, WeatherApiCall);
  deployer.deploy(WeatherApiCall);
};
