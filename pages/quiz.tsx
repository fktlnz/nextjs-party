/** @jsxImportSource @emotion/react */
import React, {useState, useEffect} from "react"
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// service
import useSocket from '@/service/useSocket'
import useCount from '@/service/useCount'
// Styles
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
