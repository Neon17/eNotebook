import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(props){
    let navigate = useNavigate();
    let a = 0;

    const logout = ()=>{
        if (localStorage.getItem('token')){
            localStorage.removeItem('token');
        }
        navigate('/login');
    }

    setTimeout(() => {
        a = 1;
    }, 1000);
    
    useEffect(()=>{
        if (a===0)
            logout();
    });

    return (
        <div className="container m-2 text-center">
            Logging Out...
        </div>
    )
}
