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
        axios.post('http://localhost:5000/login', {
            data : {
                id : idRef.current.value,
                pwd : pwdRef.current.value
            }
        }).then(res => {
            console.log(res.data.id );
            if(res.data !== 'login fail'){
                navigate('/list', {
                        state : {
                            id : res.data.id
                        }
                    });
                return;
            }
            alert('아이디, 비밀번호가 틀렸습니다.\n다시 입력해주세요.');
            return;
        });

        //navigate('/list');
    }


    return <form id='loginForm'>
        <img id='logo' src={logoExtend} alt='logo'/>
        <input type="text" name="id" placeholder='Id' ref={ idRef } />
        <input type="password" name="psw" placeholder='Password' ref={ pwdRef } onMouseDown={(event)=>{
            event.currentTarget.type = "text";
        }} onMouseUp={event=>{
            event.currentTarget.type = "password";
        }}/>
        <Link id='loginBtn' to='/' onClick={ event => {
            login(event);  
        }}>로그인</Link>
        <Link to="/sign" id='signBtn'>회원가입</Link>
    </form>
}