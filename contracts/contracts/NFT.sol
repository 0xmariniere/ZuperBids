// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MyNFT is ERC721, Ownable, ReentrancyGuard {
    uint256 public tokenCounter;
    mapping(uint256 => Auction) public auctions;

    struct Auction {
        bool isActive;
        uint256 endTime;
        address owner;
        uint256 highestBid;
        address highestBidder;
        string tokenURIHash;
    }

    event AuctionCreated(uint256 tokenId);
    event BidPlaced(uint256 tokenId, address bidder, uint256 bid);

    constructor() ERC721("MyNFT", "MNFT") {
        tokenCounter = 0;
    }

    function createTokenAndStartAuction(string memory tokenURIHash, uint256 auctionEndTime) public returns (uint256) {
        tokenCounter += 1;
        _mint(msg.sender, tokenCounter);
        auctions[tokenCounter] = Auction(true, auctionEndTime, msg.sender, 0, address(0), tokenURIHash);
        emit AuctionCreated(tokenCounter);
        return tokenCounter;
    }

    function placeBid(uint256 tokenId) public payable nonReentrant {
        require(auctions[tokenId].isActive, "Auction is not active");
        require(msg.value > auctions[tokenId].highestBid, "Bid is not high enough");
        require(block.timestamp < auctions[tokenId].endTime, "Auction has ended");

        // Refund the previous highest bidder
        if (auctions[tokenId].highestBidder != address(0)) {
            payable(auctions[tokenId].highestBidder).transfer(auctions[tokenId].highestBid);
        }

        auctions[tokenId].highestBid = msg.value;
        auctions[tokenId].highestBidder = msg.sender;
        emit BidPlaced(tokenId, msg.sender, msg.value);
    }

    function endAuction(uint256 tokenId) public nonReentrant {
        require(auctions[tokenId].isActive, "Auction is not active");
        require(block.timestamp >= auctions[tokenId].endTime || msg.sender == owner(), "Auction has not ended");

        auctions[tokenId].isActive = false;

        // Transfer the token to the highest bidder
        _transfer(auctions[tokenId].owner, auctions[tokenId].highestBidder, tokenId);

        // Transfer the highest bid to the owner of the token
        payable(auctions[tokenId].owner).transfer(auctions[tokenId].highestBid);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "";
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return auctions[tokenId].tokenURIHash;
    }
}
