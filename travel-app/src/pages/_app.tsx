import type { AppProps } from "next/app";
import Head from "next/head";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/normalize.css";
import "../styles/index.scss";
import ControlPanel from "@/components/ControlPanel/ControlPanel";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Travel App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <ControlPanel />
    </>
  );
}
