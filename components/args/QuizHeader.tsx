/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import * as style_utility from "@/styles/utility/utility"

type Props = {
    step: number,
    question: string
};
export const QuizHeader = (props: Props) => {
    return (
        <section css={(props.step>=1) ? [TitleWrap, style_utility.mb20]:style_utility.display_none}>
            <ul>
                <li css={TitleLabel}>Q</li>
                <li css={TitleText}>{props.question}</li>
            </ul>
        </section>
    )
}

const TitleWrap = css({
    backgroundColor:"#492C9E",
    borderRadius: 20,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30
})

const TitleLabel = css({
    color: "#fff",
    lineHeight: "72px",
    width: 70,
    fontSize: 40
})


const TitleText = css({
    backgroundColor: "#E2F0FF",
    borderRadius: 20,
    padding: 17,
    fontSize: 25,
    width: "calc(100% - 70px)",
    minHeight: 72
})
