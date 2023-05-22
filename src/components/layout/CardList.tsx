import React from 'react'
import { Image, Text, Box, Card, CardBody, Flex, useColorModeValue } from '@chakra-ui/react'
import { LinkComponent } from './LinkComponent'
import { HeadingComponent } from './HeadingComponent'

interface ListiType {
  isActive: boolean
  endTime: BigInt
  owner: string
  highestBid: BigInt
  highestBidder: string
  tokenURIHash: string
  name: string
  description: string
}

interface Props {
  className?: string
  title?: string
  is: ListiType[]
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
            <Card key={`${index}_${i.name}`} variant="outline" size="sm">
              <CardBody>
                <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
                  <Flex px={{ base: 0, sm: 4 }}>
                    <Image objectFit="contain" maxW="60px" src={i.tokenURIHash} alt={i.name} filter={`invert(${invert})`} />
                  </Flex>

                  <Flex direction="column">
                    <HeadingComponent as="h4">i {i.name}</HeadingComponent>

                    <Text mt={4}>
                      Owner: {i.owner} <br />
                      Highest Bid: {Number(i.highestBid)} ETH by {i.highestBidder} <br />
                      Status: {i.isActive ? 'Live' : 'Ended'} <br />
                      description: {i.description}
                    </Text>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          )
        })}
      </Flex>
    </Box>
  )
}
