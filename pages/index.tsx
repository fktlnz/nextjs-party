/** @jsxImportSource @emotion/react */
import React, {useState, useEffect} from "react";
import type { NextPage } from 'next';
import Head from 'next/head';
// service
import useSocket from '../service/useSocket';
// Styles
import * as style_index from '../styles/project/index';
import * as style_quiz from '../styles/project/quiz';
import * as style_utility from '../styles/utility/utility'
import * as style_btn from '../styles/components/sbtn'

const Home:NextPage = () => {

    const {id, step, countUpVote, sendMessage} = useSocket();
    const [questionText, setQuestionText] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    useEffect(() => {

        if(step==0){
            setQuestionText("問題発表までおまちください・・");
        }else if(step==1) {
            console.log('display title');
            getQuestionById(id)
            .then(question => {
                console.log('question data!!:', question);
                setQuestionText(question.question)
            })
            .catch((error) => {
                console.error('get question error!!:', error);
            });
        }else if(step==2) {
            console.log('display selection');
        }else if(step==3) {
            console.log('answer check');
        }else if(step==4) {
            console.log('display answer');
        }else if(step==5) {
            console.log('display end');
        }

        
    },[id, step]);

    const getQuestionById = async (id: number) => {
        const data = {
            id: id,
        }
        const res = await fetch(`/api/questions/select`, {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const question = await res.json();
        return question.shift();
    }

    const countUp = (index:number) => {
        countUpVote(index)
    }

    const handleSubmitMessage = () => {
        console.log(message);
        sendMessage(message);
        setMessage("");
    }
    const handleChangeMessage = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }


    return (
        <div css={style_utility.color_bg}>
        <Head>
            <title>User's Page!</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main css={style_index.Container}>
        <h2 css={[style_index.title, style_utility.mb30]}>Party</h2>
        <p css={[style_index.questionTitle, style_utility.mb30]}>{questionText}</p>
        <section css={style_index.CardsWrap}>
            <button onClick={()=>countUp(1)} css={[style_btn.StylePrimaryBtn, style_index.CardWrap ,style_utility.mb30]}>A</button>
            <button onClick={()=>countUp(2)} css={[style_btn.StyleDangerBtn, style_index.CardWrap ,style_utility.mb30]}>B</button>
            <button onClick={()=>countUp(3)} css={[style_btn.StyleSuccessBtn, style_index.CardWrap ,style_utility.mb30]}>C</button>
            <button onClick={()=>countUp(4)} css={[style_btn.StyleWarningBtn, style_index.CardWrap ,style_utility.mb30]}>D</button>
        </section>
        <div css={style_utility.mb30}>
            <input onChange={(e)=>handleChangeMessage(e)} css={style_utility.mb10} type="text" placeholder="メッセージを送信" value={message}/>
            <button onClick={()=>handleSubmitMessage()} css={style_btn.StyleBtn} type="button">送信</button>
        </div>
        </main>
        <style jsx>{`
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
            input[type="text"] {
                background-color: #fff;
                font-size: 
            }
        `}
        </style>
        </div>
    )

}

export default Home