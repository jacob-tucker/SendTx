// run this script with `node main.js`
// see your transaction at `https://testnet.flowscan.org/transaction/YOUR_TX_ID`

const fcl = require("@onflow/fcl");
const t = require("@onflow/types");

const {authorizationFunction, authorizationFunctionProposer} = require("./helpers/authorization.js");

fcl.config()
    .put("accessNode.api", "https://testnet.onflow.org");

const sendTx = async () => {
  console.log("Sending Tx");
  const transactionId = await fcl.send([
    fcl.transaction`
    transaction(number: Int, greeting: String) {
      prepare(signer: AuthAccount) {

      }
      execute {}
    }
    `,
    fcl.args([
      fcl.arg(1, t.Int),
      fcl.arg("Hello", t.String)
    ]),
    fcl.proposer(authorizationFunctionProposer),
    fcl.payer(authorizationFunction),
    fcl.authorizations([authorizationFunction]),
    fcl.limit(9999)
  ]).then(fcl.decode);

  console.log(transactionId);
}

sendTx();
sendTx();
sendTx();