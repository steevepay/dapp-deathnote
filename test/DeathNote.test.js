const Deathnote = artifacts.require("Deathnote");

contract("DeathNote", (accounts) => {
  it("setup contract for each test", async () => {
    const deathnote = await Deathnote.deployed();
    assert.ok(deathnote.address);
  })

  it("set initial caller as the contract owner", async () => {
    const deathnote = await Deathnote.deployed();
    const owner = await deathnote.owner();
    assert.equal(accounts[0], owner);
  })

  it("check if caller is the owner", async () => {
    const deathnote = await Deathnote.deployed();
    const test1 = await deathnote.isOwner({
      from: accounts[1]
    });
    assert.equal(false, test1);
    const test2 = await deathnote.isOwner({
      from: accounts[0]
    });
    assert.equal(true, test2);
  })

  it("create a new death")
})