import './sign.css';
import logoExtend from '../imgs/englishnoteLogoExtend.png';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useRef, useState } from 'react';
import eye from '../imgs/eye.png'
import Moon from '../imgs/Moon.png';
import Sun from '../imgs/Sun.png'
import eyeClose from '../imgs/eyeClose.png'

export default function Sign(){
    const idRef = useRef();
    const [psw, setPsw] = useState('');
    const [pswCh, setPswCh] = useState('');
    const emailRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const [dup, setDup] = useState('null');
    const [pwd, setPwd] = useState(true);
    const [pwdCh, setPwdCh] = useState(true);
    const [thema, setThema] = useState(location.state.thema);

    if(thema){
        document.body.style.backgroundColor = '#ffffff';
    } else {
        document.body.style.backgroundColor = '#202020';
    }

    return <form id="signForm">
        <img id='logo' src={logoExtend}  alt='logo'/>
        <label id='idLabel'>
            <input type="text" name="id" placeholder='Id' ref={idRef} 
                style={ dup === 'sucess' || dup === 'null' ? { color : thema ? '#202020' : '#ffffff'} : {color : '#ff0000'}  } />
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
        
        <input type="text" name='email' placeholder='E-mail' ref={emailRef}
            style={ thema ? {color : '#202020'} : {color : '#ffffff'}}/>
        <label className='pswLabel'>
            <input type="password" id="psw" name="psw" placeholder='Password' autoComplete="off"
                style={ thema ? {color : '#202020'} : {color : '#ffffff'}}
                onChange={event => {setPsw(event.currentTarget.value)}}/>
            <input type='button' className='typeBtn' onClick={(event)=>{
                if(pwdCh){
                    document.getElementById('psw').type = "text";
                    event.currentTarget.style.backgroundImage = `url(${eye})`;
                } else {
                    document.getElementById('psw').type = "password";
                    event.currentTarget.style.backgroundImage = `url(${eyeClose})`;
                }
                setPwdCh(!pwdCh);
            }}/>
        </label>
        
        <label className='pswLabel' id='pswChLabel'>
            <input type="password" id="pswCh" name="pswCh" placeholder='Password Check' autoComplete="off"
                style={psw !== pswCh ? {color : '#ff0000'} : {color : thema ? '#202020' : '#ffffff'}}
                onChange={event => {setPswCh(event.currentTarget.value)}}/>
            <input type='button' className='typeBtn' onClick={(event)=>{
                if(pwd){
                    document.getElementById('pswCh').type = "text";
                    event.currentTarget.style.backgroundImage = `url(${eye})`;
                } else {
                    document.getElementById('pswCh').type = "password";
                    event.currentTarget.style.backgroundImage = `url(${eyeClose})`;
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
            if(psw === ''){
                alert('비밀번호를 입력해주세요.');
                return;
            }
            if(emailRef.current.value === ''){
                alert('이메일을 입력해주세요.');
                emailRef.current.focus();
                return;
            }
            if(pswCh !== psw){
                alert('비밀번호가 일치하지 않습니다.\n다시 입력해주세요.');
                return;
            }
            if(dup === 'duplic' || dup === 'null'){
                alert('아이디 중복 확인해주세요.');
                return;
            }

            if(emailRef.current.value.indexOf('@') === -1 ||
                emailRef.current.value.indexOf('@') >= emailRef.current.value.indexOf('.')){
                    alert('이메일 양식이 틀립니다.')
                    return;
            }

            axios.post(`${process.env.REACT_APP_ROUTER_HOST}sign`, {
                data : {
                    id : idRef.current.value,
                    pwd : psw,
                    email : emailRef.current.value
                }
            }).then((res) => {
                navigate('/', {thema : thema});
            })
        }} style={ thema ? {color : '#202020'} : {color : '#ffffff'}}>회원가입</button>
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
    </form>
}