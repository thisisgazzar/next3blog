import Head from "next/head";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider network={ChainId.Mumbai}>
      <Head>
        <title>Next3Blog</title>
      </Head>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
