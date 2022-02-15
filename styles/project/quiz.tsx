import { css, jsx } from '@emotion/react'

export const Container = css`
    max-width:1280px;
    width:80%;
    margin: 0 auto;
    padding: 20px 0;
    height: 100vh;
`

export const TitleWrap = css`
    background-color:#492C9E;
    border-radius: 20px;
    width: 100%;
    padding: 10px 30px;
`

export const TitleLabel = css`
    color: #fff;
    line-height: 72px;
    width: 70px;
    font-size: 40px;
`

export const TitleText = css`
    background-color: #E2F0FF;
    border-radius: 20px;
    padding: 17px;
    font-size: 25px;
    width: calc(100% - 70px);
    min-height: 72px;
`

export const CardsWrap = css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

export const CorrectShadow = css`
    box-shadow: 0 0 0 10px red;
`

export const CardWrap = css`
    width: 45%;
    border-radius: 20px;
`

export const CardTop = css`
    text-align:center;
    height: 200px;
    background-color:#fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;

`

export const CardBottom = css`
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color:#fff;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
`

export const CardBottomLabel = css`
    display: inline-block;
    border-radius: 50%;
    line-height: 50px;
    text-align: center;
    width: 50px;
    height: 50px;
    color: white;
    font-size: 28px;
`

export const CardBottomCount = css`
    line-height: 40px;
    display: inline-block;
    padding: 5px 20px;
    background-color: #BBFFFF;
    border-radius: 20px;
    text-align: center;
    font-size: 27px;
`