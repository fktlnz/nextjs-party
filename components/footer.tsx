/** @jsxImportSource @emotion/react */
import type { NextPage } from 'next'
import Image from 'next/image'
import { css, jsx } from '@emotion/react'

const footerStyle = css`
display: flex;
flex: 1;
padding: 2rem 0;
border-top: 1px solid #eaeaea;
justify-content: center;
align-items: center;
a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}
`

const logoStyle = css`
height: 1em;
margin-left: 0.5rem;
`

const Footer = () => {
    return (
        <footer css={footerStyle}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span css={logoStyle}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    )
}

export default Footer