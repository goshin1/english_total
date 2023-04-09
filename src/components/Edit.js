import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWords, deleteWord, deleteWordCancel } from "../noteSlice";
import check from '../imgs/checkIcon.png';
import checkOn from '../imgs/checkIconOn.png';
import axios from "axios";
import './edit.css';
import './list.css';


export default function Edit(){
    const location = useLocation();
    axios.post('http://localhost:5000/load', {
        data : {
            id : location.state.id
        }
    })
    .then((res) => {
        dispatch(setWords(res.data));
    });
    const words = useSelector(state => { return state.note.words });
    const deletes = useSelector(state => { return state.note.deletes });
    const [search, setSearch] = useState('');
    const [remocon, setRemocon] = useState(false);
    const [all, setAll] = useState(true);
    const dispatch = useDispatch();

    const englishBlocks = [];
    for(let i = 0; i < words.length; i++){
        if(words[i].word.includes(search)){
            englishBlocks.push(
                <div className='englishBlock' data-position={words[i].num} key={words[i].num}>
                    <div className='englishCheck' onClick={(event) => {
                        console.log(deletes);
                        if(deletes.includes('' + words[i].num)){
                            dispatch(deleteWordCancel('' + words[i].num));
                        } else {
                            dispatch(deleteWord('' + words[i].num ));
                        }
                        
                    }} style={deletes.includes('' + words[i].num) ? {backgroundImage : `url(${checkOn})`} : {backgroundImage : `url(${check})`}}>
                        
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
            <div id="editRemocon" onClick={event => {
                if(!remocon){
                    event.currentTarget.style.width = '300px';
                    event.currentTarget.children[0].style.transform = 'rotate(90deg) translate(15px, 15px)';
                    event.currentTarget.children[0].style.opacity = '0';
                    event.currentTarget.children[1].style.transform = 'rotate(90deg) translate(1px, 0px)';
                    event.currentTarget.children[1].style.opacity = '0';
                    event.currentTarget.children[2].style.transform = 'rotate(90deg) translate(-13px, -15px)';
                    event.currentTarget.children[2].style.opacity = '0';


                    event.currentTarget.children[3].style.opacity = '1';
                    event.currentTarget.children[3].style.marginTop = '-40px';

                    event.currentTarget.children[4].style.opacity = '1';
                    event.currentTarget.children[4].style.marginLeft = '100px';
                    event.currentTarget.children[4].style.marginTop = '-40px';

                    event.currentTarget.children[5].style.opacity = '1';
                    event.currentTarget.children[5].style.marginLeft = '200px';
                    event.currentTarget.children[5].style.marginTop = '-40px';
                } else {
                    event.currentTarget.style.width = '50px';
                    event.currentTarget.children[0].style.transform = 'none';
                    event.currentTarget.children[0].style.opacity = '1';
                    event.currentTarget.children[1].style.transform = 'none';
                    event.currentTarget.children[1].style.opacity = '1';
                    event.currentTarget.children[2].style.transform = 'none';
                    event.currentTarget.children[2].style.opacity = '1';

                    event.currentTarget.children[3].style.opacity = '0';
                    event.currentTarget.children[3].style.marginTop = '0px';

                    event.currentTarget.children[4].style.opacity = '0';
                    event.currentTarget.children[4].style.marginLeft = '40px';
                    event.currentTarget.children[4].style.marginTop = '0px';
                    
                    event.currentTarget.children[5].style.opacity = '0';
                    event.currentTarget.children[5].style.marginLeft = '40px';
                    event.currentTarget.children[5].style.marginTop = '0px';
                }
                setRemocon(!remocon);
            }}>
                <div></div>
                <div></div>
                <div></div>
                <input id='selectAllBtn' type='button' value='전체'
                    onClick={(event) => {
                        if(all){
                            for(let i = 0; i < words.length; i++){
                                if(!(deletes.includes('' + words[i].num))){
                                    dispatch(deleteWord('' + words[i].num ));
                                }
                            }
                        } else {
                            for(let i = 0; i < words.length; i++){
                                if(deletes.includes('' + words[i].num)){
                                    dispatch(deleteWordCancel('' + words[i].num));
                                }
                            }
                        }
                        setAll(!all);
                }}/>
                <input id='selectDelBtn' type='button' value='삭제'
                    onClick={(event) => {
                        axios.post('http://localhost:5000/deleteWords', {
                            data : {
                                id : location.state.id,
                                deletes : deletes
                            }
                        })
                    }}/>
                <input id='selectUpBtn' type='button' value='변경'
                    onClick={(event) => {
                }}/>
            </div>
        </header>
        
        {englishBlocks}
        
    </div>
}