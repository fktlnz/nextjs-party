import { useEffect, useRef, useState } from "react";

const UPLIMIT = 10;
const DOWNLIMIT = 0;
const DIRECTION = "down";

// 各チャットルームのメッセージ保持、メッセージブロードキャスト
const useCount = () => {
    const [timeStart, setTimeStart] = useState(10);
    const [timeEnd, setTimeEnd] = useState(0);
    const [direction, setDirection] = useState("down")
    const [count, setCount] = useState(0);
    const [timerFlag, setTimerFlag] = useState(false);

    useEffect(() => {
        if (timerFlag) {
            const id = setTimeout(() => {
                console.log('start---')
                console.log(timeStart)
                console.log('end---')
                console.log(timeEnd)
                console.log('count')
                console.log(count)
                setCount((beforecount) => {
                    console.log('timer・・・')
                    if(direction=="up"){
                        if(beforecount<timeEnd){
                            return (beforecount + 1);
                        } else {
                            setTimerFlag(false);
                            return beforecount;
                        }
                    }else{
                        if(beforecount>timeEnd){
                            return (beforecount - 1);
                        } else {
                            setTimerFlag(false);
                            return beforecount;
                        }

                    }
                });
            }, 1000);
            return () => clearTimeout(id);
        }
        return;
    });

    const setStart = (upLimit:number, downLimit:number, direction:string) => {
        const start = (direction=="up") ? downLimit : upLimit;
        setCount(start)
        setTimeStart(start);
    }
    const setEnd = (upLimit:number, downLimit:number, direction:string) => {
        const end = (direction=="up") ? upLimit : downLimit;
        setTimeEnd(end);
    }

    // Sends a message to the server that
    // forwards it to all users in the same room
    const startCount = (upLimit:number=UPLIMIT, downLimit:number=DOWNLIMIT, direction:string=DIRECTION) => {
        console.log('start count');
        setStart(upLimit, downLimit, direction);
        setEnd(upLimit, downLimit, direction);
        setDirection(direction)
        setTimerFlag(true);
        console.log("timeStart");
        console.log(timeStart);
        console.log("timeEnd");
        console.log(timeEnd);
        console.log("direction");
        console.log(direction);
    };

    return { count, startCount };
};

export default useCount;