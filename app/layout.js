import './globals.css'
import { Montserrat } from 'next/font/google'
import Head from 'next/head'
import Script from 'next/script'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Lead Magnet Generator',
  description: 'Get ideas for a lead magnet that will help you attract more customers and stand out from your competitors.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
      <Head>
        <Script id="google-tag-manager" strategy='afterInteractive'>{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-544GVJ2Z');
        `}
        </Script>
      </Head>
      <body className={montserrat.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-544GVJ2Z"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        {children}
        {/* End Google Tag Manager (noscript) */}
      </body>
    </html>
  )
}
