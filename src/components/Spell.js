import './spell.css';
import { useLocation } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import uuid from 'react-uuid';
export default function Spell(){
    const location = useLocation();
    let temp = location.state.quiz;
    const [words, setWords] = useState(temp);
    const [sucess, setSucess] = useState(0);
    const [fail, setFail] = useState(0);
    const [wrong, setWrong] = useState([]);
    const over = location.state.count;
    const locationLimit = Number(location.state.limit);
    const [answers, setAnswers] = useState(location.state.answers);
    console.log(answers);
    let blocks = [];
    if(words.length > 0){
        blocks = [
            <div className="card" key={uuid()}>
                    <div className="word">{words[0].word}</div>
                    <div className="answers">
                        <input type="button" value={answers[0][0]} className="answerBtn" onClick={(event)=>{
                            if(words[0].mean === answers[0][0]){
                                setSucess(sucess + 1);
                            }else{
                                setFail(fail+ 1);
                                setWrong([...wrong, words[0]]);
                            }
                            setTime(0);
                            setWords(words.filter(word => word.num !== words[0].num));
                            answers.shift();
                            setAnswers(answers);
                        }}/>
                        <input type="button" value={answers[0][1]} className="answerBtn" onClick={(event)=>{
                            if(words[0].mean === answers[0][1]){
                                setSucess(sucess + 1);
                            }else{
                                setFail(fail+ 1);
                                setWrong([...wrong, words[0]]);
                            }
                            setTime(0);
                            setWords(words.filter(word => word.num !== words[0].num));
                            answers.shift();
                            setAnswers(answers);
                        }}/><br/>
                        <input type="button" value={answers[0][2]} className="answerBtn" onClick={(event)=>{
                            if(words[0].mean === answers[0][2]){
                                setSucess(sucess + 1);
                            }else{
                                setFail(fail+ 1);
                                setWrong([...wrong, words[0]]);
                            }
                            setTime(0);
                            setWords(words.filter(word => word.num !== words[0].num));
                            answers.shift();
                            setAnswers(answers);
                        }}/>
                        <input type="button" value={answers[0][3]} className="answerBtn" onClick={(event)=>{
                            if(words[0].mean === answers[0][3]){
                                setSucess(sucess + 1);
                            }else{
                                setFail(fail+ 1);
                                setWrong([...wrong, words[0]]);
                            }
                            setTime(0);
                            setWords(words.filter(word => word.num !== words[0].num));
                            answers.shift();
                            setAnswers(answers);
                        }}/>
                    </div>
                </div>
        ];
    }
    

    //https://mingule.tistory.com/65
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
    const [time, setTime] = useState(0);
    const [count, setCount] = useState(0);
    useInterval(()=>{
        setTime(time + 1);
    }, words.length > 0 ? 1000 : null);

    if(time === location.state.limit + 1){
        if(words.length >= 0){
            setWords(words.filter(word => word.num !== words[0].num));
            answers.shift();
                            setAnswers(answers);
            setTime(0);
            setFail(fail + 1);
            setCount(count + 1);
        } else {
            setTime('끝났습니다.');
        }
    }

    if(words.length <= 0){
        let wrongBlock = [];
        for(let i = 0; i < wrong.length; i++){
            wrongBlock.push(
                <div className='wrong' key={uuid()}>
                    <span> { wrong[i].word } </span>
                    <span> { wrong[i].mean } </span>
                </div>
            )
        }

        blocks = [
            <div key={'end'} className='card'>
                <p className='ment'>모든 문제를 풀었습니다.</p>
                <div id='wrongBox'>
                    {wrongBlock}
                </div>
            </div>
        ]; 
    }
    
    return <div id='spellDiv'>
        <header id='setHeader'>
            단어 맞추기
        </header>
        <div id='cardChange'>
            {blocks}
        </div>
        {time >= locationLimit * (location.state.count) ? '' : time}
        <div id='timeBar'>
            <div id='timeProcess' style={{'marginLeft' : (-300 + ((300 / locationLimit) * time)) + "px"}}></div>
        </div>
        <div id='quizStatus'>
            문제 갯수 { over } 정답 {sucess} / 오답 {fail}
        </div>
    </div>
};