import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWords, deleteWord, deleteWordCancel,  updateWord, updateModifyWord } from "../noteSlice";
import check from '../imgs/checkIcon.png';
import checkOn from '../imgs/checkIconOn.png';
import Moon from '../imgs/Moon.png';
import Sun from '../imgs/Sun.png'
import axios from "axios";
import './edit.css';
import './list.css';


export default function Edit(){
    const location = useLocation();
    axios.post(`${process.env.REACT_APP_ROUTER_HOST}load`, {
        data : {
            id : location.state.id,
            text : 'select num, word, mean from wordlist where mid = $1 order by num asc'
        }
    })
    .then((res) => {
        dispatch(setWords(res.data));
    });
    const words = useSelector(state => { return state.note.words });
    const deletes = useSelector(state => { return state.note.deletes });
    const checkUpdate = useSelector(state => { return state.note.updates });
    
    const [search, setSearch] = useState('');
    const [remocon, setRemocon] = useState(false);
    const [all, setAll] = useState(true);
    const [update, setUpdate] = useState([]);
    const [thema, setThema] = useState(location.state.thema);

    const dispatch = useDispatch();
    const englishBlocks = [];
    for(let i = 0; i < words.length; i++){
        if(words[i].word.includes(search)){
            englishBlocks.push(
                <div className='englishBlock' data-position={words[i].num} key={words[i].num}>
                    <div className='englishCheck' onClick={(event) => {
                        if(deletes.includes('' + words[i].num)){
                            dispatch(deleteWordCancel('' + words[i].num));
                        } else {
                            dispatch(deleteWord('' + words[i].num ));
                        }
                        
                    }} style={deletes.includes('' + words[i].num) ? {backgroundImage : `url(${checkOn})`} : {backgroundImage : `url(${check})`}}>
                        
                    </div>
                    <span className='english'>
                        <input type="text" style={ thema ? { color : '#202020' } : { color : '#ffffff' }} defaultValue={ words[i].word }
                            onChange={(event) => {
                                let num = '' + words[i].num;
                                let temp = Object.assign({}, words[i]);
                                temp.word = event.currentTarget.value;

                                if(!update.includes(num)){
                                    setUpdate([ ...update, num]);
                                    dispatch(updateWord(temp));
                                } else {
                                    dispatch(updateModifyWord(temp));
                                }
                            }}/>
                    </span>
                    <button className='delete' onClick={async () => {
                        await axios.post(`${process.env.REACT_APP_ROUTER_HOST}delete`, {
                            data : {
                                id : location.state.id,
                                num : words[i].num
                            }
                        });

                        await axios.post(`${process.env.REACT_APP_ROUTER_HOST}load`, {
                            data : {
                                id : location.state.id
                            }
                        })
                        .then((res) => {
                            dispatch(setWords(res.data));
                        });
                    }}></button>
                    <span className='hangul'>
                        <input type="text" style={ thema ? { color : '#202020' } : { color : '#ffffff' }} defaultValue={ words[i].mean } 
                            onChange={(event) => {
                                let num = '' + words[i].num;
                                let temp = Object.assign({}, words[i]);
                                temp.mean = event.currentTarget.value;
                                if(!update.includes(num)){
                                    setUpdate([ ...update, num]);
                                    dispatch(updateWord(temp));
                                    
                                } else {
                                    dispatch(updateModifyWord(temp));
                                }
                                
                            }}/>
                    </span>
                    
                </div>
            );
        }
    }

    if(thema){
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#202020';
    } else {
        document.body.style.backgroundColor = '#202020';
        document.body.style.color = '#ffffff';
    }

    return <div>
        <header id='listHeader'>
            총단어 { words.length }
            <input type="text" name='search' id='search' onChange={event => {
                setSearch(event.target.value);
            }} onClick={(event) => {
                console.log(event.currentTarget.style.width)
            }}/>
            <div id="editRemocon" onClick={event => {
                if(!remocon){
                    event.currentTarget.style.width = '300px';
                    event.currentTarget.children[0].style.transform = 'rotate(90deg) translate(15px, 15px)';
                    event.currentTarget.children[0].style.opacity = '0';
                    event.currentTarget.children[1].style.transform = 'rotate(90deg) translate(1px, 0px)';
                    event.currentTarget.children[1].style.opacity = '0';
                    event.currentTarget.children[2].style.transform = 'rotate(90deg) translate(-13px, -15px)';
                    event.currentTarget.children[2].style.opacity = '0';

                    event.currentTarget.children[3].style.display = 'block';
                    event.currentTarget.children[4].style.display = 'block';
                    event.currentTarget.children[5].style.display = 'block';
                } else {
                    event.currentTarget.style.width = '50px';
                    event.currentTarget.children[0].style.transform = 'none';
                    event.currentTarget.children[0].style.opacity = '1';
                    event.currentTarget.children[1].style.transform = 'none';
                    event.currentTarget.children[1].style.opacity = '1';
                    event.currentTarget.children[2].style.transform = 'none';
                    event.currentTarget.children[2].style.opacity = '1';

                    event.currentTarget.children[3].style.display = 'none';
                    event.currentTarget.children[4].style.display = 'none';
                    event.currentTarget.children[5].style.display = 'none';
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
                        axios.post(`${process.env.REACT_APP_ROUTER_HOST}deleteWords`, {
                            data : {
                                id : location.state.id,
                                deletes : deletes
                            }
                        })
                    }}/>
                <input id='selectUpBtn' type='button' value='변경'
                    onClick={(event) => {
                        console.log('click')
                        axios.post(`${process.env.REACT_APP_ROUTER_HOST}updateWords`, {
                            data : {
                                id : location.state.id,
                                checkUpdate : checkUpdate
                            }
                        });
                        axios.post(`${process.env.REACT_APP_ROUTER_HOST}load`, {
                            data : {
                                id : location.state.id
                            }
                        })
                        .then((res) => {
                            dispatch(setWords(res.data));
                        });
                }}/>
            </div>
        </header>
        
        {englishBlocks}
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