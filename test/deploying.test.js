const { expect } = require("chai")

describe("Deploying Tnm contract", () => {
  let tnm;
  let deployer, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();
    const Tnm = await ethers.getContractFactory("Tnm");
    tnm = await Tnm.deploy();
    await tnm.deployed();
  });

  it("should set the right owner", async () => {
    expect(await tnm.owner()).to.equal(deployer.address);
  });

  it("should have a valid address", async () => {
    expect(tnm.address).to.properAddress;
  });
});