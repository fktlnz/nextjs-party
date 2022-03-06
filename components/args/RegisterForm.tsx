/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Button } from "@/components/atoms/Button"
//utility
import * as style_utility from '@/styles/utility/utility'


type Props = JSX.IntrinsicElements["button"] & {
    handleSubmit: (submit:any) => void,
    deleteQuestion: ()=>void,
    register: (text:string, {required: boolean}) => void
}

export const ButtonGroupAdmin = (props:Props) => {
    const {...buttonProps} = props
    return (
        <div css={style_utility.mb30}>
            <form onSubmit={props.handleSubmit}>
                <input {...props.register("question", {required: true})} css={style_utility.mb10} css={[(errors.question ? style_utility.border_warning : ""), style_utility.mb10]} type="text" placeholder="問題文を入力してください"/>
                <input {...props.register("select1", {required: true})} css={style_utility.mb10} css={(errors.select1 ? style_utility.border_warning : "")} type="text" placeholder="選択肢１を入力してください"/>
                <input {...props.register("select2", {required: true})} css={style_utility.mb10} css={(errors.select2 ? style_utility.border_warning : "")} type="text" placeholder="選択肢２を入力してください"/>
                <input {...props.register("select3", {required: true})} css={style_utility.mb10} css={(errors.select3 ? style_utility.border_warning : "")} type="text" placeholder="選択肢３を入力してください"/>
                <input {...props.register("select4", {required: true})} css={style_utility.mb10} css={(errors.select4 ? style_utility.border_warning : "")} type="text" placeholder="選択肢４を入力してください"/>
                <div css={style_utility.mb10}>
                    <input {...register("answer", { pattern: /[1-4]/ , required:true, min:1, max:4})} css={(errors.answer ? style_utility.border_warning : "")} type="text" placeholder="解答を入力してください(1-4)"/>
                    <p css={style_utility.text_warning}>{(errors.answer?.type=="max" || errors.answer?.type=="min" || errors.answer?.type=="pattern")  && "1-4で入力してください"}</p>
                </div>
                <button css={style_btn.StyleBtn} type="submit">作成</button>
            </form>
        </div>
    )
}
