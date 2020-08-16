const UFragments = artifacts.require("./UFragments");
const Orchestrator = artifacts.require("./Orchestrator");
const UFragmentsPolicy = artifacts.require("./UFragmentsPolicy");

// async function deploy(deployer, network) {
//   const factoryResult = await deployer.deploy(UFragmentsPolicy);
//   //console.log(factoryResult);
// }
module.exports = function(deployer) {
  deployer.deploy(UFragments);
  deployer.deploy(UFragmentsPolicy);
  //  deployer.deploy(Orchestrator,"0x57736b35919fa2d03e930e899e81dfd8409aa932");


};