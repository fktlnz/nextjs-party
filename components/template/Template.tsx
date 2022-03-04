/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {GlobalHeader} from "@/components/args/GlobalHeader";
import * as style_utility from '@/styles/utility/utility';
import Image from "next/image";
import { String } from "aws-sdk/clients/cloudsearch";
import Footer from "@/components/footer";

type Props = {
  children?: React.ReactNode
}
type PropsIndex = {
  children?: React.ReactNode,
  text: String
}


export const IndexTemplate = (props: PropsIndex) => {
    const {children} = props;
    return (
        <div>
            <GlobalHeader />
            <main css={mainContainer}>
                <div className="txt-center">
                    <Image src="/img/party.png" width={150} height={150}/>
                </div>
                <p css={[questionTitle, style_utility.mb30]}>{props.text}</p>
                {children}
            </main>
        </div>
    )
}

export const QuizTemplate = (props: Props) => {
    const {children} = props;
    return (
        <div css={style_utility.color_bg}>
            <GlobalHeader title="Quiz Page" />
            <main css={mainContainer}>
                {children}
            </main>
        </div>
    )
}

export const AdminTemplate = (props: Props) => {
    const {children} = props;
    return (
        <div>
            <GlobalHeader title="Admin Page" />
            <main css={mainContainer}>
                <h1 css={title}>
                AdminPage!
                </h1>
                {children}
            </main>
            <Footer />
        </div>
    )
}

const rootContainer = css({

});

const mainContainer = css({
    maxWidth:1280,
    width:'90%',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 0,
    paddingRight: 0,
    height: '100vh',
    position: 'relative'
})

const questionTitle = css({
    fontSize: 30
})

const title = css({
    marginBottom: 20,
    lineHeight: "1.15",
    fontSize: "2rem"
})