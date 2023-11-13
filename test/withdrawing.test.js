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
    [deployer, buyer] = await ethers.getSigners();
    const Tnm = await ethers.getContractFactory("Tnm");
    tnm = await Tnm.deploy();
    await tnm.deployed(); 
  });

  describe("Withdrawing", () => {
    let transaction;
    let balanceBefore;

    beforeEach(async () => {
      // list a product
      transaction = await tnm.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();

      // buy a product
      transaction = await tnm.connect(buyer).buy(ID, { value: COST });
      await transaction.wait();

      // Get Deployer balance before
      balanceBefore = await ethers.provider.getBalance(deployer.address);
    });

    it("Reverts if the caller is not the owner", async () => {
      await expect(tnm.connect(buyer).withdraw()).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Transfers the balance to the owner", async () => {
      const ownerBalanceBefore = await deployer.getBalance();
      await tnm.connect(deployer).withdraw();
      const ownerBalanceAfter = await deployer.getBalance();
      expect(ownerBalanceAfter).to.be.greaterThan(ownerBalanceBefore);
    });

    it("updates the balance of the contract", async () => {
      await tnm.connect(deployer).withdraw();
      const balanceAfter = await ethers.provider.getBalance(tnm.address);
      expect(balanceAfter).to.equal(0);
    });

    it("Emits a Withdraw event", async () => {
      const tx = await tnm.connect(deployer).withdraw();
      const receipt = await tx.wait();
      expect(receipt.events[0].args.owner).to.equal(deployer.address);
      expect(receipt.events[0].args.amount).to.equal(COST);
    });
  });
  
});