import { AppProps } from 'next/app';
import { Lora, Roboto_Condensed } from 'next/font/google';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
const roboto = Roboto_Condensed({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ["300", "400", "700"]
})

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
  weight: ['400', '500', '600', '700']
})
/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${roboto.variable} ${lora.variable} font-primary bg-bg`}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp;
