export interface State<T> {
  loading: boolean
  data?: T
  error?: string
}

export interface AuctionItem {
  tokenId: bigint
  endTime: bigint
  owner: string
  highestBid: bigint
  highestBidder: string
  tokenURIHash: string
  name: string
  description: string
  telegramId: string
}
