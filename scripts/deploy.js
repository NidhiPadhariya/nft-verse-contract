// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const { ethers } = require("hardhat");

async function main() {
  let [buyer, seller] = await ethers.getSigners();
  let NFTVR = await ethers.getContractFactory("NFTVR");
  let nftContract = await NFTVR.deploy();
  await nftContract.deployed();

  let nftvrProxy = await ethers.getContractFactory("nftvrProxy");
  let _nftvrProxy = await nftvrProxy.deploy(nftContract.address);
  await _nftvrProxy.deployed();

  nftContract = await ethers.getContractAt("NFTVR" , _nftvrProxy.address);
  await nftContract.initialize();

  // await nftContract.mintNFT(seller.address, "QmS7REuuqWSY8QfpUAzTyWD2uZDjzCkpzcpPLQQtczdJkK" , "300000000000000000");
  // await nftContract.mintNFT(seller.address, "QmS7REuuqWSY8QfpUAzTyWD2uZDjzCkpzcpPLQQtczdJkK");
  // await nftContract.mintNFT(seller.address, "QmS7REuuqWSY8QfpUAzTyWD2uZDjzCkpzcpPLQQtczdJkK");
  // await nftContract.updateNftPrice("1", "300000000000000000");
  // let lol = await nftContract.nftPrice("1");
  // console.log(lol, "get nft price");
  // let ownerResult = await nftContract.balanceOf(seller.address);
  // console.log(ownerResult, "mint");
  // await nftContract.connect(buyer).buyNft("1", { value: "300000000000000000" });
  // let balanceVariable = await ethers.provider.getBalance(seller.address);
  // console.log(balanceVariable , "balance");
  console.log("Address of the contract is:", nftContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
