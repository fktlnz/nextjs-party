import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const DISPLAY_TITLE_EVENT = "displayTitleEvent"; // Name of the event
const DISPLAY_SELECTION_EVENT = "displaySelectionEvent"; // Name of the event
const DISPLAY_ANSWER_CHECK_EVENT = "displayAnswerCheckEvent"; // Name of the event
const DISPLAY_ANSWER_EVENT = "displayAnswerEvent"; // Name of the event
const DISPLAY_END = 'displayEnd'; 
const SOCKET_SERVER_URL = "http://localhost:3000";


// 各チャットルームのメッセージ保持、メッセージブロードキャスト
const useSocket = () => {
  const [step, setStep] = useState(0); // Sent and received messages
  const [id, setId] = useState(-1);
  const [voteResult, setVoteResult] = useState([0, 0, 0, 0])
  const [isStartVote, setIsStartVote] = useState(false)
  const socketRef = useRef();

  useEffect(() => {

    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // Listens for incoming messages
    socketRef.current.on("displayTitleEvent", (data) => {
      console.log('data!!')
      console.log(data)
      console.log('setStep:1!!');
      setId(() => data.id);
      setStep(() => 1);
    });
    // Listens for incoming messages
    socketRef.current.on(DISPLAY_SELECTION_EVENT, (data) => {
      console.log('setStep:2!!');
      setStep(2);
    });
    // Listens for incoming messages
    socketRef.current.on(DISPLAY_ANSWER_CHECK_EVENT, (data) => {
      console.log('setStep:3!!');
      setStep(3);
    });
    // Listens for incoming messages
    socketRef.current.on(DISPLAY_ANSWER_EVENT, (data) => {
      setStep(4);
    });
    // Listens for incoming messages
    socketRef.current.on(DISPLAY_END, (data) => {
      setStep(0);
    });
    // Listens for incoming messages
    socketRef.current.on("status", (message) => {
      console.log('status');
      console.log(message)
    });

    // Accept Vote
    socketRef.current.on("startVote", (data) => {
      setIsStartVote(true);
    });

    // Vote Count Up
    socketRef.current.on("voteQuiz", (data) => {
      console.log('VoteQuiz:')
      console.log(data.index)
      setVoteResult((beforeVoteResult) => 
        beforeVoteResult.map((number, index) => (index==data.index-1) ? number+1 :number)
      )
      console.log(voteResult)

    });

    // Reset Vote
    socketRef.current.on("resetVote", () => {
      setVoteResult([0, 0, 0, 0]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [step]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendStep = (id, step) => {
    console.log('sendStep!');
    let eventName;
    if(step==DISPLAY_TITLE_EVENT) {eventName=DISPLAY_TITLE_EVENT}
    else if(step==DISPLAY_SELECTION_EVENT){eventName=DISPLAY_SELECTION_EVENT}
    else if(step==DISPLAY_ANSWER_CHECK_EVENT){eventName=DISPLAY_ANSWER_CHECK_EVENT}
    else if(step==DISPLAY_ANSWER_EVENT){eventName=DISPLAY_ANSWER_EVENT}
    else if(step==DISPLAY_END){eventName=DISPLAY_END}

    console.log('step:'+step)
    console.log('event:'+eventName)
    socketRef.current.emit(eventName, {
      id: id,
      step: step,
      senderId: socketRef.current.id,
    });
  };

  //Vote
  const countUpVote = (index) => {
    console.log('countUp!!:'+index);
    console.log('type(index)!!:'+ typeof(index));
    console.log('voteResult:'+voteResult)
    socketRef.current.emit('voteQuiz',{
      index:index,
      senderId: socketRef.current.id
    });
  }

  //Reset Vote
  const resetVote = (index) => {
    console.log('resetVote')
    socketRef.current.emit('resetVote');
  }

  return { id, step, voteResult, sendStep, countUpVote, resetVote };
};

export default useSocket;