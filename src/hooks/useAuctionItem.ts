import { useContractRead, useContractWrite } from 'wagmi'
import { useEffect, useState } from 'react'
import { zupaBidsABI } from 'abis'
import { CONTRACT_ADDRESS } from 'utils/config'
import { AuctionItem } from 'types'
import { parseEther } from 'viem'

const useAuctionItem = ({ id }: { id: number }) => {
  const [auctionItem, setAuctionItem] = useState<AuctionItem | null>(null)
  const [bidPrice, setBidPrice] = useState<string | null>(null)
  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: zupaBidsABI,
    functionName: 'auctions',
    args: [id ? BigInt(id) : BigInt(9999999)],
  })

  const {
    write: send,
    error: bidError,
    isLoading: isBidding,
    isSuccess: isBidSuccess,
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: zupaBidsABI,
    functionName: 'placeBid',
    args: [id ? BigInt(id) : BigInt(9999999)],
    value: bidPrice ? parseEther(bidPrice) : BigInt(0),
  })

  const placeBid = async (amount: string) => {
    // Convert the amount to Wei (the smallest unit of Ether)
    setBidPrice(amount)
  }

  useEffect(() => {
    if (data) {
      setAuctionItem({
        tokenId: data[0],
        endTime: data[1],
        owner: data[2],
        highestBid: data[3],
        highestBidder: data[4],
        tokenURIHash: data[5],
        name: data[6],
        description: data[7],
      })
    }
  }, [data])

  useEffect(() => {
    if (bidPrice) {
      send()
    }
  }, [bidPrice])

  return { auctionItem, isError, isLoading, placeBid, bidError, isBidding, isBidSuccess }
}

export default useAuctionItem
