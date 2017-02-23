pragma solidity ^0.4.0;

import "./usingOraclize.sol";
contract WeatherApiCall is usingOraclize {
       string public weathercondition;
       uint public personscount=2;

       event LOG_OraclizeCallback(
	         	
		        bytes32 queryId,
		        string result
		       
       );
       function WeatherApiCall() {
        
            OAR = OraclizeAddrResolverI(0xdeb70698b17b18c9e6a03a9253bc7f84bdeecc81);//OAR address
        }
       function __callback(bytes32 myid, string result) {
            if (msg.sender != oraclize_cbAddress()) throw;
            weathercondition=result;
            LOG_OraclizeCallback(myid,result);
    }
  
    function update(string to,string datetime) payable returns(bool sufficient) {
            
               //***URL Testing 1
               // oraclize_query("URL", "xml(https://www.fueleconomy.gov/ws/rest/fuelprices).fuelPrices.diesel");  

               //***URL Testing 2
               // oraclize_query("URL", "json(http://api.openweathermap.org/data/2.5/forecast?q='india'&mode=json&APPID=d2e8279188c8649c17540f798c9cc972).list[?(@.dt_txt='2017-02-19 18:00:00')].weather[0].main");

               //***URL Testing 3
                  oraclize_query("URL", strConcat("json(http://api.openweathermap.org/data/2.5/forecast?q='", to ,"'&mode=json&APPID=d2e8279188c8649c17540f798c9cc972).list[?(@.dt_txt='", datetime, "')].weather[0].main"));
                  return true;
    }
}




 