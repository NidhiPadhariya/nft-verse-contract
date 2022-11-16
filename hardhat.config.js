require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {

    goerli: {
      url: `https://goerli.infura.io/v3/01edf611a74d4ff5b73cec0a354fee07`,
      accounts: ["8afdf6ebbc1ff5ffa38b32fdf86cb23d44165e0e1864e44dc41081d0c391a30f"],
      // provider: () => new HDWalletProvider('skill bag unique hawk violin clump salon match giant awkward fresh month',),
      network_id: 5,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  }
};
