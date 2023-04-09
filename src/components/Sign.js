import './sign.css';
import logoExtend from '../imgs/englishnoteLogoExtend.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRef, useState } from 'react';

export default function Sign(){
    const idRef = useRef();
    const pwdRef = useRef();
    const pwdCheckRef = useRef();
    const emailRef = useRef();
    const navigate = useNavigate();
    const [dup, setDup] = useState('null');
    const [pwd, setPwd] = useState(true);
    const [pwdCh, setPwdCh] = useState(true);

    return <form id="signForm">
        <img id='logo' src={logoExtend}  alt='logo'/>
        <label id='idLabel'>
            <input type="text" name="id" placeholder='Id' ref={idRef} style={ dup === 'sucess' || dup === 'null' ? {color : '#000000'} : {color : '#ff0000'}  } />
            <input type='button' name='duplic' value='' onClick={() => {
                axios.post(`${process.env.REACT_APP_ROUTER_HOST}duplic`, {
                    data : {
                        id : idRef.current.value
                    }
                }).then((res) => {
                    alert((res.data === 'sucess') ? '사용가능한 아이디입니다.' : '이미 사용중인 아이디입니다.');
                    setDup(res.data);
                })
            }}/>
        </label>
        
        <input type="text" name='email' placeholder='E-mail' ref={emailRef}/>
        <label className='pswLabel'>
            <input type="password" id="psw" name="psw" placeholder='Password' ref={ pwdRef } autoComplete="off"/>
            <input type='button' className='typeBtn' onClick={(event)=>{
                if(pwdCh){
                    document.getElementById('psw').type = "text";
                } else {
                    document.getElementById('psw').type = "password";
                }
                setPwdCh(!pwdCh);
            }}/>
        </label>
        
        <label className='pswLabel'>
            <input type="password" id="pswCh" name="pswCh" placeholder='Password Check' ref={ pwdRef } autoComplete="off"/>
            <input type='button' className='typeBtn' onClick={(event)=>{
                if(pwd){
                    document.getElementById('pswCh').type = "text";
                } else {
                    document.getElementById('pswCh').type = "password";
                }
                setPwd(!pwd);
            }}/>
        </label>
        <button id='sign' onClick={(event) => {
            event.preventDefault();
            if(idRef.current.value === ''){
                alert('아이디를 입력해주세요.');
                idRef.current.focus();
                return;
            }
            if(pwdRef.current.value === ''){
                alert('비밀번호를 입력해주세요.');
                pwdRef.current.focus();
                return;
            }
            if(emailRef.current.value === ''){
                alert('이메일을 입력해주세요.');
                emailRef.current.focus();
                return;
            }
            if(pwdCheckRef.current.value !== pwdRef.current.value){
                alert('비밀번호가 일치하지 않습니다.\n다시 입력해주세요.');
                pwdCheckRef.current.focus();
                return;
            }
            if(dup === 'duplic' || dup === 'null'){
                alert('아이디 중복 확인해주세요.');
                return;
            }

            axios.post(`${process.env.REACT_APP_ROUTER_HOST}sign`, {
                data : {
                    id : idRef.current.value,
                    pwd : pwdRef.current.value,
                    email : emailRef.current.value
                }
            }).then((res) => {
                console.log(res);
                navigate('/');
            })
        }}>회원가입</button>
    </form>
}