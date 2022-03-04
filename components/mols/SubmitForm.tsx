/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as style_utility from '@/styles/utility/utility'
import { Button } from "@/components/atoms/Button"

type Props = {
    placeholder?: string,
    value: string,
    onClick: () => void,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}

export const SubmitForm = (props:Props) => {
    return (
        <div css={style_utility.mb30}>
            <input onChange={props.onChange} css={style_utility.mb10} type="text" value={props.value} placeholder={props.placeholder || "メッセージを送信する"}/>
            <Button onClick={props.onClick} variant="basic">送信</Button>
        </div>
    )
}