const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("THORName Marketplace", () => {
  let tnm;
  let deployer, buyer;

  beforeEach(async () => {

    // get signers / set up accounts
    [deployer, buyer] = await ethers.getSigners();
    //console.log("Deployer address: ", deployer.address);
    //console.log("Buyer address: ", buyer.address);

    // deploy contract
    const Tnm = await ethers.getContractFactory("Tnm");
    tnm = await Tnm.deploy();
    await tnm.deployed(); // add this line to wait for contract deployment

  });

  describe("Deployment", () => {
    it("should set the right owner", async () => {
      expect(await tnm.owner()).to.equal(deployer.address);
    });
  });

  describe("Listing", () => {
    let transaction;

    beforeEach(async () => {
      transaction = await tnm.connect(deployer).list(
        1,
        "mythorname.thor",
        "category",
        "image",
        tokens(100),
        5,
        10
      );
      await transaction.wait();
    });
    it("Returns product attributes", async () => {
      const product = await tnm.products(1);
      expect(product.id).to.equal(1);
    });
  });

});