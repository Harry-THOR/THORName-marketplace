// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const { products } = require("../src/thornames.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
      // get first account from the list
      [deployer, buyer] = await ethers.getSigners()
      // deploy contract
      const Tnm = await hre.ethers.getContractFactory("Tnm")
      const tnm = await Tnm.deploy()
      await tnm.deployed() // wait for contract deployment before proceeding

      console.log("TNM deployed to:", tnm.address)

      // List names
      for (let i = 0; i < products.length; i++) {
        const transaction = await tnm.connect(deployer).list(
          products[i].id, // returns values from thornames.json
          products[i].name,
          products[i].category,
          products[i].image,
          tokens(products[i].price),
          products[i].rating,
          products[i].stock
        )

        await transaction.wait()

        console.log(`Name ${products[i].name} listed!`)
      }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
