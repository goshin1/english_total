import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWords } from "../noteSlice";
import axios from "axios";
import './edit.css';
import './list.css';

export default function Edit(){
    const location = useLocation();
    const [deletes, setDeletes] = useState([]);
    axios.post('http://localhost:5000/load', {
        data : {
            id : location.state.id
        }
    })
    .then((res) => {
        dispatch(setWords(res.data));
    });
    const words = useSelector(state => { return state.note.words });
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    
    
    const englishBlocks = [];
    for(let i = 0; i < words.length; i++){
        if(words[i].word.includes(search)){
            
            englishBlocks.push(
                <div className='englishBlock' data-position={words[i].num} key={words[i].num}>
                    <div className='englishCheck' style={ deletes.includes(words[i].num) ? {"backgroundImage" : "url('../imgs/checkIconOn.png')"} : {"backgroundImage" : "url('../imgs/checkIcon.png')"} } onClick={(event) => {
                        console.log(deletes.includes(words[i].num));
                        console.log(deletes);
                        if(deletes.includes(words[i].num)){

                        } else {
                            setDeletes([...deletes + words[i].num]);
                        }
                    }}>
                        
                    </div>
                    <span className='english'>
                        
                        <div className='overBlock' onMouseOver={event=>{
                            if(event.currentTarget.innerHTML.length > 40){
                                event.currentTarget.style.marginLeft = "-"+event.currentTarget.innerHTML.length * 3 + "px";
                            }
                        }} onMouseOut={event=>{
                            event.currentTarget.style.marginLeft = "0px";
                        }}>
                            <input type="text" defaultValue={ words[i].word }/>
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
                                if(event.currentTarget.innerHTML.length > 40){
                                    event.currentTarget.style.marginLeft = "-"+event.currentTarget.innerHTML.length * 6 + "px";
                                }
                            }} onMouseOut={event=>{
                                event.currentTarget.style.marginLeft = "0px";
                            }}>
                                <input type="text" defaultValue={ words[i].mean }/>
                        </div>
                    </span>
                    
                </div>
            );
        }
    }

    return <div>
        <header id='listHeader'>
            총단어 { words.length }
            <input type="text" name='search' id='search' onChange={event => {
                setSearch(event.target.value);
            }} />
        </header>
        {englishBlocks}
    </div>
}