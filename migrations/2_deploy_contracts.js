const Deathnote = artifacts.require("Deathnote");

module.exports = (deployer) => {
  deployer.deploy(Deathnote);
}