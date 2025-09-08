

import { useEffect,useState } from 'react';
import {api} from "../api";

export default function Authsuccess() {
    const [message,setMessage]=useState("");
    useEffect(()=>{
        api.post('/auth/refresh').then((res)=>{
            const access=res.data.accessToken;
            sessionStorage.setItem("access",access);
            setMessage("Login Successful! You can now access the dashboard.");
        }).catch((err)=>{
            setMessage("Login Failed! Please try again.",err);
        })
  },[])
  return (
    <div>
      <h1>Authsuccess</h1>
      <p>{message}</p>
    </div>
  )
}
    