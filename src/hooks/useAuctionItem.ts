import { useContractRead } from 'wagmi'
import { useEffect, useState } from 'react'
import { zupaBidsABI } from 'abis'
import { CONTRACT_ADDRESS } from 'utils/config'
import { AcutionItem } from 'types'

const useAuctionItem = ({ id }: { id: number }) => {
  const [auctionItem, setAuctionItem] = useState<AcutionItem | null>(null)

  


  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: zupaBidsABI,
    functionName: 'auctions',
    args: [BigInt(id)],
  })

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

  return { auctionItem, isError, isLoading }
}

export default useAuctionItem
