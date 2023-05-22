import React from 'react'
import { Box, Image, Text, Grid, GridItem, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import { LinkComponent } from './LinkComponent'
import { AuctionItem } from 'types'
import { formatEther } from 'viem'

interface Props {
  className?: string
  title?: string
  is: AuctionItem[]
}

export function CardList(props: Props) {
  const className = props.className ?? ''
  const invert = useColorModeValue('20%', '80%')
  const textColor = useColorModeValue('black', 'white')

  return (
    <Box as="section" className={className}>
      {props.title && (
        <Heading as="h3" size="lg" mb={6}>
          {props.title}
        </Heading>
      )}
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {props.is.map((i, index) => (
          <LinkComponent href={`/auction?auctionId=${i.tokenId}`} key={`${index}_${i.name}`}>
            <GridItem borderRadius="lg" overflow="hidden" boxShadow="md" maxW="250px">
              <Image src={i.tokenURIHash} alt={i.name} />
              <Box p={4}>
                <Heading as="h4" size="md" mb={2} color={textColor}>
                  {i.name}
                </Heading>

                <Text fontSize="sm" color={textColor}>
                  Highest Bid: {formatEther(i.highestBid)} ETH
                </Text>
              </Box>
            </GridItem>
          </LinkComponent>
        ))}
      </Grid>
    </Box>
  )
}
