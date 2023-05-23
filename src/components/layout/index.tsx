import React, { ReactNode } from 'react'
import { Box, Container } from '@chakra-ui/react'
import { Header } from './Header'
import { Footer } from './Footer'
import { NetworkStatus } from './NetworkStatus'
import bg from 'assets/bg.jpeg'
interface Props {
  children: ReactNode
}

export function Layout(props: Props) {
  return (
    <Box margin="0 auto" minH="100vh" bgImage={'/bg.jpeg'} pb={5}>
      <Header />

      <Container maxW="container.lg">{props.children}</Container>

      <Box position="fixed" bottom={2} right={2}>
        <NetworkStatus />
      </Box>
    </Box>
  )
}
