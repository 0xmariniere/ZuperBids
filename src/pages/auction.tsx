import { Head } from 'components/layout/Head'
import Router from 'next/router'
import useAuctionItem from 'hooks/useAuctionItem'
import { Box, Image, Text, Button, Heading, Skeleton, useToast } from '@chakra-ui/react'
import { useContractWrite } from 'wagmi'
import { CONTRACT_ADDRESS } from 'utils/config'
import { zupaBidsABI } from 'abis'

export default function Auction() {
  const { auctionId } = Router.query

  const { auctionItem, isLoading, isError } = useAuctionItem({ id: Number(auctionId) })
  const toast = useToast()

  const write = async () => {
    return 'write'
  }

  const placeBid = async () => {
    try {
      await write()
      toast({
        title: 'Bid placed.',
        description: 'Your bid has been successfully placed!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'An error occurred.',
        description: 'Unable to place the bid.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  if (isLoading || !auctionItem) {
    return <Skeleton height="20rem" />
  }

  if (isError) {
    return <Text>Failed to load auction</Text>
  }

  return (
    <>
      <Head />
      <main>
        <Box p="5" display={{ md: 'flex' }}>
          <Box flexShrink="0">
            <Image borderRadius="lg" width={{ md: 40 }} src={auctionItem.tokenURIHash} alt={auctionItem.name} />
          </Box>
          <Box mt={{ base: 5, md: 0 }} ml={{ md: 6 }}>
            <Heading fontWeight="bold" fontSize="xl" textTransform="uppercase">
              {auctionItem.name}
            </Heading>
            <Text mt={1} display="block" fontSize="lg" color="gray.500">
              Owned by: {auctionItem.owner}
            </Text>
            <Text mt={2} color="gray.500">
              Highest Bid:
            </Text>
            <Button mt={3} colorScheme="teal" onClick={placeBid} isLoading={false}>
              Place a bid
            </Button>
          </Box>
        </Box>
      </main>
    </>
  )
}
