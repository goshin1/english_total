import './add.css';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// list에서 파일정보를 가져와 단어를 추가하기

export default function Add(){
    const wordRef = useRef(null);   
    const meanRef = useRef(null);
    const dispatch = useDispatch();
    const [saveWords, setSaveWords] = useState([]);
    const [saveText, setSaveText] = useState("")
    const saveFile = useSelector(state => {return state.note.file});
    
    return <div id='addDiv'>
        
        <p>
            <input type='text' name='searchWord' placeholder='word' ref={ wordRef } />
            <button id='wSearch' onClick={() => {
                window.open(`https://en.dict.naver.com/#/search?range=all&query=${wordRef.current.value}`);
            }}></button>
        </p>
        <p>
            <input type='text' name='mean' placeholder='mean' ref={ meanRef } />
            <button id='wAdd' onClick={ () => {
                setSaveWords([...saveWords, [wordRef.current.value, meanRef.current.value]]);
                setSaveText(saveText+("" + wordRef.current.value + "|" + meanRef.current.value + "\n"));
                console.log(saveWords);
                console.log(saveText);
                axios.post('https://port-0-english-server-3vw25lch3mal1.gksl2.cloudtype.app/addWord', {
                    data : {
                        text : wordRef.current.value + "|" + meanRef.current.value
                    }
                }).then(res => {

                });
            } }>추가</button>    
        </p>
        <div id='wordDiv'>
            <p className='addBlock'>
                <span>1adddddddddddddddddddddddddddddddddddddddddddddd</span>
                <span>더하다dddddd</span>
            </p>
            <p className='addBlock'>
                <span>2adddddddddddddddddddddddddddddddddddddddddddddd</span>
                <span>더하다dddddd</span>
            </p>
        </div>
    </div>
}
