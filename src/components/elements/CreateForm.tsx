import React, { useState, useCallback } from 'react'
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
import { useDropzone } from 'react-dropzone'
import { myNftABI } from 'abis'
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
  const [selectedImage, setSelectedImage] = useState(null)

  const toast = useToast()
  const infura = new Infura()

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: contractAddress,
    abi: myNftABI,
    functionName: 'createTokenAndStartAuction',
    args: [tokenURIHash, BigInt(1), name, description],
  })

  const onDrop = useCallback(async (acceptedFiles) => {
    // Prepare the file for uploading
    const file = acceptedFiles[0]

    try {
      // Upload the file to Infura
      const res = await infura.uploadMetadata(file)

      // If the upload was successful, update tokenURIHash and selectedImage
      setTokenURIHash(res.url)
      setSelectedImage(URL.createObjectURL(file))
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const createAuction = async () => {
    try {
      await write()
      toast({
        title: 'Auction created.',
        description: "We've created your auction for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'An error occurred.',
        description: 'Unable to create the auction.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Create Auction</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Auction</ModalHeader>
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
                  <Image src={selectedImage} alt="Selected Image" fill />
                ) : (
                  <Box
                    {...getRootProps()}
                    border="2px"
                    borderRadius="md"
                    borderColor={isDragActive ? 'green.500' : 'gray.500'}
                    p="4"
                    mt="2"
                    mb="4"
                    textAlign="center">
                    <input {...getInputProps()} />
                    {isDragActive ? <Text>Drop the files here ...</Text> : <Text>Drag n drop some files here, or click to select files</Text>}
                  </Box>
                )}
              </FormControl>

              <FormControl id="auctionEndTime" isRequired>
                <FormLabel>Auction End Time</FormLabel>
                <Input type="number" value={auctionEndTime} onChange={(e) => setAuctionEndTime(e.target.value)} />
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
