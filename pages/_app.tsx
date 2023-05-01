//import '../styles/globals.css'
import type { AppProps } from 'next/app'
//import {ApolloProvider, ApolloClient,InMemoryCache } from '@apollo/client'
import Layout from '../src/components/commons/layout';
import ApolloSetting from '../src/components/commons/apollo';
import { Global } from '@emotion/react';
import { globalStyles } from '../src/commons/styles/globalStyles';
import { RecoilRoot } from 'recoil';


export default function App({ Component, pageProps}:AppProps) {
  
  return (
    <RecoilRoot>
      <ApolloSetting>
        <>
          <Global styles={globalStyles}/>
          <Layout>
              <Component {...pageProps} />
          </Layout>
        </>
      </ApolloSetting>
    </RecoilRoot>
  );
}
