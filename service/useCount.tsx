import { useEffect, useRef, useState } from "react"

const UPLIMIT = 10
const DOWNLIMIT = 0
const DIRECTION = "down"

// 各チャットルームのメッセージ保持、メッセージブロードキャスト
const useCount = () => {
    const [timeStart, setTimeStart] = useState(10)
    const [timeEnd, setTimeEnd] = useState(0)
    const [direction, setDirection] = useState("down")
    const [count, setCount] = useState(0)
    const [timerFlag, setTimerFlag] = useState(false)
    const [isTimerEnd, setIsTimerEnd] = useState(false)

    useEffect(() => {
        if (timerFlag) {
            const id = setTimeout(() => {
                setCount((beforecount) => {
                    console.log('timer・・・')
                    if(direction=="up"){
                        if(beforecount<timeEnd){
                            return (beforecount + 1)
                        } else {
                            setTimerFlag(false)
                            setIsTimerEnd(true)
                            return beforecount
                        }
                    }else{
                        if(beforecount>timeEnd){
                            return (beforecount - 1)
                        } else {
                            setTimerFlag(false)
                            setIsTimerEnd(true)
                            return beforecount
                        }

                    }
                })
            }, 1000)
            return () => clearTimeout(id)
        }
        return
    },[count])

    const setStart = (upLimit:number, downLimit:number, direction:string) => {
        const start = (direction=="up") ? downLimit : upLimit
        setCount(start)
        setTimeStart(start)
    }
    const setEnd = (upLimit:number, downLimit:number, direction:string) => {
        const end = (direction=="up") ? upLimit : downLimit
        setTimeEnd(end)
    }

    // Sends a message to the server that
    // forwards it to all users in the same room
    const startCount = (upLimit:number=UPLIMIT, downLimit:number=DOWNLIMIT, direction:string=DIRECTION) => {
        console.log('start count')
        setStart(upLimit, downLimit, direction)
        setEnd(upLimit, downLimit, direction)
        setDirection(direction)
        setTimerFlag(true)
    }

    const initCount = () => {
        console.log('timer init!')
        setIsTimerEnd(false)
    }

    return { count, isTimerEnd , initCount, startCount }
}

export default useCount