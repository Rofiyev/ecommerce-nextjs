import "...@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

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
            <Component {...pageProps} />
          </>
        </Layout>
      </StateContext>
    </>
  );
}
