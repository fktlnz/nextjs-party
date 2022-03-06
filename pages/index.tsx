/** @jsxImportSource @emotion/react */
import React, {useState, useEffect} from "react"
import type { NextPage } from 'next'
// service
import useSocket from '../service/useSocket'
//component
import { IndexTemplate } from "@/components/template/Template"
import {ButtonGroup} from '@/components/mols/ButtonGroup'
import { SubmitForm } from "@/components/mols/SubmitForm"

const Home:NextPage = () => {

    const {id, step, countUpVote, sendMessage} = useSocket()
    const [questionText, setQuestionText] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        if(step==0){
            setQuestionText("問題発表までおまちください・・")
        }else if(step==1) {
            console.log('display title')
            getQuestionById(id)
            .then(question => {
                console.log('question data!!:', question)
                setQuestionText(question.question)
            })
            .catch((error) => {
                console.error('get question error!!:', error)
            })
        }else if(step==2) {
            console.log('display selection')
        }else if(step==3) {
            console.log('answer check')
        }else if(step==4) {
            console.log('display answer')
        }else if(step==5) {
            console.log('display end')
        }
           
    },[id, step])

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

    const countUp = (index:number) => {
        countUpVote(index)
    }

    const handleSubmitMessage = () => {
        console.log(message)
        sendMessage(message)
        setMessage("")
    }

    const handleChangeMessage = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    return (
        <IndexTemplate text={questionText}>
            <ButtonGroup onClick={countUp} />
            <SubmitForm onChange={(e) => handleChangeMessage(e)} onClick={()=>handleSubmitMessage()} value={message}/>
        </IndexTemplate>
    )

}

export default Home