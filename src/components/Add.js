import './add.css';
import { useState, useRef } from 'react';
import SearchModal from './SearchModal';
// list에서 파일정보를 가져와 단어를 추가하기

export default function Add(){

    const [modal, setModal] = useState(false);
    const wordRef = useRef(null);
    

    return <div id='addDiv'>
        
        <p>
            <input type='text' name='searchWord' placeholder='word' ref={ wordRef } />
            <button id='wSearch' onClick={() => {
                window.open(`https://en.dict.naver.com/#/search?range=all&query=${wordRef.current.value}`);
            }}></button>
        </p>
        <p>
            <input type='text' name='mean' placeholder='mean' />
            <button id='wAdd' onClick={ () => {
                
            } }>추가</button>    
        </p>
        
    </div>
}
