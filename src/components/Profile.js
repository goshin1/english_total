import axios from "axios";
import Moon from '../imgs/Moon.png';
import Sun from '../imgs/Sun.png'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Profile(){
    const location = useLocation();
    const [profile, setProfile] = useState({});
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

    console.log(profile);

    return <div>
        <header id='setHeader'>
            프로필 수정
        </header>
        <div id="profileDiv">
            <label>
                <input type="text" name="modifyName" defaultValue={profile.id} disabled />
            </label>
            <label>
                <input type="password" name="modifyName" defaultValue={profile.password} />
            </label>
            <label>
                <input type="text" name="modifyName" defaultValue={profile.email} />
            </label>
        </div>
    </div>
}