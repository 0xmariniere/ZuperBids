import type { AppProps } from 'next/app'
import { Layout } from 'components/layout'
import { Web3Provider } from 'providers/Web3'
import { ChakraProvider } from 'providers/Chakra'
import { useIsMounted } from 'hooks/useIsMounted'
import { Seo } from 'components/layout/Seo'
import { ZupassProvider } from 'zukit'

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()
  const url = `https://api.pcd-passport.com`

  return (
    <ChakraProvider>
      <Seo />
      <ZupassProvider passportServerURL={url}>
        <Web3Provider>
          {isMounted && (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Web3Provider>
      </ZupassProvider>
    </ChakraProvider>
  )
}
