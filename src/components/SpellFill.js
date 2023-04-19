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
    const [select, setSelect] = useState(0);
    const [selWord, setSelWord] = useState('');


    let blocks = [];
    for(let i = 0; i < words.length; i++){
        blocks.push(
            <div className="card" key={uuid()}>
                <div className="spell">
                    <p>{answers[i].word }</p>
                    <p>{words[i].mean}</p>
                </div>
                <div className="answers">
                    <input type='button' value={answers[i].ans[0]} className='spellBtn' onClick={(event) => {
                        console.log(event.currentTarget.value === words[i].word[select]);
                        if(event.currentTarget.value === words[i].word[select]){
                            answers[i].word.replace('_', event.currentTarget.value);
                            console.log(answers[i].word)
                            setSelect(select + 1);
                            setAnswer(answers);
                        }else{
                        }
                    }}/>
                    <input type='button' value={answers[i].ans[1]} className='spellBtn' onClick={(event) => {
                        console.log(event.currentTarget.value === words[i].word[select])
                        if(event.currentTarget.value === words[i].word[select]){
                            answers[i].word.replace('_', event.currentTarget.value);
                            console.log(answers[i].word)
                            setSelect(select + 1);
                            setAnswer(answers);
                        }
                    }}/>
                    <input type='button' value={answers[i].ans[2]} className='spellBtn' onClick={(event) => {
                        console.log(event.currentTarget.value === words[i].word[select]);
                        if(event.currentTarget.value === words[i].word[select]){
                            answers[i].word.replace('_', event.currentTarget.value);
                            console.log(answers[i].word)
                            setSelect(select + 1);
                            setAnswer(answers);
                        }
                    }}/>
                    <input type='button' value={answers[i].ans[3]} className='spellBtn' onClick={(event) => {
                        console.log(event.currentTarget.value === words[i].word[select]);
                        if(event.currentTarget.value === words[i].word[select]){
                            answers[i].word.replace('_', event.currentTarget.value);
                            console.log(answers[i].word)
                            setSelect(select + 1);
                            setAnswer(answers);
                        }
                    }}/>
                    <input type='button' value={answers[i].ans[4]} className='spellBtn' onClick={(event) => {
                        console.log(event.currentTarget.value === words[i].word[select]);
                        if(event.currentTarget.value === words[i].word[select]){
                            answers[i].word.replace('_', event.currentTarget.value);
                            console.log(answers[i].word)
                            setSelect(select + 1);
                            setAnswer(answers);
                        }
                    }}/>
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
    // useInterval(()=>{
    //     setLimit(limit + 1);
    // }, limit < (locationLimit * location.state.count) ? 1000 : null);

    // if(limit >= locationLimit * location.state.count && over > sucess + fail){
        
    //     blocks = [
    //         <div key={'fail'} className='card'>
    //             <p className='ment'>제한시간 안에 풀지 못했습니다.</p>
    //         </div>
    //     ]
    // }

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