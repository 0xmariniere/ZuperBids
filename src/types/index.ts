export interface State<T> {
  loading: boolean
  data?: T
  error?: string
}

export interface AuctionItem {
  tokenId: BigInt
  endTime: BigInt
  owner: string
  highestBid: BigInt
  highestBidder: string
  tokenURIHash: string
  name: string
  description: string
}
