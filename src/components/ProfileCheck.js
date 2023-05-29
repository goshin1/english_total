import './profileCheck.css';
import axios from 'axios';
import Sun from '../imgs/Sun.png'
import Moon from '../imgs/Moon.png'
import { useLocation, useNavigate } from "react-router-dom"
import { useState, useRef } from "react";

export default function ProfileCheck(){
    const location = useLocation();
    const navigate = useNavigate();
    const [thema, setThema] = useState(location.state.thema);
    const pswRef = useRef();

    if(thema){
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#202020';
    } else {
        document.body.style.backgroundColor = '#202020';
        document.body.style.color = '#ffffff';
    }

    const passwordCheck = () => {
        console.log(pswRef.current.value)
        axios.post(`${process.env.REACT_APP_ROUTER_HOST}passwordCheck`, {
            data : {
                id : location.state.id,
                psw : pswRef.current.value
            }
        }).then((res) => {
            if(res.data === 'sucess'){
                navigate('/profile', {
                    state : {id : location.state.id, thema : thema}
                })
            }else{
                alert('비밀번호가 다릅니다.')
            }
            return
        })

    }


    return <div>
        <header id='setHeader'>
            본인확인
        </header>
        <div id="profileCheckDiv">
            <p>비밀번호를 입력해주세요.</p>
            <p>
                <input type="password" placeholder="Password"
                    style={thema ? {color : '#202020'} : {color : '#ffffff'}}
                    ref={pswRef}/>
                <input type="button" value='Check'
                    style={thema ? {color : '#202020'} : {color : '#ffffff'}} 
                    onClick={(event) => {
                        passwordCheck();
                }}/>
            </p>
        </div>
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