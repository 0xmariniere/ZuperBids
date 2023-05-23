import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { zupaBidsABI } from 'abis'
import { CONTRACT_ADDRESS } from 'utils/config'
import { CardList } from 'components/layout/CardList'
import { useContractRead } from 'wagmi'
import { useZupass, ZupassLoginButton } from 'zukit'

export default function Home() {
  const { data, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: zupaBidsABI,
    functionName: 'getAllAuctions',
  })

  const [zupass] = useZupass()

  return (
    <>
      <Head />
      <main>
        {zupass.status === 'logged-out' ? (
          <div
            style={{
              textAlign: 'center',
              color: 'black',
              width: '100vw',
              height: '100vh',
              position: 'absolute',
              backgroundColor: 'green',
              top: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ZupassLoginButton />
          </div>
        ) : !data || isLoading ? (
          <HeadingComponent as="h1" size="2xl">
            Loading...
          </HeadingComponent>
        ) : (
          <>
            <CardList
              title="Auctions"
              is={data.map((auction) => {
                return {
                  tokenId: auction.tokenId,
                  name: auction.name,
                  description: auction.description,
                  tokenURIHash: auction.tokenURIHash,
                  owner: auction.owner,
                  highestBid: auction.highestBid,
                  highestBidder: auction.highestBidder,
                  endTime: auction.endTime,
                }
              })}
            />
          </>
        )}
      </main>
    </>
  )
}
