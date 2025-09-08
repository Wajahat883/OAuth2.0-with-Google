import {BrowserRouter, Route, Routes,Link} from "react-router-dom";
import Home from "./Pages/Home";
import Authsuccess from "./Pages/Authsuccess";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{display:"flex",gap:"10px",padding:"10px",borderBottom:"1px solid black"}}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth/success" element={<Authsuccess/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}


