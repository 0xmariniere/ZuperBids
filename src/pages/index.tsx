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
            items={allAuctions.map((auction) => {
              return {
                title: 'test',
                description: 'test',
                image: auction.tokenURIHash,
                url: auction.tokenURIHash,
              }
            })}
          />
        )}
      </main>
    </>
  )
}
