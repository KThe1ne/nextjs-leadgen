import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Lead Magnet Generator',
  description: 'Get ideas for a lead magnet that will help you attract more customers and stand out from your competitors.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
