/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import * as style_utility from '@/styles/utility/utility'
import { useFormContext, RegisterOptions, get } from "react-hook-form"


type Props = JSX.IntrinsicElements['input'] & {
  name: string,
  registerOptions: RegisterOptions
}

export const InputText = (
  props: Props
) => {
  const { register, formState: { errors }} = useFormContext();
  // const methods = register(props.name, props.registerOptions)
  const { registerOptions, name,  ...inputProps } = props
  console.log('errors')
  console.log(errors)
  const style = (get(errors, props.name)) ? ErrorInputStyle : baseInputStyle

  return <input {...register(props.name, props.registerOptions)} css={style} type="text" {...inputProps} />

}

const baseInputStyle = css({
  appearance: "none",
  backgroundColor: "transparent",
  backgroundImage: "none",
  border: "1px solid rgba(0, 0, 0, 0.16)",
  borderRadius: 4,
  color: "inherit",
  fontFamily: "inherit",
  fontSize: "1em",
  paddingTop: "0.4em",
  paddingBottom: "0.4em",
  paddingLeft: "0.8em",
  paddingRight: "0.8em",
  width: "100%"
})

const ErrorInputStyle = css(baseInputStyle, style_utility.border_warning)

