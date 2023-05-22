import React from 'react'
import { Image, Text, Box, Card, CardBody, Flex, useColorModeValue } from '@chakra-ui/react'
import { LinkComponent } from './LinkComponent'
import { HeadingComponent } from './HeadingComponent'
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

  return (
    <Box as="section" className={className}>
      {props.title && <HeadingComponent as="h3">{props.title}</HeadingComponent>}

      <Flex direction="column" gap={4}>
        {props.is.map((i, index) => {
          return (
            <LinkComponent href={`/auction?auctionId=${i.tokenId}`} key={`${index}_${i.name}`}>
              <Card key={`${index}_${i.name}`} variant="outline" size="sm">
                <CardBody>
                  <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
                    <Flex px={{ base: 0, sm: 4 }}>
                      <Image maxW="60px" src={i.tokenURIHash} alt={i.name} filter={`invert(${invert})`} />
                    </Flex>

                    <Flex direction="column">
                      <HeadingComponent as="h4">i {i.name}</HeadingComponent>

                      <Text mt={4}>
                        Owner: {i.owner} <br />
                        Highest Bid: {formatEther(i.highestBid)} ETH by {i.highestBidder} <br />
                        description: {i.description}
                      </Text>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
            </LinkComponent>
          )
        })}
      </Flex>
    </Box>
  )
}
