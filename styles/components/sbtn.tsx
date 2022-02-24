/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'

export const StyleBtn = css`
    width: 100px;
    padding: 4px 8px;
    background-color: #525252;
    font-size: 1em;
    line-height:1.5;
    border-radius: 4px;
    border: none;
    color: white;
    &:hover {
        opacity: .8;
        cursor:pointer;
    }
`
export const StylePrimaryBtn = css`
  ${StyleBtn}
  width: 150px;
  background-color: #527FC2;
`
export const StyleDangerBtn = css`
  ${StyleBtn}
  background-color: #C25252;
`
export const StyleWarningBtn = css`
  ${StyleBtn}
  background-color: #C2B752;
`
export const StyleSuccessBtn = css`
  ${StyleBtn}
  background-color: #52C256;
`