import type { AppProps } from 'next/app'
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </DAppProvider>
    
  ) 
}

export default MyApp
