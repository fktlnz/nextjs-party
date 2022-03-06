/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"


type Props = JSX.IntrinsicElements["button"] & {
    children: React.ReactNode,
    width?:number,
    height?:number,
    variant?:
        | 'basic'
        | 'primary'
        | 'danger'
        | 'success'
        | 'warning'
}

export const Button = (props:Props) => {
    const {children, variant='basic', ...buttonProps} = props
    return (
        <button
            style={{width: props.width, height:props.height}}
            css={variants[variant]}
            {...buttonProps}
        >
            {children}
        </button>
    )
}

const base = css({
    width: 100,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 8,
    paddingLeft: 8,
    backgroundColor: '#525252',
    fontSize: '1em',
    lineHeight:1.5,
    borderRadius: 4,
    border: 'none',
    color: '#fff',
    cursor:'pointer'
})

const variants = {
    basic: css(base),
    primary: css(base,{
        backgroundColor: '#527FC2'
    }),
    danger: css(base, {
        backgroundColor: '#C25252'
    }),
    success: css(base, {
        backgroundColor: '#52C256'
    }),
    warning: css(base, {
        backgroundColor: '#C2B752'
    })
}