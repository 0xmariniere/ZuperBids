import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction, useNetwork, useContractRead } from 'wagmi'
import { useEffect, useState } from 'react'
import { myNftABI } from 'abis'
import { BigNumber } from 'ethers'

// struct Auction {
//   bool isActive;
//   uint256 endTime;
//   address owner;
//   uint256 highestBid;
//   address highestBidder;
//   string tokenURIHash;
// }
interface AcutionItem {
  isActive: boolean
  endTime: BigInt
  owner: string
  highestBid: BigInt
  highestBidder: string
  tokenURIHash: string
}

const useAuctionItem = ({ id }: { id: number }) => {
  const [auctionItem, setAuctionItem] = useState<AcutionItem | null>(null)

  const { data, isError, isLoading } = useContractRead({
    address: '0x29f48d86Df2281A880013902422f71F79990E859',
    abi: myNftABI,
    functionName: 'auctions',
    args: [BigInt(id)],
  })
  useEffect(() => {
    if (data) {
      setAuctionItem({
        isActive: data[0],
        endTime: data[1],
        owner: data[2],
        highestBid: data[3],
        highestBidder: data[4],
        tokenURIHash: data[5],
      })
    }
  }, [data])

  useEffect(() => {
    if (auctionItem) {
      console.log(auctionItem)
    }
  }, [auctionItem])

  return { auctionItem, setAuctionItem, data, isError, isLoading }
}

export default useAuctionItem
