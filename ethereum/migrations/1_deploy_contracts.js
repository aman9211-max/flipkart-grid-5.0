const RewardSystem = artifacts.require("RewardSystem");
module.exports = function(deployer) {
  deployer.deploy(RewardSystem);
};
