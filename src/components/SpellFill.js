import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './spellFill.css';

export default function SpellFill(){
    const location = useLocation();
    let temp = location.state.quiz;
    const [words, setWords] = useState(temp);
    const [sucess, setSucess] = useState(0);
    const [fail, setFail] = useState(0);
    const [over, setOver] = useState(words.length - 4);
    const [answerNum, setAnswerNum] = useState(0);
    const locationLimit = Number(location.state.limit);
    const answers = location.state.answers;

    const useInterval = (callback, delay) => {
        const savedCallback = useRef(); 

        useEffect(() => {
            savedCallback.current = callback; 
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current(); 
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id); 
            }
        }, [delay]);
    }
    const [limit, setLimit] = useState(0);
    useInterval(()=>{
        setLimit(limit + 1);
    }, limit < (locationLimit * (words.length - 4)) ? 1000 : null);
    return (
        <div>
            {limit + 1}
        </div>
    )
}