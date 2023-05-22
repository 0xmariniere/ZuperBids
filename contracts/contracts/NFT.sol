// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract ZupaBids is ERC721, Ownable, ReentrancyGuard {
  uint256 public tokenCounter;
  mapping(uint256 => Auction) public auctions;

  struct Auction {
    uint256 tokenId;
    uint256 endTime;
    address owner;
    uint256 highestBid;
    address highestBidder;
    string tokenURIHash;
    string name;
    string description;
  }

  event AuctionCreated(uint256 tokenId);
  event BidPlaced(uint256 tokenId, address bidder, uint256 bid);

  constructor() ERC721('ZupaBids', 'ZupaBids') {
    tokenCounter = 0;
  }

  function createTokenAndStartAuction(
    string memory tokenURIHash,
    uint256 auctionEndTime,
    string memory name,
    string memory description
  ) public returns (uint256) {
    tokenCounter += 1;
    _mint(msg.sender, tokenCounter);
    auctions[tokenCounter] = Auction(tokenCounter, auctionEndTime, msg.sender, 0, address(0), tokenURIHash, name, description);
    emit AuctionCreated(tokenCounter);
    return tokenCounter;
  }

  function placeBid(uint256 tokenId) public payable nonReentrant {
    require(msg.value > auctions[tokenId].highestBid, 'Bid is not high enough');
    require(block.timestamp < auctions[tokenId].endTime, 'Auction has ended');

    // Refund the previous highest bidder
    if (auctions[tokenId].highestBidder != address(0)) {
      payable(auctions[tokenId].highestBidder).transfer(auctions[tokenId].highestBid);
    }

    auctions[tokenId].highestBid = msg.value;
    auctions[tokenId].highestBidder = msg.sender;
    emit BidPlaced(tokenId, msg.sender, msg.value);
  }

  function getAllAuctions() public view returns (Auction[] memory) {
    Auction[] memory _auctions = new Auction[](tokenCounter);
    for (uint256 i = 0; i < tokenCounter; i++) {
      _auctions[i] = auctions[i + 1];
    }
    return _auctions;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');
    return auctions[tokenId].tokenURIHash;
  }
}
