import { Head } from 'components/layout/Head'
import Router, { useRouter } from 'next/router'
import useAuctionItem from 'hooks/useAuctionItem'
import { useEffect, useState } from 'react'
import { formatEther } from 'ethers/lib/utils'
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
  VStack,
  HStack,
  Spacer,
  Center,
} from '@chakra-ui/react'
import { useZupass, ZupassLoginButton } from 'zukit'

export default function Auction() {
  const { auctionId } = Router.query
  const router = useRouter()

  const { auctionItem, placeBid, isLoading, isError, isBidSuccess, bidError } = useAuctionItem({ id: Number(auctionId) })
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [bidAmount, setBidAmount] = useState('')
  const [timeLeft, setTimeLeft] = useState('')
  const [zupass] = useZupass()

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (!auctionItem) return
      const now = Date.now()
      const endTime = Number(auctionItem.endTime) * 1000 // convert to milliseconds
      const diff = Math.max(0, endTime - now) // milliseconds difference or 0 if the time has passed

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setTimeLeft(`${hours}:${minutes}:${seconds}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [auctionItem])

  const goToNextAuction = () => {
    router.push(`/auction?auctionId=${Number(auctionId) + 1}`)
  }

  const goToPreviousAuction = () => {
    if (Number(auctionId) > 1) {
      router.push(`/auction?auctionId=${Number(auctionId) - 1}`)
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
      ) : zupass.status === 'logged-in' ? (
        <main color={'black'}>
          <Box p="5" maxW={'500px'} w={'full'} mx={'auto'} mt={5}>
            <VStack spacing={4} color={'black'}>
              <Box>
                <Image borderRadius="lg" src={auctionItem.tokenURIHash} alt={auctionItem.name} />
              </Box>
              <Box bgColor={'white'} borderRadius="md" m={0} w={'full'} p={4}>
                <HStack w="full">
                  <Heading fontWeight="bold" fontSize="xl" textTransform="uppercase" ml={4}>
                    {auctionItem.name}
                    <text style={{ fontWeight: 300 }}>{auctionItem.telegramId}</text>
                  </Heading>
                  <Spacer />
                  <Button colorScheme="teal" onClick={onOpen} isLoading={false}>
                    Place a bid
                  </Button>
                </HStack>
                <HStack w="full" spacing={4} mt={4}>
                  <Box border="1px" borderColor="gray.200" borderRadius="md" p={2} w={'50%'}>
                    <VStack>
                      <Text fontSize="md" fontWeight="bold">
                        Current Bid:
                      </Text>
                      <Center>
                        <Text fontSize="lg">{formatEther(auctionItem.highestBid) || '0'} ETH</Text>
                      </Center>
                    </VStack>
                  </Box>
                  <Box border="1px" borderColor="gray.200" borderRadius="md" p={2} w={'50%'}>
                    <VStack>
                      <Text fontSize="md" fontWeight="bold">
                        End Time:
                      </Text>
                      <Center>
                        <Text fontSize="lg" ml={4}>
                          {timeLeft}
                        </Text>
                      </Center>
                    </VStack>
                  </Box>
                </HStack>
                <Text p={4}>{auctionItem.description}</Text>
              </Box>
            </VStack>
            <HStack justify="end" mt={5}>
              <Button onClick={goToPreviousAuction}>&lt;</Button>
              <Button onClick={goToNextAuction}> &gt;</Button>
            </HStack>
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
                <Button colorScheme="blue" mr={3} onClick={() => placeBid(Number(bidAmount))} isLoading={false}>
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </main>
      ) : (
        <>Loading...</>
      )}
    </>
  )
}
