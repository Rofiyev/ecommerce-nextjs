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
        <link
          rel="shortcut icon"
          href="https://rof1yev-blog.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.cbf9d521.png&w=384&q=75"
          type="image/x-icon"
        />
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
