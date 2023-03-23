import './sign.css';
import logoExtend from '../imgs/englishnoteLogoExtend.png';
import { Link } from 'react-router-dom';

export default function Sign(){
    return <form id="signForm">
        <img id='logo' src={logoExtend}  alt='logo'/>
        <input type="text" name="id" placeholder='Id'/>
        <input type="text" name='email' placeholder='E-mail'/>
        <input type="password" className='psw' name="psw" placeholder='Password' onMouseDown={(event)=>{
            event.currentTarget.type = "text";
        }} onMouseUp={event=>{
            event.currentTarget.type = "password";
        }}/>
        
        <input type="password" className='psw' name="pswCh" placeholder='Check Password' onMouseDown={(event)=>{
            event.currentTarget.type = "text";
        }} onMouseUp={event=>{
            event.currentTarget.type = "password";
        }}/>
        <Link to="/" id='sign'>회원가입</Link>
    </form>
}