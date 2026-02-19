// pages/_app.js
import '../styles/globals.css' // your global styles
import { Analytics } from "@vercel/analytics/next"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics /> {/* <-- this is the key line */}
    </>
  )
}
