import { Head } from 'components/layout/Head'
import Router from 'next/router'
import useAuctionItem from 'hooks/useAuctionItem'
import { useEffect } from 'react'
import {
  Box,
  Image,
  Text,
  Button,
  Heading,
  Skeleton,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function Auction() {
  const { auctionId } = Router.query

  const { auctionItem, placeBid, isLoading, isError, isBidSuccess, bidError } = useAuctionItem({ id: Number(auctionId) })
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [bidAmount, setBidAmount] = useState('')

  useEffect(() => {
    if (isBidSuccess) {
      toast({
        title: 'Bid placed.',
        description: 'Your bid has been successfully placed!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      onClose()
    }
  }, [isBidSuccess])

  useEffect(() => {
    if (bidError) {
      toast({
        title: 'An error occurred.',
        description: bidError.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [bidError])

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
            <Button mt={3} colorScheme="teal" onClick={onOpen} isLoading={false}>
              Place a bid
            </Button>
          </Box>
        </Box>

        {/* Bid Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Place a bid</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Enter bid amount</FormLabel>
                <Input placeholder="0.00 ETH" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={() => placeBid(bidAmount)} isLoading={false}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
    </>
  )
}
