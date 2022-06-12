import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis';
import { getDefaultProvider } from 'ethers';
import { Rinkeby } from '@usedapp/core';
import { DAppProvider } from '@usedapp/core';

import '../styles/globals.css'
import Layout from "../components/layout/Layout";


const config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Rinkeby.chainId]: getDefaultProvider('mainnet'),
  },
}


function MyApp({ Component, pageProps }: AppProps) {
  return(
    <DAppProvider config={config}>
      <MoralisProvider initializeOnMount={false}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MoralisProvider>
    </DAppProvider>
    
  ) 
}

export default MyApp
