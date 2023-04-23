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
    const [mean, setMean] = useState(words.length > 0 ? words[0].mean : '');
    
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
                        setSelWord(selWord.replace('_', event.currentTarget.value));
                        if(select === (words[0].word.length > 4 ? 4 : words[0].word.length)){
                            setSelWord(answers[answers.length > 1 ? 1 : 0].word);
                            setMean(words[answers.length > 1 ? 1 : 0].mean);
                            setAnswers(answers.filter(ans => ans.ans !== answers[0].ans));
                            setWords(words.filter(word => word.word !== words[0].word));
                            setSelect(0);
                            setTypo(0);
                        }
                    }else{
                        setTypo(typo + 1);
                        if(typo > 3){
                            console.log('pass');
                            setSelWord(answers[answers.length > 1 ? 1 : 0].word);
                            setMean(words[answers.length > 1 ? 1 : 0].mean);
                            setAnswers(answers.filter(ans => ans.ans !== answers[0].ans));
                            setWords(words.filter(word => word.word !== words[0].word));
                            console.log(answers);
                            console.log(words);
                            setFail(fail + 1);
                            setSelect(0);
                            setTypo(0);
                        }
                    }
                }}/>
            )
        }

        blocks = [
            <div className="card" key={uuid()}>
                    <div className="spell">
                        <p>{ selWord }</p>
                        <p>{ mean }</p>
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

    const [limit, setLimit] = useState(0);
    useInterval(()=>{
        setLimit(limit + 1);
    }, limit < (locationLimit * location.state.count) ? 1000 : null);

    if(limit >= locationLimit * location.state.count && answers.length !== 0){
        
        blocks = [
            <div key={'fail'} className='card'>
                <p className='ment'>제한시간 안에 풀지 못했습니다.</p>
            </div>
        ]
    }

    if(answers.length === 0){
        blocks = [
            <div key={'end'} className='card'>
                <p className='ment'>모든 문제를 풀었습니다.</p>
                정답 : { over - fail } 오답 : { fail }
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
                <div id='timeProcess' style={{'marginLeft' : (-300 + ((300 / (locationLimit * location.state.count)) * limit)) + "px"}}></div>
            </div>
            <div id='quizStatus'>
                문제 갯수 { over } 오타 { typo }
            </div>
        </div>
    )
}