import React from 'react'
import { Flex, useColorModeValue, Spacer, Heading, useBreakpointValue } from '@chakra-ui/react'
import { SITE_NAME } from 'utils/config'
import { LinkComponent } from './LinkComponent'
import { ThemeSwitcher } from './ThemeSwitcher'
import { PassportScore } from './PassportScore'
import { Web3Button } from '@web3modal/react'
import { useZupass, ZupassLoginButton } from 'zukit'
import logo from 'assets/icons/logo.png'
import Image from 'next/image'
interface Props {
  className?: string
}

export function Header(props: Props) {
  const className = props.className ?? ''
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' }) as 'row' | 'column'
  const justifyContent = flexDirection === 'row' ? 'space-between' : 'center'
  const alignItems = flexDirection === 'row' ? 'center' : 'stretch'
  const gap = useBreakpointValue({ base: 2, md: 4 })

  return (
    <Flex
      as="header"
      className={className}
      px={{ base: 2, md: 4 }}
      py={2}
      mb={8}
      direction={flexDirection}
      justify={justifyContent}
      alignItems={alignItems}>
      <LinkComponent href="/">
        <Heading as="h1" size="lg" textAlign={flexDirection === 'column' ? 'center' : 'left'} color={'white'}>
          <Image src={logo} alt="logo" width={200} />
        </Heading>
      </LinkComponent>

      {flexDirection === 'row' && <Spacer />}

      <Flex alignItems="center" gap={gap} mt={{ base: 2, md: 0 }}>
        <PassportScore />
        <div style={{ textAlign: 'center', color: 'black' }}>
          <ZupassLoginButton />
        </div>
        <Web3Button icon="hide" label="Connect" />
      </Flex>
    </Flex>
  )
}
