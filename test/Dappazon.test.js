const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dappazon", () => {
  let dappazon;

  beforeEach(async () => {
    // deploy contract
    const Dappazon = await ethers.getContractFactory("Dappazon");
    dappazon = await Dappazon.deploy();
  });

  it("has a name", async () => {
    expect(await dappazon.name()).to.equal("Dappazon");
  });

  it("has a symbol", async () => {
    expect(await dappazon.symbol()).to.equal("DAP");
  });

  it("has a total supply of 1000000 tokens", async () => {
    const totalSupply = await dappazon.totalSupply();
    expect(totalSupply).to.equal(tokens(1000000));
  });
})

