import './profile.css'
import axios from "axios";
import Moon from '../imgs/Moon.png';
import Sun from '../imgs/Sun.png'
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Profile(){
    const navigate = useNavigate();
    const location = useLocation();
    const [thema, setThema] = useState(location.state.thema);
    const [profile, setProfile] = useState({});
    const [psw, setPsw] = useState(profile.psw);
    const [pswCh, setPswCh] = useState(profile.psw);
    const [email, setEmail] = useState(profile.email);

    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_ROUTER_HOST}profile`, {
            data : {
                id : location.state.id
            }
        })
        .then((res) => {
            setProfile(res.data[0]);
        });
    },[]);

    if(thema){
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#202020';
    } else {
        document.body.style.backgroundColor = '#202020';
        document.body.style.color = '#ffffff';
    }
    return <div>
        <header id='setHeader'>
            프로필 수정
        </header>
        <div id="profileDiv">
            <label>
                Id <input type="text" name="modifyId"
                    style={thema ? {color : '#202020'} : {color : '#ffffff'}} defaultValue={profile.id} disabled />
            </label>
            <label>
                Password<input type="password" name="modifyPsw"
                    onChange={event => {setPsw(event.currentTarget.value)}}
                    style={thema ? {color : '#202020'} : {color : '#ffffff'}} defaultValue={profile.password} />
            </label>
            <label>
                Password Check<input type="password" name="modifyPswCh"
                onChange={event => {setPswCh(event.currentTarget.value)}}
                    style={psw !== pswCh ? {color : '#ff0000'} : {color : thema ? '#202020' : '#ffffff'}} defaultValue={profile.password} />
            </label>
            <label>
                E-mail<input type="text" name="modifyEmail"
                    onChange={event => {setEmail(event.currentTarget.value)}}
                    style={thema ? {color : '#202020'} : {color : '#ffffff'}} defaultValue={profile.email} />
            </label>
            <label>
                <button style={thema ? {color : ''} : {color : '#ffffff'}}
                    onClick={()=>{
                        if(psw !== pswCh){
                            alert('비밀번호가 다릅니다.');
                            return
                        }
                        if(psw === '' || pswCh === '' || email === ''){
                            alert('빈칸을 입력해주세요')
                            return
                        }
                        axios.post(`${process.env.REACT_APP_ROUTER_HOST}updateProfile`, {
                            data : {
                                id : profile.id,
                                psw : psw,
                                email : email
                            }
                        }).then((res) => {
                            if(res.data[0] !== 'fail'){
                                alert('변경 되었습니다.')
                                navigate('/list', { state : {id : location.state.id, thema : thema}});
                            }else{
                                alert('변경에 실패 했습니다.')
                            }
                        });

                    }}>변경</button>
            </label>
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