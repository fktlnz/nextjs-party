/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "@/components/atoms/Button"
//utility
import * as style_utility from '@/styles/utility/utility'


type Props = JSX.IntrinsicElements["button"];

export const ButtonGroup = (props:Props) => {
    const {...buttonProps} = props;
    return (
        <section css={CardsWrap}>
            <Button {...buttonProps} variant="primary" css={[CardWrap, style_utility.mb30]}>A</Button>
            <Button {...buttonProps} variant="danger" css={[CardWrap, style_utility.mb30]}>B</Button>
            <Button {...buttonProps} variant="success" css={[CardWrap, style_utility.mb30]}>C</Button>
            <Button {...buttonProps} variant="warning" css={[CardWrap, style_utility.mb30]}>D</Button>
        </section>
    )
}

const CardsWrap = css({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
})

const CardWrap = css({
    width: '49%',
    borderRadius: 10,
    padding: 10,
    fontSize: 20
})