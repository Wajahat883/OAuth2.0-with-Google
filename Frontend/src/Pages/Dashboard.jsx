
import { useState } from "react";
import {api} from "../api";

export default function Dashboard() {   
    const [me,setMe]=useState(null);
    const fetchMe=async()=>{
        const access=sessionStorage.getItem("access");
        const res=await api.get('/api/me',{
            headers:{
                Authorization:`Bearer ${access}`
            }
        })
        setMe(res.data);
    }
    const logout=async()=>{
       await api.post('/auth/logout')
         sessionStorage.removeItem("access");
            window.location.href="/";
    }
    return (
    <div>
        <h1>Dashboard</h1>
        <button onClick={fetchMe}>Fetch Me</button>
        <button onClick={logout}>Logout</button>
        {me && (<div>
            <h2>Your Information</h2>
            <pre>{JSON.stringify(me, null, 2)}</pre>
        </div>)}
    </div>  
    )
}