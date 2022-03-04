/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as style_utility from "@/styles/utility/utility";
import Image from "next/Image";

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
};


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
                <div className="border-primary" css={(props.step>=4 && props.data.answer=="1") ? [CardWrap, style_utility.mb30, CorrectShadow]:[CardWrap, style_utility.mb30]}>
                    <div css={CardTop}>
                        <DisplaySelect hasImg={(props.data.select1_imgpath!="")} imgPath={props.data.select1_imgpath} text={props.data.select1_text}/>
                    </div>
                    <div className="border-top-primary" css={CardBottom}>
                        <span className="bg-primary" css={CardBottomLabel}>A</span>
                        <span css={(props.step>=3) ? CardBottomCount : style_utility.display_none}>{props.voteResult[0]}</span>
                    </div>
                </div>
                <div className="border-danger" css={(props.step>=4 && props.data.answer=="2") ? [CardWrap, style_utility.mb30, CorrectShadow]:[CardWrap, style_utility.mb30]}>
                    <div css={CardTop}>
                    <DisplaySelect hasImg={(props.data.select2_imgpath!="")} imgPath={props.data.select2_imgpath} text={props.data.select2_text}/>
                    </div>
                    <div className="border-top-danger" css={CardBottom}>
                        <span className="bg-danger" css={CardBottomLabel}>B</span>
                        <span css={(props.step>=3) ? CardBottomCount : style_utility.display_none}>{props.voteResult[1]}</span>
                    </div>
                </div>
                <div className="border-success" css={(props.step>=4 && props.data.answer=="3") ? [CardWrap, style_utility.mb10, CorrectShadow]:[CardWrap, style_utility.mb10]}>
                    <div css={CardTop}>
                    <DisplaySelect hasImg={(props.data.select3_imgpath!="")} imgPath={props.data.select3_imgpath} text={props.data.select3_text}/>
                    </div>
                    <div className="border-top-success" css={CardBottom}>
                        <span className="bg-success" css={CardBottomLabel}>C</span>
                        <span css={(props.step>=3) ? CardBottomCount : style_utility.display_none}>{props.voteResult[2]}</span>
                    </div>
                </div>
                <div className="border-warning" css={(props.step>=4 && props.data.answer=="4") ? [CardWrap, style_utility.mb10, CorrectShadow]:[CardWrap, style_utility.mb10]}>
                    <div css={CardTop}>
                    <DisplaySelect hasImg={(props.data.select4_imgpath!="")} imgPath={props.data.select4_imgpath} text={props.data.select4_text}/>
                    </div>
                    <div className="border-top-warning" css={CardBottom}>
                        <span className="bg-warning" css={CardBottomLabel}>D</span>
                        <span css={(props.step>=3) ? CardBottomCount : style_utility.display_none}>{props.voteResult[3]}</span>
                    </div>
                </div>
            </section>
            <div css={(props.step>=2) ? TimeCountWrap : style_utility.display_none}>
                <span css={TimeCount}>{props.count}</span>
            </div>
            <style jsx>{`
                .reset-table {
                    float:right;
                }
                .border-top-primary {
                    border-top: 3px solid #527FC2 !important;
                }
                .border-top-danger {
                    border-top: 3px solid #C25252 !important;
                }
                .border-top-success {
                    border-top: 3px solid #52C256 !important;
                }
                .border-top-warning {
                    border-top: 3px solid #C2B752 !important;
                }
                .border-primary {
                    border: 3px solid #527FC2 !important;
                }
                .border-danger {
                    border: 3px solid #C25252 !important;
                }
                .border-success {
                    border: 3px solid #52C256 !important;
                }
                .border-warning {
                    border: 3px solid #C2B752 !important;
                }
                .bg-primary {
                    background-color: #527FC2;
                }
                .bg-danger {
                    background-color: #C25252;
                }
                .bg-success {
                    background-color: #52C256;
                }
                .bg-warning {
                    background-color: #C2B752;
                }
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