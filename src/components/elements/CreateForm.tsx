import React, { useState, useCallback, useEffect } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Box,
  Text,
} from '@chakra-ui/react'
import { zupaBidsABI } from 'abis'
import { CONTRACT_ADDRESS } from 'utils/config'
import { useContractWrite } from 'wagmi'
import axios from 'axios'
import Image from 'next/image'
import Infura from 'services/infura'
// replace with your contract's address
const contractAddress = CONTRACT_ADDRESS

export function CreateAuctionModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tokenURIHash, setTokenURIHash] = useState('')
  const [auctionEndTime, setAuctionEndTime] = useState('')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const toast = useToast()
  const infura = new Infura()

  const { data, isLoading, isSuccess, write, isError } = useContractWrite({
    address: contractAddress,
    abi: zupaBidsABI,
    functionName: 'createTokenAndStartAuction',
    args: [tokenURIHash, BigInt(1684871788), name, description],
  })

  const onDrop = useCallback(async (acceptedFiles: any) => {
    // Prepare the file for uploading
    console.log(acceptedFiles)
    const file = acceptedFiles[0]

    try {
      // Upload the file to Infura
      const res = await infura.uploadMetadata(file)
      console.log(res)
      // If the upload was successful, update tokenURIHash and selectedImage
      setTokenURIHash(res.url)
      setSelectedImage(URL.createObjectURL(file))
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Auction created.',
        description: "We've created your auction for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      onClose()
    }

    if (isError) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to create the auction.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    return () => {
      setName('')
      setDescription('')
      setTokenURIHash('')
      setAuctionEndTime('')
      setSelectedImage(null)
    }
  }, [isSuccess, isError, onClose])

  const createAuction = async () => {
    try {
      await write()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Button ml={3} onClick={onOpen} color={'black'}>
        Create Auction
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ml={3}>Create Auction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                createAuction()
              }}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>

              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              </FormControl>

              <FormControl id="tokenURIHash" isRequired>
                <FormLabel>Item image</FormLabel>
                {selectedImage ? (
                  <Image src={selectedImage} alt="Selected Image" width={200} height={200} />
                ) : (
                  <input id="file-upload" type="file" name="file" onChange={(e) => onDrop(e.target.files)} />
                )}
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} isLoading={isLoading} onClick={createAuction}>
              Create
            </Button>
            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateAuctionModal
