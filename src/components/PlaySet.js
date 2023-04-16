import './playSet.css';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PlaySet(){
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const wordRef = useRef();
    const [limit, setLimit] = useState(3);
    const [words, setWords] = useState([]);

    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_ROUTER_HOST}load`, {
            data : {
                id : location.state.id
            }
        })
        .then((res) => {
            setWords(res.data)
        });
    },[]);


    const randomMean = (mean) => {
        let means = [mean];
        let leng = words.length; 
        
        while(means.length < 4){
            let random = Math.floor(Math.random() * leng);
            if(!means.includes(words[random].mean)){
                means.push(words[random].mean);
            }
        }
        let temp = means[0];
        let rad = Math.floor(Math.random() * means.length);
        means[0] = means[rad];
        means[rad] = temp;
        return means;
    };

    const quizSet = (target) => {
        let temp = [ ...words ];
        let res = [];
        let answers = [];
        let leng = Number(wordRef.current.value) + 4;
        for(let i = 0; i < leng; i++){
            let num = Math.floor(Math.random() * temp.length);
            answers.push(randomMean(temp[num].mean));
            res.push(temp.splice(num, 1)[0]);
        }
        console.log(res);
        console.log(answers);
        navigate(target, {
            state : {
                id : location.state.id,
                count : wordRef.current.value,
                limit : limit,
                quiz : res, 
                answers : answers
            }
        })
    };

    return <div id='playDiv'>
        <header id='setHeader'>
            단어 학습 설정
        </header>
        <label id='quizCount'>
            <span>문제 개수</span>
            <input type='number' ref={wordRef} defaultValue='1' onChange={(event) => {
                if(event.currentTarget.value > location.state.leng){
                    event.currentTarget.value = location.state.leng;
                }
                if(event.currentTarget.value < 1){
                    event.currentTarget.value = 1;
                }
            }} />
        </label>
        <label id='quizLimit'>
            <span>제한 시간</span>
            <label className='radioLabel'><input type='radio' name='limit' value='3' defaultChecked onChange={()=>{setLimit(3)}}/>3초</label>
            <label className='radioLabel'><input type='radio' name='limit' value='5' onChange={()=>{setLimit(5)}}/>5초</label>
            <label className='radioLabel'><input type='radio' name='limit' value='10' onChange={()=>{setLimit(10)}}/>10초</label>
        </label>

        <div id='links'>
            <div className='playSite' onClick={()=>{quizSet('/spellFill')}}>스펠링 채우기</div>
            <div className='playSite' onClick={()=>{quizSet('/spell')}}>단어 맞추기</div>
            <div className='playSite' onClick={()=>{quizSet('/')}}>영어단어 맞추기</div>
        </div>
    </div>
}