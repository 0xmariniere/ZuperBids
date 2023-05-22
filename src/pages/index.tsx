import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { myNftABI } from 'abis'
import { CONTRACT_ADDRESS } from 'utils/config'
import { CardList } from 'components/layout/CardList'
import { useContractRead } from 'wagmi'

export default function Home() {
  const {
    data: allAuctions,
    isError,
    isLoading,
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: myNftABI,
    functionName: 'getAllAuctions',
  })
  console.log(allAuctions)
  return (
    <>
      <Head />

      <main>
        {!allAuctions || isLoading ? (
          <HeadingComponent as="h1" size="2xl">
            Loading...
          </HeadingComponent>
        ) : (
          <CardList
            title="Auctions"
            is={allAuctions.map((auction) => {
              return {
                name: auction.name,
                description: auction.description,
                tokenURIHash: auction.tokenURIHash,
                owner: auction.owner,
                highestBid: auction.highestBid,
                highestBidder: auction.highestBidder,
                endTime: auction.endTime,
                isActive: auction.isActive,
              }
            })}
          />
        )}
      </main>
    </>
  )
}
