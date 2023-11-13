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

  describe("Buying", () => {
    let transaction;

    beforeEach(async () => {
      // list a product
      transaction = await tnm.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait(); // lets the transaction complete its full life cycle before proceeding
    });

    it("Reverts if there is not enough Ether in the transaction", async () => {
      const product = await tnm.products(ID);
      const insufficientCost = product.cost.sub(1);
      await expect(tnm.connect(buyer).buy(ID, { value: insufficientCost })).to.be.revertedWith("Not enough Ether sent");
    });

    it("Reverts if there is not enough stock", async () => {
      const product = await tnm.products(ID);
      for (let i = 0; i < product.stock; i++) {
        await tnm.connect(buyer).buy(ID, { value: product.cost });
      }
      await expect(tnm.connect(buyer).buy(ID, { value: product.cost })).to.be.revertedWith("Out of stock");
    });

    it("Adds the order", async () => {
      const product = await tnm.products(ID);
      transaction = await tnm.connect(buyer).buy(ID, { value: product.cost });
      const order = await tnm.orders(buyer.address, 1);
      expect(order.timestamp).to.be.greaterThan(0);
      expect(order.productId).to.equal(ID);
      expect(order.quantity).to.equal(1);
      expect(order.cost).to.equal(product.cost);
    });

    it("Decreases the stock", async () => {
      const product = await tnm.products(ID);
      transaction = await tnm.connect(buyer).buy(ID, { value: product.cost });
      const updatedProduct = await tnm.products(ID);
      expect(updatedProduct.stock).to.equal(product.stock - 1);
    });

    it("Emits a Buy event", async () => {
      const product = await tnm.products(ID);
      transaction = await tnm.connect(buyer).buy(ID, { value: product.cost });
      const order = await tnm.orders(buyer.address, 1);
      expect(transaction).to.emit(tnm, "Buy").withArgs(buyer.address, order.id, ID, 1, product.cost);
    });

  });
  
});