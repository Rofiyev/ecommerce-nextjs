import "...@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta http-equiv="Content-Security-Policy" content="" />
      </Head>
      <StateContext>
        <Layout>
          <>
            <Toaster />
            <NextNProgress
              color="#f02d34"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              showOnShallow={true}
            />
            <Component {...pageProps} />
          </>
        </Layout>
      </StateContext>
    </>
  );
}
