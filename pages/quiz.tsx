/** @jsxImportSource @emotion/react */
import React, {useState, useEffect} from "react"
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// service
import useSocket from '../service/useSocket'
import useCount from '../service/useCount'
// Styles
import * as style_quiz from '../styles/project/quiz'
import * as style_utility from '../styles/utility/utility'
// Sound
import useSound from 'use-sound'
import { QuizTemplate } from "@/components/template/Template"
import { QuizHeader } from "@/components/args/QuizHeader"
import { QuizMain } from "@/components/args/QuizMain"

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
}

type TableDatas = {
    rows:TableData[]
}

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

const Home:NextPage = () => {
    const [question, setQuestion] = useState<TableData>({
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
    const {id, step, voteResult, enableVote} = useSocket()
    const {count, isTimerEnd, initCount, startCount} = useCount()
    const [playSoundTitle] = useSound('/sounds/sound_title.mp3')

    useEffect(() => {
        if(step==0){
            initCount()//タイマーリセット
            return
        }else if(step==1) {
            console.log('display title')
            playSoundTitle()
            getQuestionById(id)
            .then(question => {
                console.log('question data!!:', question)
                setQuestion(question)
            })
            .catch((error) => {
                console.error('get question error!!:', error)
            })
        }else if(step==2) {
            if(isTimerEnd===false) {
                console.log('display selection')
                //カウント開始
                startCount(10, 0, "down")
            }
        }else if(step==3) {
            console.log('answer check')
        }else if(step==4) {
            console.log('display answer')
        }else if(step==5) {
            console.log('display end')
        }
        console.log('isTimerEnd')
        console.log(isTimerEnd)
        if(isTimerEnd===true) {
            console.log('timerFlag!!!!')
            enableVote(false)
            return
        }
        
    },[step, isTimerEnd])
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
            console.log('Save Data!!:', data)
            
        })
        .catch((error) => {
            console.error('Save Error!!:', error)
        })
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
            console.log('Update Data!!:', data)
            
        })
        .catch((error) => {
            console.error('Update Error!!:', error)
        })

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
        })
        const question = await res.json()
        return question.shift()
    }

    return (
        <QuizTemplate>
            <QuizHeader step={step} question={question.question}/>
            <QuizMain step={step} data={question} count={count} voteResult={voteResult} />
        </QuizTemplate>
    )
}

export default Home
