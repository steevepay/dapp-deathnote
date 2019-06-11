const DeathNote = artifacts.require("DeathNote");

module.exports = (deployer) => {
  deployer.deploy(DeathNote);
}