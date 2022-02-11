import {styleReset, styleResetInput} from '../styles/foundation/reset'
import type { AppProps } from 'next/app'
import { Global, css } from '@emotion/react'


const global = css`
  ${styleReset}
  ${styleResetInput}
`


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={global}></Global>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
