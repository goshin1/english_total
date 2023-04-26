import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import './spellFill.css';

export default function SpellFill(){
    const location = useLocation();
    const [words, setWords] = useState(location.state.quiz);
    const [fail, setFail] = useState(0);
    const over = location.state.count;
    const [answerNum, setAnswerNum] = useState(0);
    const locationLimit = Number(location.state.limit);
    const [answers, setAnswers] = useState(location.state.answers);
    const [select, setSelect] = useState(0);

    const [selWord, setSelWord] = useState(answers.length > 0 ? answers[0].word : '');
    
    const [typo, setTypo] = useState(0);
    /*
        answers
        - ans : 섞이게 된 스펠링
        - word : 일부가 빠지고 _가 된 문자열

        words
        - word : 정답
    */
    let blocks = [];
    if(answers.length > 0 && words.length > 0){
        let ansBlocks = [];
        for(let i = 0; i < answers[0].ans.length; i++){
            ansBlocks.push(
                <input type='button' key={uuid()} value={answers[0].ans[i]} className='spellBtn' onClick={(event) => {
                    if(event.currentTarget.value === words[0].word[select]){
                        setSelect(select + 1);
                        answers[0].word = answers[0].word.replace('_', event.currentTarget.value);
                        setAnswers(answers);
                        if(select + 1 === (words[0].word.length > 5 ? 5 : words[0].word.length)){
                            
                            setAnswers(answers.filter(ans => ans.num !== answers[0].num));
                            setWords(words.filter(word => word.word !== words[0].word));
                            setSelect(0);
                            setTypo(0);
                            setTime(0);
                        }
                    }else{
                        setTypo(typo + 1);
                        if(typo > 3){
                            setAnswers(answers.filter(ans => ans.num !== answers[0].num));
                            setWords(words.filter(word => word.word !== words[0].word));
                            setFail(fail + 1);
                            setSelect(0);
                            setTypo(0);
                            setTime(0);
                        }
                    }
                }}/>
            )
        }
        // 답안을 선택 시 변경되게 이는 useState를 써서 구현하면 될 듯
        blocks = [
            <div className="card" key={uuid()}>
                    <div className="spell">
                        <p>{ answers[0].word }</p>
                        <p>{ words[0].mean }</p>
                    </div>
                    <div className="answers">
                        {ansBlocks}
                    </div>
            </div>
        ];
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

    const [time, setTime] = useState(0);
    const [count, setCount] = useState(0);
    useInterval(()=>{
        setTime(time + 1);
    }, words.length > 0 ? 1000 : null);

    if(time === location.state.limit + 1){
        if(words.length >= 0){
            setAnswers(answers.filter(ans => ans.num !== answers[0].num));
            setWords(words.filter(word => word.num !== words[0].num));
            setTime(0);
            setFail(fail + 1);
            setCount(count + 1);
        } else {
            setTime('끝났습니다.');
        }
    }

    if(words.length <= 0){
        blocks = [
            <div key={'end'} className='card'>
                <p className='ment'>정답 { over - fail } 오답 { fail }</p>
            </div>
        ]; 
    }


    return (
        <div>
            <header id='setHeader'>
                스펠링 맞추기
            </header>
            <div id='cardChange'>
                {blocks}
            </div>
            <div id='timeBar'>
                <div id='timeProcess' style={{'marginLeft' : (-300 + ((300 / locationLimit) * time)) + "px"}}></div>
            </div>
            <div id='quizStatus'>
                문제 갯수 { over } 남은 문제 { words.length } 오타 { typo } 
            </div>
        </div>
    )
}