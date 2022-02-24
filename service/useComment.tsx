import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import _ from "lodash"


// 各チャットルームのメッセージ保持、メッセージブロードキャスト
const useComment = () => {
    const [timeStart, setTimeStart] = useState(10);

    const run = (comment: string) => {
      createDom(comment)
      .then(setStyle)
      .then(deleteDom)
      .catch((err) => {
        console.log(err);
      });

    }

    const createDom = (comment:string) => {
      return new Promise((resolve, reject) => {
        var idName     = 'comment' + Math.random().toString(36).slice(-8);
        var commentElm =
          `<div id="${idName}" class="quiz_comment" style="display: none">${_.escape(comment)}</div>`;
        $('body').append(commentElm);
        var dom = $(`#${idName}`);
        resolve(dom);
      })
    }

    const setStyle = (dom: any) => {
      return new Promise((resolve, reject) => {
        var top = Math.floor(Math.random() * 100 % 96 + 1);
        dom.css({
          'font-size': '30px',
          display: 'block',
          position: 'fixed',
          left: '100%',
          top: top.toString() + '%',
          'transition-duration': '12s',
          'z-index': '0',
          'white-space': 'nowrap'
        });
        setTimeout(function() {
          dom.css({
            transform: 'translate(-3000px, 0)',
          });
        }, 100);
        resolve(dom);
      });
    }

    const deleteDom = (dom: any) => {
      return new Promise((resolve , reject) => {
        setTimeout(() => {
          dom.remove();
          resolve(null);
        }, 12000);
      });
    }

    

    return { run };
};

export default useComment;