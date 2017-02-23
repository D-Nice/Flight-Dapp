
# Ðapp Example-Flight Delayed Dapp

This dapp is developed using 'testrpc' and 'truffle'.It also uses 'etheterum-bridge' for oraclize.

This dapp fetches the user travel details such as from,to,no. of persons,date(specify today's date or dates within five days form current date),time(24hrs)from the front-end.
The dapp uses the inputs 'to','date','time' and pass it to the update function in solidity contract.The update function in contract includes a oraclizequery.
The url in oraclizequery fetches the weathercondition. 


## Getting started

Start testrpc:

          $ testrpc

Start Ethereum-bridge

   Install Ethereum-bridge from this link https://github.com/oraclize/ethereum-bridge
    
   Run Ethereum-bridge in active mode from the ethereum-bride directory downloaded from github

           $  node bridge -H localhost:8545 -a 1

   It will return the 'OarCustomAddress'.And replace the OAR address in solidity contract with the address generated.

Start truffle

   Use the commands in your dapp directory
      
             $ truffle compile

             $ truffle migrate --reset

             $ npm run build

             $npm run dev


###Note
    
