import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { apolloClient } from '../Utils/utils';
import { ApolloProvider } from '@apollo/client';
import WalletProvider from '../components/common/WalletContext';

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Kaarigar',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


function MyApp({ Component, pageProps }) {
  return(
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
          <ApolloProvider client={apolloClient}>
        <WalletProvider>
            <Component {...pageProps} />
        </WalletProvider>
          </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp
