// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyNFT is ERC721 {
    using Strings for uint256;

    uint256 public tokenCounter;
    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => string) public tokenURIHashes;
    string public baseURI;

    struct Auction {
        bool isActive;
        uint256 endTime;
        address owner;
        uint256 highestBid;
        address highestBidder;
    }

    constructor(string memory baseURI_) ERC721("MyNFT", "MNFT") {
        tokenCounter = 0;
        baseURI = baseURI_;
    }

    function createTokenAndStartAuction(uint256 auctionEndTime, string memory ipfsHash) public returns (uint256) {
        tokenCounter += 1;
        _mint(msg.sender, tokenCounter);
        auctions[tokenCounter] = Auction(true, auctionEndTime, msg.sender, 0, address(0));
        tokenURIHashes[tokenCounter] = ipfsHash;
        return tokenCounter;
    }

    function bid(uint256 tokenId) public payable {
        Auction storage auction = auctions[tokenId];
        require(auction.isActive, "Auction is not active");
        require(auction.endTime >= block.timestamp, "Auction is ended");
        require(msg.value > auction.highestBid, "There already is a higher bid");

        if (auction.highestBid != 0) {
            (bool success, ) = payable(auction.highestBidder).call{value: auction.highestBid}("");
            require(success);
        }

        auction.highestBid = msg.value;
        auction.highestBidder = msg.sender;
    }

    function endAuction(uint256 tokenId) public {
        Auction storage auction = auctions[tokenId];
        require(msg.sender == auction.owner, "You are not the auction owner");
        require(auction.isActive, "Auction is not active");
        require(auction.endTime < block.timestamp, "Auction is not yet ended");

        auction.isActive = false;
        _transfer(auction.owner, auction.highestBidder, tokenId);

        (bool success, ) = payable(auction.owner).call{value: auction.highestBid}( "");
        require(success);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenURIHashes[tokenId])) : "";
    }
}
