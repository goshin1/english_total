import './profileCheck.css';
import Sun from '../imgs/Sun.png'
import Moon from '../imgs/Moon.png'
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react";

export default function ProfileCheck(){
    const location = useLocation();
    const navigate = useNavigate();
    const [thema, setThema] = useState();

    return <div>
        <header id='setHeader'>
            본인확인
        </header>
        <div id="profileCheckDiv">
            <p>비밀번호를 입력해주세요.</p>
            <p>
                <input type="password" placeholder="Password"/>
                <input type="button" value='Check' onClick={(event) => {
                    navigate('/profile', {id : location.state.id, thema : thema})
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