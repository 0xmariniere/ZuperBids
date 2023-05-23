import { ThemingProps } from '@chakra-ui/react'
import { mainnet, sepolia, polygon, optimism, arbitrum } from '@wagmi/chains'
import { polygonMumbai, goerli } from 'viem/chains'

export const SITE_NAME = 'ZuperBids'
export const SITE_DESCRIPTION = 'Next.js + Ethereum starter kit'
export const SITE_URL = 'https://nexth.vercel.app'

export const THEME_INITIAL_COLOR = 'light'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'wslyvh'
export const SOCIAL_GITHUB = 'wslyvh/nexth'

export const ETH_CHAINS = [optimism]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export const CONTRACT_ADDRESS = '0x5149bD931563855F63d2Cd378e9044aBCEB1bAC6'
