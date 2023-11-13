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

  describe("Deploying", () => {
    it("should set the right owner", async () => {
      expect(await tnm.owner()).to.equal(deployer.address);
    });
  });

});