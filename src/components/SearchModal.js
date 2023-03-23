import './searchModal.css';
import { useRef, useState } from 'react';

export default function SearchModal(){
    const id = useRef();
    const pwd = useRef();
    const word = useRef();
    const [trans, setTrans] = useState('모르는 단어를 검색해주세요.');
    const searchWord = (event) => {
        console.log(event.keyCode)
        // 엔터는 13
    }

    return (
        <div id='background'>
            <form id='searchForm'>
                <input type='text' name='apiId' placeholder='Api Id' ref={ id }/>
                <input type='password' onMouseDown={event =>{
                    event.target.type = 'text';
                }} onMouseUp={event=>{
                    event.target.type = 'password';
                }} name='apiPwd' placeholder='Api Pwd' ref={ pwd } />
                <input type='text' name='trans' placeholder='Word' ref={ word }
                    onKeyDown={event => {
                        searchWord(event);
                    }} />
                <textarea defaultValue={ trans }>
                </textarea> 
            </form>
        </div>
    );
}