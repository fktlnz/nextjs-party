/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import * as style_utility from "@/styles/utility/utility"
import Image from "next/Image"

type Props = {
    step: number,
    count: number,
    voteResult: number[],
    data: {
        id:number,
        question:string,
        select1_text:string,
        select1_imgpath:string,
        select2_text:string,
        select2_imgpath:string,
        select3_text:string,
        select3_imgpath:string,
        select4_text:string,
        select4_imgpath:string,
        answer:string
    }
}


type PropsDisplaySelect = {
    hasImg: boolean,
    imgPath: string,
    text: string
}

const DisplaySelect:React.VFC<PropsDisplaySelect>= (props) => {
    if(props.hasImg) {
        return(
            <Image src={props.imgPath} layout="fill" objectFit="contain" />
        )
    }
    return (
        <h2>{props.text}</h2>
    )
}

export const QuizMain = (props: Props) => {
    return (
        <div>
            <section css={(props.step>=2) ? CardsWrap : style_utility.display_none}>
                <div css={(props.step>=4 && props.data.answer=="1") ? [CardWrapPrimary, style_utility.mb30, CorrectShadow]:[CardWrapPrimary, style_utility.mb30]}>
                    <div css={CardTop}>
                        <DisplaySelect hasImg={(props.data.select1_imgpath!="")} imgPath={props.data.select1_imgpath} text={props.data.select1_text}/>
                    </div>
                    <div css={CardBottomPrimary}>
                        <span css={CardBottomLabelPrimary}>A</span>
                        <span css={(props.step>=3) ? CardBottomCount : style_utility.display_none}>{props.voteResult[0]}</span>
                    </div>
                </div>
                <div css={(props.step>=4 && props.data.answer=="2") ? [CardWrapDanger, style_utility.mb30, CorrectShadow]:[CardWrapDanger, style_utility.mb30]}>
                    <div css={CardTop}>
                    <DisplaySelect hasImg={(props.data.select2_imgpath!="")} imgPath={props.data.select2_imgpath} text={props.data.select2_text}/>
                    </div>
                    <div css={CardBottomDanger}>
                        <span css={CardBottomLabelDanger}>B</span>
                        <span css={(props.step>=3) ? CardBottomCount : style_utility.display_none}>{props.voteResult[1]}</span>
                    </div>
                </div>
                <div css={(props.step>=4 && props.data.answer=="3") ? [CardWrapSuccess, style_utility.mb10, CorrectShadow]:[CardWrapSuccess, style_utility.mb10]}>
                    <div css={CardTop}>
                    <DisplaySelect hasImg={(props.data.select3_imgpath!="")} imgPath={props.data.select3_imgpath} text={props.data.select3_text}/>
                    </div>
                    <div css={CardBottomSuccess}>
                        <span css={CardBottomLabelSuccess}>C</span>
                        <span css={(props.step>=3) ? CardBottomCount : style_utility.display_none}>{props.voteResult[2]}</span>
                    </div>
                </div>
                <div css={(props.step>=4 && props.data.answer=="4") ? [CardWrapWarning, style_utility.mb10, CorrectShadow]:[CardWrapWarning, style_utility.mb10]}>
                    <div css={CardTop}>
                    <DisplaySelect hasImg={(props.data.select4_imgpath!="")} imgPath={props.data.select4_imgpath} text={props.data.select4_text}/>
                    </div>
                    <div css={CardBottomWarning}>
                        <span css={CardBottomLabelWarning}>D</span>
                        <span css={(props.step>=3) ? CardBottomCount : style_utility.display_none}>{props.voteResult[3]}</span>
                    </div>
                </div>
            </section>
            <div css={(props.step>=2) ? TimeCountWrap : style_utility.display_none}>
                <span css={TimeCount}>{props.count}</span>
            </div>
            <style jsx>{`
                
            `}</style>
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
    fontSize: 20
})

const CardWrapPrimary = css(CardWrap, {
    border: "3px solid #527FC2 !important"
})
const CardWrapDanger = css(CardWrap, {
    border: "3px solid #C25252 !important"
})
const CardWrapSuccess = css(CardWrap, {
    border: "3px solid #52C256 !important"
})
const CardWrapWarning = css(CardWrap, {
    border: "3px solid #C2B752 !important"
})

const CardTop = css({
    textAlign:'center',
    height: 200,
    backgroundColor:"#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "relative"
})

const CardBottom = css({
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor:"#fff",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    justifyContent: "space-between"
})

const CardBottomPrimary = css(CardBottom,{
    borderTop: "3px solid #527FC2 !important"
})
const CardBottomDanger = css(CardBottom,{
    borderTop: "3px solid #C25252 !important"
})
const CardBottomSuccess = css(CardBottom,{
    borderTop: "3px solid #52C256 !important"
})
const CardBottomWarning = css(CardBottom,{
    borderTop: "3px solid #C2B752 !important"
})

const CardBottomLabel = css({
    display: "inline-block",
    borderRadius: "50%",
    lineHeight: "50px",
    textAlign: "center",
    width: 50,
    height: 50,
    color: "white",
    fontSize: 28
})

const CardBottomLabelPrimary = css(CardBottomLabel, {
    backgroundColor: "#527FC2"
})
const CardBottomLabelDanger = css(CardBottomLabel, {
    backgroundColor: "#C25252"
})
const CardBottomLabelSuccess = css(CardBottomLabel, {
    backgroundColor: "#52C256"
})
const CardBottomLabelWarning = css(CardBottomLabel, {
    backgroundColor: "#C2B752"
})

const CardBottomCount = css({
    lineHeight: "40px",
    display: "inline-block",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#BBFFFF",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 27
})

const TimeCountWrap = css({
    position: "absolute",
    right: 0
})

const TimeCount = css({
    border: "4px solid #C25252",
    borderRadius: "50%",
    boxShadow: "0 0 0 5px #fefefe",
    color: "#fff",
    display: "inline-block",
    width: 60,
    height: 60,
    backgroundColor: "red",
    fontSize: 40,
    textAlign: "center",
    lineHeight: "50px"
})

const CorrectShadow = css({
    boxShadow: "0 0 0 10px red"
})