import React from 'react'

export default function Home() {
    const login=()=>{
        window.location.href = 'http://localhost:4000/api/auth/google';
    }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={login}>Login with Google</button>
    </div>
  )
}
