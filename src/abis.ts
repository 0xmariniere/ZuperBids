// Generated by @wagmi/cli@0.1.15 on 5/21/2023 at 4:31:25 PM
import {
  getContract,
  GetContractArgs,
  readContract,
  ReadContractConfig,
  writeContract,
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractUnpreparedArgs,
  prepareWriteContract,
  PrepareWriteContractConfig,
  watchContractEvent,
  WatchContractEventConfig,
  WatchContractEventCallback,
} from '@wagmi/core'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MyNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const myNftABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'AuctionCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'bidder', internalType: 'address', type: 'address', indexed: false },
      { name: 'bid', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BidPlaced',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'auctions',
    outputs: [
      { name: 'isActive', internalType: 'bool', type: 'bool' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
      { name: 'highestBidder', internalType: 'address', type: 'address' },
      { name: 'tokenURIHash', internalType: 'string', type: 'string' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenURIHash', internalType: 'string', type: 'string' },
      { name: 'auctionEndTime', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
    ],
    name: 'createTokenAndStartAuction',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'endAuction',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getAllAuctions',
    outputs: [
      {
        name: '',
        internalType: 'struct MyNFT.Auction[]',
        type: 'tuple[]',
        components: [
          { name: 'isActive', internalType: 'bool', type: 'bool' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'tokenURIHash', internalType: 'string', type: 'string' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'name', outputs: [{ name: '', internalType: 'string', type: 'string' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'owner', outputs: [{ name: '', internalType: 'address', type: 'address' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'placeBid',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'renounceOwnership', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'symbol', outputs: [{ name: '', internalType: 'string', type: 'string' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'tokenCounter', outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'owner', outputs: [{ name: '', internalType: 'address', type: 'address' }] },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'renounceOwnership', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165ABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165ABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'name', outputs: [{ name: '', internalType: 'string', type: 'string' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'symbol', outputs: [{ name: '', internalType: 'string', type: 'string' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ReceiverABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: '_approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721MetadataABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'name', outputs: [{ name: '', internalType: 'string', type: 'string' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: '_approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'symbol', outputs: [{ name: '', internalType: 'string', type: 'string' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link myNftABI}__.
 */
export function getMyNft(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: myNftABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link myNftABI}__.
 */
export function readMyNft<TAbi extends readonly unknown[] = typeof myNftABI, TFunctionName extends string = string>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return readContract({ abi: myNftABI, ...config } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link myNftABI}__.
 */
export function writeMyNft<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof myNftABI, TFunctionName>, 'abi'>
    | Omit<WriteContractUnpreparedArgs<typeof myNftABI, TFunctionName>, 'abi'>
) {
  return writeContract({ abi: myNftABI, ...config } as WriteContractArgs<typeof myNftABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link myNftABI}__.
 */
export function prepareWriteMyNft<TAbi extends readonly unknown[] = typeof myNftABI, TFunctionName extends string = string>(
  config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return prepareWriteContract({ abi: myNftABI, ...config } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link myNftABI}__.
 */
export function watchMyNftEvent<TAbi extends readonly unknown[] = typeof myNftABI, TEventName extends string = string>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi'>,
  callback: WatchContractEventCallback<TAbi, TEventName>
) {
  return watchContractEvent({ abi: myNftABI, ...config } as WatchContractEventConfig<TAbi, TEventName>, callback)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link ownableABI}__.
 */
export function getOwnable(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: ownableABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownableABI}__.
 */
export function readOwnable<TAbi extends readonly unknown[] = typeof ownableABI, TFunctionName extends string = string>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return readContract({ abi: ownableABI, ...config } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownableABI}__.
 */
export function writeOwnable<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof ownableABI, TFunctionName>, 'abi'>
    | Omit<WriteContractUnpreparedArgs<typeof ownableABI, TFunctionName>, 'abi'>
) {
  return writeContract({ abi: ownableABI, ...config } as WriteContractArgs<typeof ownableABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link ownableABI}__.
 */
export function prepareWriteOwnable<TAbi extends readonly unknown[] = typeof ownableABI, TFunctionName extends string = string>(
  config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return prepareWriteContract({ abi: ownableABI, ...config } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownableABI}__.
 */
export function watchOwnableEvent<TAbi extends readonly unknown[] = typeof ownableABI, TEventName extends string = string>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi'>,
  callback: WatchContractEventCallback<TAbi, TEventName>
) {
  return watchContractEvent({ abi: ownableABI, ...config } as WatchContractEventConfig<TAbi, TEventName>, callback)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link erc165ABI}__.
 */
export function getErc165(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: erc165ABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc165ABI}__.
 */
export function readErc165<TAbi extends readonly unknown[] = typeof erc165ABI, TFunctionName extends string = string>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return readContract({ abi: erc165ABI, ...config } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link ierc165ABI}__.
 */
export function getIerc165(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: ierc165ABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc165ABI}__.
 */
export function readIerc165<TAbi extends readonly unknown[] = typeof ierc165ABI, TFunctionName extends string = string>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return readContract({ abi: ierc165ABI, ...config } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link erc721ABI}__.
 */
export function getErc721(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: erc721ABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721ABI}__.
 */
export function readErc721<TAbi extends readonly unknown[] = typeof erc721ABI, TFunctionName extends string = string>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return readContract({ abi: erc721ABI, ...config } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc721ABI}__.
 */
export function writeErc721<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof erc721ABI, TFunctionName>, 'abi'>
    | Omit<WriteContractUnpreparedArgs<typeof erc721ABI, TFunctionName>, 'abi'>
) {
  return writeContract({ abi: erc721ABI, ...config } as WriteContractArgs<typeof erc721ABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link erc721ABI}__.
 */
export function prepareWriteErc721<TAbi extends readonly unknown[] = typeof erc721ABI, TFunctionName extends string = string>(
  config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return prepareWriteContract({ abi: erc721ABI, ...config } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc721ABI}__.
 */
export function watchErc721Event<TAbi extends readonly unknown[] = typeof erc721ABI, TEventName extends string = string>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi'>,
  callback: WatchContractEventCallback<TAbi, TEventName>
) {
  return watchContractEvent({ abi: erc721ABI, ...config } as WatchContractEventConfig<TAbi, TEventName>, callback)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link ierc721ReceiverABI}__.
 */
export function getIerc721Receiver(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: ierc721ReceiverABI, ...config })
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721ReceiverABI}__.
 */
export function writeIerc721Receiver<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof ierc721ReceiverABI, TFunctionName>, 'abi'>
    | Omit<WriteContractUnpreparedArgs<typeof ierc721ReceiverABI, TFunctionName>, 'abi'>
) {
  return writeContract({ abi: ierc721ReceiverABI, ...config } as WriteContractArgs<typeof ierc721ReceiverABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link ierc721ReceiverABI}__.
 */
export function prepareWriteIerc721Receiver<TAbi extends readonly unknown[] = typeof ierc721ReceiverABI, TFunctionName extends string = string>(
  config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return prepareWriteContract({ abi: ierc721ReceiverABI, ...config } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function getIerc721(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: ierc721ABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function readIerc721<TAbi extends readonly unknown[] = typeof ierc721ABI, TFunctionName extends string = string>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return readContract({ abi: ierc721ABI, ...config } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function writeIerc721<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof ierc721ABI, TFunctionName>, 'abi'>
    | Omit<WriteContractUnpreparedArgs<typeof ierc721ABI, TFunctionName>, 'abi'>
) {
  return writeContract({ abi: ierc721ABI, ...config } as WriteContractArgs<typeof ierc721ABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function prepareWriteIerc721<TAbi extends readonly unknown[] = typeof ierc721ABI, TFunctionName extends string = string>(
  config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return prepareWriteContract({ abi: ierc721ABI, ...config } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function watchIerc721Event<TAbi extends readonly unknown[] = typeof ierc721ABI, TEventName extends string = string>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi'>,
  callback: WatchContractEventCallback<TAbi, TEventName>
) {
  return watchContractEvent({ abi: ierc721ABI, ...config } as WatchContractEventConfig<TAbi, TEventName>, callback)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function getIerc721Metadata(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: ierc721MetadataABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function readIerc721Metadata<TAbi extends readonly unknown[] = typeof ierc721MetadataABI, TFunctionName extends string = string>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return readContract({ abi: ierc721MetadataABI, ...config } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function writeIerc721Metadata<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof ierc721MetadataABI, TFunctionName>, 'abi'>
    | Omit<WriteContractUnpreparedArgs<typeof ierc721MetadataABI, TFunctionName>, 'abi'>
) {
  return writeContract({ abi: ierc721MetadataABI, ...config } as WriteContractArgs<typeof ierc721MetadataABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function prepareWriteIerc721Metadata<TAbi extends readonly unknown[] = typeof ierc721MetadataABI, TFunctionName extends string = string>(
  config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return prepareWriteContract({ abi: ierc721MetadataABI, ...config } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function watchIerc721MetadataEvent<TAbi extends readonly unknown[] = typeof ierc721MetadataABI, TEventName extends string = string>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi'>,
  callback: WatchContractEventCallback<TAbi, TEventName>
) {
  return watchContractEvent({ abi: ierc721MetadataABI, ...config } as WatchContractEventConfig<TAbi, TEventName>, callback)
}
