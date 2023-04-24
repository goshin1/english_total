import './interval.css';
import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Interval(){
    const test = [
        {num : 1, word : 'distribute', mean : '분배하다'},
        {num : 2, word : 'generous', mean : '너그러운'},
        {num : 3, word : 'farmar', mean : '농부'},
        {num : 4, word : 'consultant', mean : '자문위원'},
        {num : 5, word : 'furniture', mean : '가구'},
    ];
    const [words, setWords] = useState(test);

    const location = useLocation();

    //https://mingule.tistory.com/65
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
    }, time < location.state.limit ? 1000 : null);
    if(time === location.state.limit){
        console.log(words.length)
        if(words.length > 0){
            setWords(words.filter(word => word.num !== words[0].num));
            setTime(0);
        } else {
            setTime('끝났습니다.');
        }
    }
    return <div>
        <header id='setHeader'>
            시간 제한
        </header>
        <div className='intervalBlock'>
            <div className='intervalWord'>
                {words.length > 0 ? words[0].word : ''}
            </div>
            <div className='intervalSwitch'>
                {time}
            </div>
        </div>
    </div>
}