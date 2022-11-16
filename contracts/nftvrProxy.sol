// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract nftvrProxy is ERC1967Proxy {
    constructor(address _contractAddress) ERC1967Proxy(_contractAddress , ""){

    }
}