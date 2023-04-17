import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import './spellFill.css';

export default function SpellFill(){
    const location = useLocation();
    let temp = location.state.quiz;
    const [words, setWords] = useState(temp);
    const [sucess, setSucess] = useState(0);
    const [fail, setFail] = useState(0);
    const over = location.state.limit;
    const [answerNum, setAnswerNum] = useState(0);
    const locationLimit = Number(location.state.limit);
    const [answers, setAnswer] = useState(location.state.answers);

    let blocks = [];
    for(let i = 0; i < location.state.count; i++){
        blocks.push(
            <div className="card" key={uuid()}>
                <div className="word">{answers[i].word }</div>
                <div className='word'>{words[i].mean}</div>
                <div className="answers">
                    <input type='button' value={answers[i].ans[0]} />
                    <input type='button' value={answers[i].ans[1]} />
                    <input type='button' value={answers[i].ans[2]} />
                    <input type='button' value={answers[i].ans[3]} />
                    <input type='button' value={answers[i].ans[4]} />
                </div>
            </div>
        )
    }

    const useInterval = (callback, delay) => {
        const savedCallback = useRef(); 

        useEffect(() => {
            savedCallback.current = callback; 
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current(); 
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id); 
            }
        }, [delay]);
    }

    const [limit, setLimit] = useState(0);
    useInterval(()=>{
        setLimit(limit + 1);
    }, limit < (locationLimit * location.state.count) ? 1000 : null);


    if(over <= sucess + fail){
        blocks = [
            <div key={'end'} className='card'>
                <p className='ment'>모든 문제를 풀었습니다.</p>
            </div>
        ]; 
    }


    return (
        <div>
            <header id='setHeader'>
                단어 학습 설정
            </header>
            <div id='cardChange'>
                {blocks}
            </div>
        </div>
    )
}