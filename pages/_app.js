import 'tailwindcss/tailwind.css'
import { useEffect } from 'react'
import Head from "next/head"
import '../public/css/chessboard-1.0.0.css'
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope, registration);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        )
      })
    }
  }, [])
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Home-Dash</title>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/images/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/images/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/images/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
        <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
        <script src="js/chessboard-1.0.0.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
    
  )
}

export default MyApp
