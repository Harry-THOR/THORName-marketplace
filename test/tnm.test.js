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
    console.log("Deployer address: ", deployer.address);
    console.log("Buyer address: ", buyer.address);

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
    it("should allow a user to list a THORName for sale", async () => {
      const id = 1;
      const name = "mythorname.eth";
      const category = "category";
      const image = "image";
      const cost = tokens(100);
      const rating = 5;
      const stock = 10;
      await tnm.list(id, name, category, image, cost, rating, stock);
      const product = await tnm.products(id);
    });
  });

});