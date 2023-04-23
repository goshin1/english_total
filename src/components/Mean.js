import './mean.css';
import { useLocation } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import uuid from 'react-uuid';
export default function Mean(){
    const location = useLocation();
    let temp = location.state.quiz;
    const [words, setWords] = useState(temp);
    const [sucess, setSucess] = useState(0);
    const [fail, setFail] = useState(0);
    const over = location.state.count;
    const [answerNum, setAnswerNum] = useState(0);
    const locationLimit = Number(location.state.limit);
    
    const answers = location.state.answers;
    let blocks = [];
    for(let i = 0; i < words.length; i++){
        blocks.push(
            <div className="card" key={uuid()}>
                <div className="word">{words[i].mean}</div>
                <div className="answers">
                    <input type="button" value={answers[answerNum][0]} className="answerBtn" onClick={(event)=>{
                        if(words[i].word === answers[answerNum][0]){
                            setSucess(sucess + 1);
                        }else{
                            setFail(fail+ 1);
                        }
                        setWords(words.filter(word => word.num !== words[i].num));
                        setAnswerNum(answerNum + 1);
                    }}/>
                    <input type="button" value={answers[answerNum][1]} className="answerBtn" onClick={(event)=>{
                        if(words[i].word === answers[answerNum][1]){
                            setSucess(sucess + 1);
                        }else{
                            setFail(fail+ 1);
                        }
                        setWords(words.filter(word => word.num !== words[i].num));
                        setAnswerNum(answerNum + 1);
                    }}/><br/>
                    <input type="button" value={answers[answerNum][2]} className="answerBtn" onClick={(event)=>{
                        if(words[i].word === answers[answerNum][2]){
                            setSucess(sucess + 1);
                        }else{
                            setFail(fail+ 1);
                        }
                        setWords(words.filter(word => word.num !== words[i].num));
                        setAnswerNum(answerNum + 1);
                    }}/>
                    <input type="button" value={answers[answerNum][3]} className="answerBtn" onClick={(event)=>{
                        if(words[i].word === answers[answerNum][3]){
                            setSucess(sucess + 1);
                        }else{
                            setFail(fail+ 1);
                        }
                        setWords(words.filter(word => word.num !== words[i].num));
                        setAnswerNum(answerNum + 1);
                    }}/>
                </div>
            </div>
        )
    }
    
    const useInterval = (callback, delay) => {
        const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

        useEffect(() => {
            savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
            }
            if (delay !== null) { // 만약 delay가 null이 아니라면 
                let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
                return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
            }
        }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
    }
    const [limit, setLimit] = useState(0);
    useInterval(()=>{
        setLimit(limit + 1);
    }, limit < (locationLimit * (location.state.count)) ? 1000 : null);


    if(over <= sucess + fail){
        blocks = [
            <div key={'end'} className='card'>
                <p className='ment'>모든 문제를 풀었습니다.</p>
            </div>
        ]; 
    }

    if(limit >= locationLimit * (location.state.count) && over > sucess + fail){
        
        blocks = [
            <div key={'fail'} className='card'>
                <p className='ment'>제한시간 안에 풀지 못했습니다.</p>
            </div>
        ]
    }
    
    return <div id='spellDiv'>
        <header id='setHeader'>
            단어 맞추기
        </header>
        <div id='cardChange'>
            {blocks}
        </div>
        {limit >= locationLimit * (location.state.count) ? '' : limit}
        <div id='timeBar'>
            <div id='timeProcess' style={{'marginLeft' : (-300 + ((300 / (locationLimit * (location.state.count))) * limit)) + "px"}}></div>
        </div>
        <div id='quizStatus'>
            문제 갯수 { over } 정답 {sucess} / 오답 {fail}
        </div>
    </div>
};