import { ethers, network, run } from 'hardhat'

async function main() {
  console.log('Deploying Nexth NFT...')
  const [deployer, recipient] = await ethers.getSigners()

  const args: any[] = []
  const NexthFT = await ethers.getContractFactory('ZupaBids')
  const nft = await NexthFT.deploy(...args)

  await nft.deployed()

  console.log(`NFT deployed to ${nft.address}`)

  // no need to verify on localhost or hardhat
  if (network.config.chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    console.log(`Waiting for block confirmation...`)
    await nft.deployTransaction.wait(10)

    console.log('Verifying contract...')
    try {
      run('verify:verify', {
        address: nft.address,
        constructorArguments: args,
        contract: 'contracts/NFT.sol:NexthFT',
      })
    } catch (e) {
      console.log(e)
    }
  }

  await nft.createTokenAndStartAuction('https://lnfts.infura-ipfs.io/ipfs/QmaqyjZ4x1D8KtQGgstbsGQrGF3MCTCrtuetpRcsSHnvMk', 1684622321)
  await nft.createTokenAndStartAuction('https://dl.openseauserdata.com/cache/originImage/files/19c6dba98fdcc359d566669009f37a4a.jpg', 1684622321)
  await nft.createTokenAndStartAuction('https://dl.openseauserdata.com/cache/originImage/files/19c6dba98fdcc359d566669009f37a4a.jpg', 1684622321)
  await nft.createTokenAndStartAuction('https://dl.openseauserdata.com/cache/originImage/files/19c6dba98fdcc359d566669009f37a4a.jpg', 1684622321)
  await nft.createTokenAndStartAuction('https://dl.openseauserdata.com/cache/originImage/files/19c6dba98fdcc359d566669009f37a4a.jpg', 1684622321)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
