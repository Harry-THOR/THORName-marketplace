// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const { names } = require("../src/thornames.json")

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
      for (let i = 0; i < names.length; i++) {
        const transaction = await tnm.connect(deployer).list(
          names[i].id, // returns values from thornames.json
          names[i].name,
          names[i].category,
          names[i].image,
          tokens(names[i].price),
          names[i].rating,
          names[i].stock
        )

        await transaction.wait()

        console.log(`Name ${names[i].name} listed!`)
      }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
