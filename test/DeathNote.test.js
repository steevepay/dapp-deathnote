const Deathnote = artifacts.require("Deathnote");

contract("DeathNote", (accounts) => {

  let deathnote;

  beforeEach(async () => {
    deathnote = await Deathnote.deployed();
  })

  it("setup contract for each test", async () => {
    assert.ok(deathnote.address);
  })

  it("set initial caller as the contract owner", async () => {
    const owner = await deathnote.owner();
    assert.equal(accounts[0], owner);
  })

  it("check if caller is the owner", async () => {
    const test1 = await deathnote.isOwner({
      from: accounts[1]
    });
    assert.equal(false, test1);
    const test2 = await deathnote.isOwner({
      from: accounts[0]
    });
    assert.equal(true, test2);
  })

  it("create a new death", async () => {
    const name = 'John';
    const conditions = 'heart attack';
    const date = '2019/10/18';
    const img = 'base64://'
    await deathnote.addDeath(name, conditions, date, img, {
      value: web3.utils.toWei('0.001', 'ether')
    });
    const nbrdeaths = await deathnote.getDeathsLength();
    assert.equal(nbrdeaths, 1);
    const death = await deathnote.deaths(0);
    assert.ok(death);
    assert.equal(name, death.name);
    assert.equal(conditions, death.conditions);
    assert.equal(date, death.timeOfDeath);
    assert.equal(img, death.img);
  });

  it('create a new death without enough funds', async () => {
    try {
      await deathnote.addDeath('test', 'test', 'test', 'test', {
        value: web3.utils.toWei('0', 'ether')
      })
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('add multiple death with the same account', async () => {
    const length = 4;
    for (let index = 0; index < length; index++) {
      await deathnote.addDeath('test' + index, 'test' + index, 'test' + index, 'test' + index, {
        value: web3.utils.toWei('0.001', 'ether'),
        from: accounts[2]
      })
    }
    const totalDeath = await deathnote.deathsCounterOwner(accounts[2]);
    assert.equal(length, totalDeath);
  });

  it('different death owned by different persons', async () => {
    const length = 4;
    for (let index = 1; index < length; index++) {
      await deathnote.addDeath('test' + index, 'test' + index, 'test' + index, 'test' + index, {
        value: web3.utils.toWei('0.001', 'ether'),
        from: accounts[index]
      })
      let address = await deathnote.deathsOwner(index - 1);
      assert.equal(accounts[index], address);
    }
  });

  it("get the initial death fee", async () => {
    const deathFee = await deathnote.getDeathFee();
    assert.equal(web3.utils.toWei('0.001', 'ether'), deathFee);
  });

  it("change the death fee by the owner", async () => {
    const newfee = '0.5';
    deathnote.setDeathFee(web3.utils.toWei(newfee, 'ether'));
    const deathFee = await deathnote.getDeathFee();
    assert.equal(web3.utils.toWei(newfee, 'ether'), deathFee);
  });

  it("an unauthorized personne try to change the deathfee", async () => {
    try {
      await deathnote.setDeathfee(web3.utils.toWei('0.05', 'ether'), {
        from: accounts[1]
      })
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

})