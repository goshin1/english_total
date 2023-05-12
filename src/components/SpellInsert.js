import './spellInsert.css'
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
//<p className='ment'>정답 { over - fail } 오답 { fail }</p>
export default function SpellInsert(){
    const location = useLocation();
    const [words, setWords] = useState(location.state.quiz);
    const [ment, setMent] = useState('');
    const [wrong, setWrong] = useState([]);
    const over = Number(location.state.count);
    const locationLimit = Number(location.state.limit);
    let voices = [];
    const setVoliceList = () => {
        voices = window.speechSynthesis.getVoices();
    }
    setVoliceList();
    if (window.speechSynthesis.onvoiceschanged !== undefined){
        window.speechSynthesis.onvoiceschanged = setVoliceList;
    }

    const speech = (txt) => {
        if(!window.speechSynthesis){
            alert('음성 재생을 지원하지 않는 브라우저입니다.')
            return;
        }

        let lang = 'en-US';
        let utterThis = new SpeechSynthesisUtterance(txt);
        utterThis.onend = (event) => {
        }
        utterThis.onerror = (event) => {
        }

        let voiceFound = false;
        for(let i = 0; i < voices.length; i++){
            if(voices[i].lang.indexOf(lang) >= 0 || voices[i].lang.indexOf(lang.replace('-','_')) >= 0){
                utterThis.voice = voices[i];
                voiceFound = true;
            }
        }

        if(!voiceFound){
            alert('voice not found');
            return;
        }

        utterThis.lang = lang;
        utterThis.pitch = 1;
        utterThis.rate = 1; 
        window.speechSynthesis.speak(utterThis);
    }

    

    let blocks = [];
    if(words.length > 0){
        blocks = [
            <div className="card" key={'card'}>
                <div className="spellHint">
                    <button className='speakerHint' onClick={() => {
                            speech(words[0].word);
                        }}></button>
                    <p className='insertHint'>{ words[0].mean }</p>
                </div>
                <div className="answersInsert">
                    <input type='text' className='insertMent' value={ment} onChange={(event) => {
                        setMent(event.target.value);
                        event.target.value = '';
                    }}/>
                    <p className='inserts'>
                        <input type='button' className='insertBtn' value='a' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='b' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='c' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='d' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='e' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                    </p>
                    <p className='inserts'>
                        <input type='button' className='insertBtn' value='f' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='g' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='h' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='i' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='j' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                    </p>
                    <p className='inserts'>
                        <input type='button' className='insertBtn' value='k' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='l' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='m' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='n' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='o' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                    </p>
                    <p className='inserts'>
                        <input type='button' className='insertBtn' value='p' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='q' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='r' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='s' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='t' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                    </p>
                    <p className='inserts'>
                        <input type='button' className='insertBtn' value='u' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>  
                        <input type='button' className='insertBtn' value='v' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='w' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='x' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='y' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                    </p>
                    <p className='inserts'>
                        <input type='button' className='insertBtn' value='z' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value=' ' onClick={(event)=>{
                            setMent(ment + event.currentTarget.value);
                        }}/>
                        <input type='button' className='insertBtn' value='◀' onClick={(event)=>{
                            setMent(ment.slice(0, ment.length - 1));
                        }}/>
                        <input type='button' id='submitBtn' value='제출' onClick={()=>{
                            if(words[0].word !== ment){
                                setWrong([...wrong, words[0]]);
                            }
                            setWords(words.filter(word=>word.num !== words[0].num));
                        }}/>
                    </p>
                </div>
            </div>
        ]
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

    const [time, setTime] = useState(0);
    useInterval(()=>{
        setTime(time + 1);
    }, words.length > 0 ? 1000 : null);

    if(time >= locationLimit + 1){
        setMent('')
        setTime(0);
        setWrong([...wrong, words[0]]);
        setWords(words.filter(word=>word.num !== words[0].num));
    }


    if(words.length <= 0){
        let wrongBlock = [];
        let wrongLeng = wrong.length;
        for(let i = 0; i < wrongLeng; i++){
            wrongBlock.push(
                <div className='wrong' key={'wrong'}>
                    <span> { wrong[i].word } </span>
                    <span> { wrong[i].mean } </span>
                </div>
            )
        }

        blocks = [
            <div key={'end'} className='card'>
                <p className='ment'>정답 { over - wrongLeng } 오답 { wrongLeng }</p>
                <div id='wrongBox'>
                    {wrongBlock}
                </div>
            </div>
        ]; 
    }

    return <div id='spellInsertDiv'>
        <header id='setHeader'>
            영어 맞추기
        </header>
        <div id='insertChange'>
            {blocks}
            <div id='insertBar'>
                <div id='timeProcess' style={{'marginLeft' : (-300 + ((300 / locationLimit) * time)) + "px"}}></div>
            </div>
        </div>
    </div>
}