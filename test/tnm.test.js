const { expect } = require("chai")
const tokens = (n) => { return ethers.utils.parseUnits(n.toString(), 'ether') }
const ID = 1;
const NAME = "mythorname.thor";
const CATEGORY = "THORNames";
const IMAGE = "https://raw.githubusercontent.com/thorchain/Resources/master/logos/png/Thorchain_icon_square.png";
const COST = tokens(100);
const RATING = 5;
const STOCK = 1;

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
      transaction = await tnm.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait(); // lets the transaction complete its full life cycle before proceeding
    });

    it("Returns product attributes", async () => {
      const product = await tnm.products(1); // 1 is the id in the mapping. returns the item located at 1
      expect(product.id).to.equal(ID);
      expect(product.name).to.equal(NAME);
      expect(product.category).to.equal(CATEGORY);
      expect(product.image).to.equal(IMAGE);
      expect(product.cost).to.equal(COST);
      expect(product.rating).to.equal(RATING);
      expect(product.stock).to.equal(STOCK);
    });

    it("Emits a ProductListed event", async () => {
      const receipt = await transaction.wait();
      expect(receipt.events[0].event).to.equal("ProductListed");
      expect(receipt.events[0].args.id).to.equal(ID);
      expect(receipt.events[0].args.name).to.equal(NAME);
      expect(receipt.events[0].args.category).to.equal(CATEGORY);
      expect(receipt.events[0].args.image).to.equal(IMAGE);
      expect(receipt.events[0].args.cost).to.equal(COST);
      expect(receipt.events[0].args.rating).to.equal(RATING);
      expect(receipt.events[0].args.stock).to.equal(STOCK);
    });

  });

});