import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWords, uploade } from '../noteSlice';
import uuid from "react-uuid";
import axios from "axios";
import './list.css';



export default function List(){
    const words = useSelector(state=>{ return state.note.words });
    const [file, setFile] = useState('');
    const speedRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 파일에서 불러와 저장한 배열을 통해 아래 영어단어블록을 생성


    let voices = [];
    //https://sub0709.tistory.com/86
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
        utterThis.rate = speedRef.current.value; 
        window.speechSynthesis.speak(utterThis);
    }

    const englishBlocks = [];
    if(words.length > 0){
        for(let i = 0; i < words.length; i++){
            englishBlocks.push(
                
                <div className='englishBlock' key={uuid()}>
                    <button className='speaker' onClick={() => {
                        speech(words[i][0]);
                    }}></button>
                    <span className='english'>
                        <div className='overBlock' onMouseOver={event=>{
                            if(event.currentTarget.innerHTML.length * 5 > 40){
                                event.currentTarget.style.marginLeft = "-"+event.currentTarget.innerHTML.length * 5 + "px";
                            }
                        }} onMouseOut={event=>{
                            event.currentTarget.style.marginLeft = "0px";
                        }}>
                            { words[i][0] }
                        </div>
                    </span>
                    <span className='hangul'>
                    <div className='overBlock' onMouseOver={event=>{
                            if(event.currentTarget.innerHTML.length * 5 > 40){
                                event.currentTarget.style.marginLeft = "-"+event.currentTarget.innerHTML.length * 5 + "px";
                            }
                        }} onMouseOut={event=>{
                            event.currentTarget.style.marginLeft = "0px";
                        }}>
                            { words[i][1] }
                        </div>
                    </span>
                </div>

            );
        }
    }

    

    return <div id='listDiv'>
        <header id='listHeader'>
            총단어 { words.length }
            <input type="text" name='search' id='search'/>
        </header>
        <nav id='listNav'>
            <Link to='/add' className='linkBtn'>단어 <span>추가</span></Link>

            <Link to="" className='linkBtn'>단어 <span>학습</span></Link>
            
            <Link to="" className='linkBtn'>단어 <span>편집</span></Link>
            
            <label className='linkBtn'>불러오기<input type='file' accept='.txt' onChange={event => {
                setFile(event.target.files[0]);
                let file = event.target.files[0];
                dispatch(uploade(file));
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    const temp = reader.result.split('\n');
                    const arr = [];
                    for(let i = 0; i < temp.length; i++){
                        arr.push(temp[i].split("|"));
                    }
                    dispatch(setWords(arr));
                })
                reader.readAsText(file);
            }}/></label>
            <br/>
            <label id='speedLabel'><span>소리 속도</span><input id='speedBar' type='range' min='0' max='1' step='0.1' ref={ speedRef } /></label>
        </nav>
        
        { englishBlocks }

    </div>
}