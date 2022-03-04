/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "@/components/atoms/Button"
//utility
import * as style_utility from '@/styles/utility/utility'


type Props = JSX.IntrinsicElements["button"] & {
    onClickDisplay: (step:number)=> void,
    deleteQuestion: ()=>void
};

export const ButtonGroupAdmin = (props:Props) => {
    const {...buttonProps} = props;
    return (
        <div css={style_utility.mb30}>
            <ul>
                <li css={style_utility.mr5}><Button variant="primary" onClick={()=> props.onClickDisplay(1)}>公開[タイトル]</Button></li>
                <li css={style_utility.mr5}><Button variant="primary" onClick={() => props.onClickDisplay(2)}>公開[選択肢]</Button></li>
                <li css={style_utility.mr5}><Button variant="success" onClick={() => props.onClickDisplay(3)}>AnswerCheck</Button></li>
                <li css={style_utility.mr5}><Button variant="success" onClick={() => props.onClickDisplay(4)}>Answer</Button></li>
                <li css={style_utility.mr5}><Button variant="warning" onClick={() => props.onClickDisplay(5)}>終了</Button></li>
                <li><Button variant="danger" onClick={() => props.deleteQuestion()}>削除</Button></li>
            </ul>
        </div>
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