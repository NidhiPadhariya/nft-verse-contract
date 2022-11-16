// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";

contract NFTVR is ERC721URIStorageUpgradeable, UUPSUpgradeable {
    address public Owner;
    uint256 tokenid;
    
    mapping(uint256 => uint256) public nftPrice;
    mapping(uint256 => bool) nftStatus;


    using Counters for Counters.Counter;
    Counters.Counter _tokenIds;

    function initialize() external initializer {
        __ERC721_init("NFT-VR", "NVR");
        Owner = msg.sender;
    }

    modifier onlyOwner() {
        require(Owner == msg.sender, "only owner allowed");
        _;
    }

    function mintNFT( address recipient, string memory tokenURI, uint256 _nftPrice) 
        public 
        onlyOwner 
        returns (uint256) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _safeMint(recipient, newItemId);
            _setTokenURI(newItemId, tokenURI);
            tokenid = newItemId;
            nftPrice[tokenid] = _nftPrice;
            nftStatus[tokenid] = true;
            return newItemId;
    }

    function updateNftPrice(uint256 _tokenId, uint256 _nftPrice)
        public
    {
        require(_tokenId <= tokenid, "Token ID does not exists");
        nftPrice[_tokenId] = _nftPrice;
        nftStatus[tokenid] = true;
    }

    function buyNft(uint256 _tokenId) external payable {
        require(nftStatus[tokenid] == true , "NFT not for sale");

        uint256 price = nftPrice[_tokenId];
        
        require(price > 0, "This token is not for sale");
        require(msg.value == price, "Incorrect value");

        address seller = ownerOf(_tokenId);
        payable(seller).transfer(msg.value);
        nftStatus[tokenid] = false;
        // _transfer(seller, msg.sender, _tokenId);
        // nftPrice[_tokenId] = 0;
    }

    function transferOwnership(
        address from,
        address to,
        uint256 tokenId
    ) public onlyOwner {
        _transfer(from, to, tokenId);
    }

    function getTokendata() public view returns (uint256) {
        return tokenid;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}
