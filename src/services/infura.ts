import { create } from 'ipfs-http-client'

export default class Infura {
  public ipfsClient
  private readonly projectId = process.env.NEXT_INFURA_IPFS_PROJECT_ID
  private readonly projectSecret = process.env.NEXT_INFURA_IPFS_PROJECT_SECRET

  constructor() {
    const auth = 'Basic ' + Buffer.from('2IJSKYYe9oc2G2c8s5dtDuBguxu' + ':' + '286bf85fa41744707901f2802d19b995').toString('base64')
    this.ipfsClient = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    })
  }

  public async uploadMetadata(file: any) {
    console.log(file)
    const cid = await this.ipfsClient.add(file)
    console.log(cid)
    return {
      cid: cid.path,
      url: `https://lnfts.infura-ipfs.io/ipfs/${cid.path}`,
    }
  }
}
