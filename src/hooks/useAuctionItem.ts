import { useContractRead } from 'wagmi'
import { useEffect, useState } from 'react'
import { myNftABI } from 'abis'
import { CONTRACT_ADDRESS } from 'utils/config'

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
    address: CONTRACT_ADDRESS,
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

  return { auctionItem }
}

export default useAuctionItem
