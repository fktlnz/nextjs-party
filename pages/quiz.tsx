/** @jsxImportSource @emotion/react */
import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/footer'
// Socket
import useSocket from '../service/useSocket'
// Styles
import * as style_quiz from '../styles/project/quiz'
import * as style_utility from '../styles/utility/utility'
import * as style_btn from '../styles/components/sbtn'

type TableData = {
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
};

type TableDatas = {
    rows:TableData[]
};

type imgPath = {
    img_path1: string,
    img_path2: string,
    img_path3: string,
    img_path4: string,
}

type IFormInputs = {
  question: string,
  select1: string,
  select2: string,
  select3: string,
  select4: string,
  answer: string
}

type PropsDisplaySelect = {
    hasImg: boolean,
    imgPath: string,
    text: string
}

const Home:NextPage = () => {
    const [hasError, setHasError] = useState<boolean>(false);
    const [row, setRow] = React.useState("0")
    const [question, setQuestion] = React.useState<TableData>({
        id:-1,
        question:"",
        select1_text:"",
        select1_imgpath:"",
        select2_text:"",
        select2_imgpath:"",
        select3_text:"",
        select3_imgpath:"",
        select4_text:"",
        select4_imgpath:"",
        answer:""
    })
    //0(default), 1(display title), 2(display selection), 3(answer check), 4(display answer)
    const {id, step, sendStep} = useSocket();

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {

        if(step==0){

        }else if(step==1) {
            console.log('display title');
            getQuestionById(id)
            .then(question => {
                console.log('question data!!:', question);
                setQuestion(question)
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
    // 問題新規保存
    const saveQuestion = async (input:IFormInputs) => {
        const data = {
            question: input.question,
            select1_text:input.select1,
            select1_imgpath:"",
            select2_text:input.select2,
            select2_imgpath:"",
            select3_text:input.select3,
            select3_imgpath:"",
            select4_text:input.select4,
            select4_imgpath:"",
            answer:input.answer
        }
        await fetch(`/api/questions/create`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Save Data!!:', data);
            
        })
        .catch((error) => {
            console.error('Save Error!!:', error);
        });
    }
    // DBを更新
    const updateQuestion = async (tableData:TableData) => {
        const data = {
            id: tableData.id,
            question: tableData.question,
            select1_text:tableData.select1_text,
            select1_imgpath:tableData.select1_imgpath,
            select2_text:tableData.select2_text,
            select2_imgpath:tableData.select2_imgpath,
            select3_text:tableData.select3_text,
            select3_imgpath:tableData.select3_imgpath,
            select4_text:tableData.select4_text,
            select4_imgpath:tableData.select4_imgpath,
            answer:tableData.answer
        }
        await fetch(`/api/questions/update`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Update Data!!:', data);
            
        })
        .catch((error) => {
            console.error('Update Error!!:', error);
        });

    }

    const onChangeRadio = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setRow(e.target.value)
    }

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

    return (
        <div css={style_utility.color_bg}>
        <Head>
            <title>Quiz Page!</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main css={style_quiz.Container}>
            <section css={(step>=1) ? [style_quiz.TitleWrap, style_utility.mb20]:style_utility.display_none}>
                <ul>
                    <li css={style_quiz.TitleLabel}>Q</li>
                    <li css={style_quiz.TitleText}>{question.question}</li>
                </ul>
            </section>
            <section css={(step>=2) ? style_quiz.CardsWrap : style_utility.display_none}>
                <div className="border-primary" css={(step>=4 && question.answer=="1") ? [style_quiz.CardWrap, style_utility.mb30, style_quiz.CorrectShadow]:[style_quiz.CardWrap, style_utility.mb30]}>
                    <div css={style_quiz.CardTop}>
                        <DisplaySelect hasImg={(question.select1_imgpath!="")} imgPath={question.select1_imgpath} text={question.select1_text}/>
                    </div>
                    <div className="border-top-primary" css={style_quiz.CardBottom}>
                        <span className="bg-primary" css={style_quiz.CardBottomLabel}>A</span>
                        <span css={(step>=3) ? style_quiz.CardBottomCount : style_utility.display_none}>10</span>
                    </div>
                </div>
                <div className="border-danger" css={(step>=4 && question.answer=="2") ? [style_quiz.CardWrap, style_utility.mb30, style_quiz.CorrectShadow]:[style_quiz.CardWrap, style_utility.mb30]}>
                    <div css={style_quiz.CardTop}>
                    <DisplaySelect hasImg={(question.select2_imgpath!="")} imgPath={question.select2_imgpath} text={question.select2_text}/>
                    </div>
                    <div className="border-top-danger" css={style_quiz.CardBottom}>
                        <span className="bg-danger" css={style_quiz.CardBottomLabel}>B</span>
                        <span css={(step>=3) ? style_quiz.CardBottomCount : style_utility.display_none}>10</span>
                    </div>
                </div>
                <div className="border-success" css={(step>=4 && question.answer=="3") ? [style_quiz.CardWrap, style_utility.mb30, style_quiz.CorrectShadow]:[style_quiz.CardWrap, style_utility.mb30]}>
                    <div css={style_quiz.CardTop}>
                    <DisplaySelect hasImg={(question.select3_imgpath!="")} imgPath={question.select3_imgpath} text={question.select3_text}/>
                    </div>
                    <div className="border-top-success" css={style_quiz.CardBottom}>
                        <span className="bg-success" css={style_quiz.CardBottomLabel}>C</span>
                        <span css={(step>=3) ? style_quiz.CardBottomCount : style_utility.display_none}>10</span>
                    </div>
                </div>
                <div className="border-warning" css={(step>=4 && question.answer=="4") ? [style_quiz.CardWrap, style_utility.mb30, style_quiz.CorrectShadow]:[style_quiz.CardWrap, style_utility.mb30]}>
                    <div css={style_quiz.CardTop}>
                    <DisplaySelect hasImg={(question.select4_imgpath!="")} imgPath={question.select4_imgpath} text={question.select4_text}/>
                    </div>
                    <div className="border-top-warning" css={style_quiz.CardBottom}>
                        <span className="bg-warning" css={style_quiz.CardBottomLabel}>D</span>
                        <span css={(step>=3) ? style_quiz.CardBottomCount : style_utility.display_none}>10</span>
                    </div>
                </div>
                
            </section>
            
            
            
            
        </main>

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

// This gets called on every request
// export const getServerSideProps:GetServerSideProps = async (context) => {
//     // Fetch data from external API
//     const param = {
//         id: 1,
//     }

//     const res = await fetch(`http://127.0.0.1:3000/api/questions/select`, {
//         method: 'POST', // or 'PUT'
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(param),
//     });

//     const data = await res.json();
  
//     console.log('serversideprops:')
//     console.log(data)
//     // Pass data to the page via props
//     return { props: { data } }
//   }

export default Home
