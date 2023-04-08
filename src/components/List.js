import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWords } from '../noteSlice';
import axios from "axios";
import './list.css';

// 예시에서는 useState를 통해 드래그 드롭 할 때 마다 변경해주지만 여기서는
// load를 통해 불러온 배열을 useSelector로 불러들이기 때문에 
// useDispatch나 다른 것을 통해 수정 하고 불러와야 된다.
// 이를 수정할 것

export default function List(){
    const words = useSelector(state=>{ return state.note.words });
    const speedRef = useRef();
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();



    // https://moong-bee.com/posts/react-drag-and-drop-list-sortable
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
        utterThis.rate = speedRef.current.value; 
        window.speechSynthesis.speak(utterThis);
    }

    const englishBlocks = [];
    if(words.length > 0){
        
        for(let i = 0; i < words.length; i++){
            if(words[i].word.includes(search)){
                
                englishBlocks.push(
                    <div className='englishBlock' data-position={words[i].num} key={words[i].num}>
                        <button className='speaker' onClick={() => {
                            speech(words[i].word);
                        }}></button>
                        <span className='english'>
                            <div className='overBlock' onMouseOver={event=>{
                                if(event.currentTarget.innerHTML.length * 5 > 40){
                                    event.currentTarget.style.marginLeft = "-"+event.currentTarget.innerHTML.length * 6 + "px";
                                }
                            }} onMouseOut={event=>{
                                event.currentTarget.style.marginLeft = "0px";
                            }}>
                                { words[i].word }
                            </div>
                        </span>
                        <button className='delete' onClick={async () => {
                            await axios.post('http://localhost:5000/delete', {
                                data : {
                                    id : location.state.id,
                                    num : words[i].num
                                }
                            });

                            await axios.post('http://localhost:5000/load', {
                                data : {
                                    id : location.state.id
                                }
                            })
                            .then((res) => {
                                dispatch(setWords(res.data));
                            });
                        }}></button>
                        <span className='hangul'>
                            <div className='overBlock' onMouseOver={event=>{
                                    if(event.currentTarget.innerHTML.length * 5 > 40){
                                        event.currentTarget.style.marginLeft = "-"+event.currentTarget.innerHTML.length * 6 + "px";
                                    }
                                }} onMouseOut={event=>{
                                    event.currentTarget.style.marginLeft = "0px";
                                }}>
                                    { words[i].mean }
                            </div>
                        </span>
                        
                    </div>
                );
            }
        }
    }
    

    return <div id='listDiv'>
        { englishBlocks }
        <div id='listRemocon'>
            <header id='listHeader'>
                총단어 { words.length }
                <input type="text" name='search' id='search' onChange={event => {
                    setSearch(event.target.value);
                }} />
            </header>
            <nav id='listNav'>
                <Link to='/' className='linkBtn' onClick={(event) => {
                    event.preventDefault();
                    navigate('/addPage', {
                        state : {
                            id : location.state.id
                        }
                    });
                }}>단어 <span>추가</span></Link>

                <Link to="" className='linkBtn'>단어 <span>학습</span></Link>
                
                <Link to="/edit" className='linkBtn' state={{id : location.state.id}} >단어 <span>편집</span></Link>
                
                <label className='linkBtn'>불러오기<button type='file' onClick={async event => {
                    await axios.post('http://localhost:5000/load', {
                        data : {
                            id : location.state.id
                        }
                    })
                    .then((res) => {
                        dispatch(setWords(res.data));
                    });
                }}/></label>
                <br/>
                <label id='speedLabel'><span>소리 속도</span><input id='speedBar' type='range' min='0' max='1' step='0.1' ref={ speedRef } /></label>
            </nav>
        </div>
    </div>
}