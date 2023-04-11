import './playSet.css';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

export default function PlaySet(){

    const location = useLocation();
    const wordRef = useRef();

    return <div id='playDiv'>
        <header id='setHeader'>
            단어 학습 설정
        </header>
        <label>
            <span>문제 개수</span>
            <input type='number' ref={wordRef} onChange={(event) => {
                if(event.currentTarget.value > location.state.leng){
                    event.currentTarget.value = location.state.leng;
                }
            }} />
        </label>
        <label>
            <span>제한 시간</span>
            <label className='radioLabel'><input type='radio' name='limit' value='3'/>3초</label>
            <label className='radioLabel'><input type='radio' name='limit' value='5'/>5초</label>
            <label className='radioLabel'><input type='radio' name='limit' value='10'/>10초</label>
        </label>

        <Link className='playSite'>스펠링 채우기</Link>
        <Link className='playSite'>단어 맞추기</Link>
        <Link className='playSite'>영어단어 맞추기</Link>
    </div>
}