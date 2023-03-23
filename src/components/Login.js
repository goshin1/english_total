import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import logoExtend from '../imgs/englishnoteLogoExtend.png';
import axios from 'axios';
import "./login.css"

export default function Login(){
    const navigate = useNavigate();
    const idRef = useRef();
    const pwdRef = useRef();

    const login = async (event) => {
        if(idRef.current.value === '' || pwdRef.current.value === ''){
            event.preventDefault();
            alert('아이디, 비밀번호를 입력해주세요.');
            return;
        }
        navigate('/list');
    }


    return <form id='loginForm'>
        <img id='logo' src={logoExtend} alt='logo'/>
        <input type="text" name="id" placeholder='Id' ref={ idRef } />
        <input type="password" name="psw" placeholder='Password' ref={ pwdRef } onMouseDown={(event)=>{
            event.currentTarget.type = "text";
        }} onMouseUp={event=>{
            event.currentTarget.type = "password";
        }}/>
        <Link id='loginBtn' to='/list' onClick={ event => {
            login(event);  
        }}>로그인</Link>
        <Link to='/list' id='offlineBtn'>오프라인</Link>
        <Link to="https://developers.naver.com/products/papago/nmt/nmt.md" id='signBtn'>회원가입</Link>
    </form>
}