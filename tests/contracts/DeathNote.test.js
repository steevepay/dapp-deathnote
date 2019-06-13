const Deathnote = artifacts.require("Deathnote");

contract("DeathNote", accounts => {
  let deathnote;

  beforeEach(async () => {
    deathnote = await Deathnote.deployed();
  });

  it("setup contract for each test", async () => {
    assert.ok(deathnote.address);
  });

  it("set initial caller as the contract owner", async () => {
    const owner = await deathnote.owner();
    assert.equal(accounts[0], owner);
  });

  it("check if caller is the owner", async () => {
    const test1 = await deathnote.isOwner({
      from: accounts[1]
    });
    assert.equal(false, test1);
    const test2 = await deathnote.isOwner({
      from: accounts[0]
    });
    assert.equal(true, test2);
  });

  it("create a new death", async () => {
    const name = "John";
    const conditions = "heart attack";
    const date = "2019/10/18";
    const img = "base64://";
    await deathnote.addDeath(name, conditions, date, img, {
      value: web3.utils.toWei("0.001", "ether")
    });
    const nbrdeaths = await deathnote.getDeathsLength();
    assert.equal(nbrdeaths, 1);
    let death = await deathnote.deaths(0);
    assert.ok(death);
    assert.equal(accounts[0], death.owner);
    assert.equal(name, death.name);
    assert.equal(conditions, death.conditions);
    assert.equal(date, death.timeOfDeath);
    assert.equal(img, death.img);
    death = await deathnote.getDeath(0);
    assert.ok(death);
    assert.equal(accounts[0], death.owner);
    assert.equal(name, death.name);
    assert.equal(conditions, death.conditions);
    assert.equal(date, death.timeOfDeath);
    assert.equal(img, death.img);
  });

  it("create a new death without enough funds", async () => {
    try {
      await deathnote.addDeath("test", "test", "test", "test", {
        value: web3.utils.toWei("0", "ether")
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("add multiple death with the same account", async () => {
    let death;
    const length = 4;
    const deathnote2 = await Deathnote.new();
    for (let index = 0; index < length; index++) {
      await deathnote2.addDeath(
        "test-name" + index,
        "test-condition" + index,
        "test-date" + index,
        "test-img" + index,
        {
          value: web3.utils.toWei("0.001", "ether"),
          from: accounts[2]
        }
      );
      death = await deathnote2.getDeath(index);
      assert.ok(death);
      assert.equal(accounts[2], death.owner);
      assert.equal("test-name" + index, death.name);
      assert.equal("test-condition" + index, death.conditions);
      assert.equal("test-date" + index, death.timeOfDeath);
      assert.equal("test-img" + index, death.img);
    }
    const totalDeath = await deathnote2.deathsCounterOwner(accounts[2]);
    assert.equal(length, totalDeath);
  });

  it("different death owned by different persons", async () => {
    const deathnote2 = await Deathnote.new();
    const length = 4;

    for (let index = 0; index < length; index++) {
      await deathnote2.addDeath(
        "test" + index,
        "test" + index,
        "test" + index,
        "test" + index,
        {
          value: web3.utils.toWei("0.001", "ether"),
          from: accounts[index]
        }
      );
      let address = await deathnote2.deathsOwner(index + 1);
      assert.equal(accounts[index], address);
    }
  });

  it("get the initial death fee", async () => {
    const deathFee = await deathnote.getDeathFee();
    assert.equal(web3.utils.toWei("0.001", "ether"), deathFee);
  });

  it("change the death fee by the owner", async () => {
    const newfee = "0.5";
    deathnote.setDeathFee(web3.utils.toWei(newfee, "ether"));
    const deathFee = await deathnote.getDeathFee();
    assert.equal(web3.utils.toWei(newfee, "ether"), deathFee);
  });

  it("an unauthorized personne try to change the deathfee", async () => {
    try {
      await deathnote.setDeathfee(web3.utils.toWei("0.05", "ether"), {
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("owner can withdraw the funds", async () => {
    const deathnote2 = await Deathnote.new();
    const initialBalance = parseFloat(
      web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), "ether")
    );
    for (let index = 0; index < 4; index++) {
      await deathnote2.addDeath(
        "test" + index,
        "test" + index,
        "test" + index,
        "test" + index,
        {
          from: accounts[index + 1],
          value: web3.utils.toWei("0.05", "ether")
        }
      );
    }
    await deathnote2.withdraw();
    const endbalance = parseFloat(
      web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), "ether")
    );
    const balance = endbalance - initialBalance;
    assert(balance > 0.19);
  });

  it("get balance", async () => {
    const deathnote2 = await Deathnote.new();
    for (let index = 0; index < 4; index++) {
      await deathnote2.addDeath(
        "test" + index,
        "test" + index,
        "test" + index,
        "test" + index,
        {
          from: accounts[index + 1],
          value: web3.utils.toWei("0.05", "ether")
        }
      );
    }
    const contractBalance = parseFloat(
      web3.utils.fromWei(await deathnote2.getBalance(), "ether")
    );
    assert(contractBalance == 0.2);
  });
});
