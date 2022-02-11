/** @jsxImportSource @emotion/react */

import {StyleBtn, StylePrimaryBtn, StyleSuccessBtn, StyleWarningBtn, StyleDangerBtn} from '../../styles/components/sbtn'


export const Button = ({ 
    children,
    props
}:{
    children: React.ReactNode,
    props?:any
}) => {
  return (
    <button css={StyleBtn} {...props}>{children}</button>
  )
}
export const PrimaryButton = ({ 
    children,
    props
}:{
    children: React.ReactNode,
    props?:any
}) => {
  return (
    <button css={StylePrimaryBtn} {...props}>{children}</button>
  )
}
export const SuccessButton = ({ 
    children,
    props
}:{
    children: React.ReactNode,
    props?:any
}) => {
  return (
    <button css={StyleSuccessBtn} {...props}>{children}</button>
  )
}
export const WarningButton = ({ 
    children,
    props
}:{
    children: React.ReactNode,
    props?:any
}) => {
  return (
    <button css={StyleWarningBtn} {...props}>{children}</button>
  )
}
export const DangerButton = ({ 
    children,
    props
}:{
    children: React.ReactNode,
    props?:any
}) => {
  return (
    <button css={StyleDangerBtn} {...props}>{children}</button>
  )
}
