import React, { useState } from 'react'
import { Box, Image, Text, Grid, GridItem, Heading, useColorModeValue, Input, Flex, Button } from '@chakra-ui/react'
import { LinkComponent } from './LinkComponent'
import { AuctionItem } from 'types'
import { formatEther } from 'ethers/lib/utils'
import CreateForm from 'components/elements/CreateForm'

interface Props {
  className?: string
  title?: string
  is: AuctionItem[]
}

export function CardList(props: Props) {
  const className = props.className ?? ''
  const textColor = useColorModeValue('black', 'black')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortDesc, setSortDesc] = useState(false)

  let sortedis = [...props.is]

  if (sortDesc) {
    sortedis.sort((a, b) => parseFloat(formatEther(b.highestBid)) - parseFloat(formatEther(a.highestBid)))
  }

  const filteredis = sortedis.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Box as="section" className={className}>
      {props.title && (
        <Heading as="h3" size="lg" mb={6} color={'white'}>
          {props.title}
          <CreateForm />
        </Heading>
      )}

      <Flex mb={6} justify="space-between">
        <Input mr={4} value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search by name" />

        <Button onClick={() => setSortDesc(!sortDesc)}>Sort</Button>
      </Flex>

      <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {filteredis.map((item, index) => (
          <LinkComponent href={`/auction?auctionId=${item.tokenId}`} key={`${index}_${item.name}`}>
            <GridItem borderRadius="lg" overflow="hidden" boxShadow="md" maxW={'100%'}>
              <Box maxH={'300px'} overflow={'hidden'} width={'100%'}>
                <Image src={item.tokenURIHash} alt={item.name} width={'100%'} />
              </Box>
              <Box p={4} bgColor={'white'}>
                <Heading as="h4" size="md" mb={2} color={textColor}>
                  {item.name}
                </Heading>

                <Text fontSize="lg" color={textColor} mb={2}>
                  <span style={{ fontWeight: 'bold' }}> Current bid:</span> {formatEther(item.highestBid)} ETH
                </Text>
                {/* <Text fontSize="lg" color={textColor} mb={2} textOverflow={'clip'} wordBreak={'break-word'}>
                  <span style={{ fontWeight: 'bold' }}> Highest bidder:</span> {item.highestBidder}
                </Text> */}
                {/* <Text fontSize="lg" color={textColor} mb={2} overflow={'clip'}>
                  Highest Bidder: {item.highestBidder}
                </Text> */}
              </Box>
            </GridItem>
          </LinkComponent>
        ))}
      </Grid>
    </Box>
  )
}
