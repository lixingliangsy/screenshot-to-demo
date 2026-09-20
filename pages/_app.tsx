import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

export default function App({ Component, pageProps }: AppProps) {
  return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SnapDemo" />
        <meta property="og:description" content="Upload a screenshot of your app and SnapDemo generates a guided, step-by-step product walkthrough with hotspots, captions, and a shareable link  -  no video editing, no code." />
        <meta property="og:url" content="https://screenshot-to-demo.lxsaihub.com/" />
        <meta property="og:image" content="https://screenshot-to-demo.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SnapDemo" />
        <meta name="twitter:description" content="Upload a screenshot of your app and SnapDemo generates a guided, step-by-step product walkthrough with hotspots, captions, and a shareable link  -  no video editing, no code." />
        <meta name="twitter:image" content="https://screenshot-to-demo.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"SnapDemo","url":"https://screenshot-to-demo.lxsaihub.com/","description":"Upload a screenshot of your app and SnapDemo generates a guided, step-by-step product walkthrough with hotspots, captions, and a shareable link  -  no video editing, no code.","applicationCategory":"BusinessApplication","operatingSystem":"Web","offers":{"@type":"Offer","priceCurrency":"USD","price":"0","availability":"https://schema.org/OnlineOnly"}}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
}
