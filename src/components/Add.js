import './add.css';
import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import axios from 'axios';
import Moon from '../imgs/Moon.png';
import Sun from '../imgs/Sun.png'
// list에서 파일정보를 가져와 단어를 추가하기

export default function Add(){
    const wordRef = useRef(null);   
    const meanRef = useRef(null);
    const [saveWords, setSaveWords] = useState([]);
    const [saveText, setSaveText] = useState("");
    const location = useLocation();
    const [thema, setThema] = useState(location.state.thema);
    let temp = [];
    for(let i = 0; i < saveWords.length; i++){
        temp.push(
            <p key={uuid()} className='addBlock'>
                <span>{ saveWords[i][0] }</span>
                <span>{ saveWords[i][1] }</span>
            </p>
        );
    }

    if(thema){
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#202020';
    } else {
        document.body.style.backgroundColor = '#202020';
        document.body.style.color = '#ffffff';
    }
    return <div id='addDiv'>
        
        <p>
            <input type='text' name='searchWord' placeholder='word' ref={ wordRef } style={ thema ? { color : '#202020' } : { color : '#ffffff' }} />
            <button id='wSearch' onClick={() => {
                window.open(`https://en.dict.naver.com/#/search?range=all&query=${wordRef.current.value}`);
            }}></button>
        </p>
        <p>
            <input type='text' name='mean' placeholder='mean' ref={ meanRef } style={ thema ? { color : '#202020' } : { color : '#ffffff' }} />
            <button id='wAdd' onClick={ () => {
                axios.post(`${process.env.REACT_APP_ROUTER_HOST}selectWord`, {
                    data : {
                        id : location.state.id,
                        word : wordRef.current.value
                    }
                }).then(res => {
                    if(res.data !== 'fail'){
                        setSaveWords([...saveWords, [wordRef.current.value, meanRef.current.value]]);
                        setSaveText(saveText+("" + wordRef.current.value + "|" + meanRef.current.value + "\n"));
                        axios.post(`${process.env.REACT_APP_ROUTER_HOST}addWord`, {
                            data : {
                                id : location.state.id,
                                word : wordRef.current.value,
                                mean : meanRef.current.value
                            }
                        }).then(res => {

                        });
                        wordRef.current.value = '';
                        meanRef.current.value = '';
                    } else {
                        alert('이미 추가한 단어입니다. 확인해주세요');
                    }
                })
            } }>추가</button>    
        </p>
        <div id='wordDiv'>
            <p id='addBlockHeader'>
                추가한 단어
            </p>
            {temp}
            
        </div>
        <div id='colorChange' style={thema ? {
                backgroundColor : '#ffffff'
            } : {
                backgroundColor : '#272727'
            }}>
            <div id='colorIcon' style={thema ? {
                    backgroundImage : `url(${Sun})`,
                    marginLeft : '5px'
                } : {
                    backgroundImage : `url(${Moon})`,
                    marginLeft : '75px'
                }} onClick={(event) => {
                    setThema(!thema);
                }}></div>
        </div>
    </div>
}
