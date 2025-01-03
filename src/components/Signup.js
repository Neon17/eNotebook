import axios from 'axios';
import {useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

export default function Signup(props){
    let context = useContext(noteContext);
    const navigate = useNavigate();

    let [name,setName] = useState("");
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");

    let [status, setStatus] = useState(null);

    let nameChange = (event)=> setName(event.target.value);
    let emailChange = (event)=> setEmail(event.target.value);
    let passwordChange = (event)=> setPassword(event.target.value);
    let confirmPasswordChange = (event)=> setConfirmPassword(event.target.value);

    let signup = ()=>{
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.post(
            "http://localhost:5000/api/v1/users/signup",
            {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            },
            axiosConfig
        ).then((res)=>{
            if (res.data.status!=='success'){
                setStatus(res.data.message);
                setEmail(""); setPassword("");
                setName(""); setConfirmPassword("");
            }
            else {
                localStorage.setItem('token', res.data.token);
                context.setToken(res.data.token);
                navigate("/",{ replace: true })  
            }
        }).catch((err)=>{
            console.error(err.message);
        })
    }

    return (
        <div className="container my-3 d-flex flex-column align-items-center">  
            <div className="card" style={{width: "25rem"}}>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Name</label>
                        <input
                            type="text"
                            name=""
                            id="nameSignup1234"
                            className="form-control"
                            placeholder="Enter your name here"
                            aria-describedby="helpId"
                            value = {name}
                            onChange={nameChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Email</label>
                        <input
                            type="email"
                            name=""
                            id="emailSignup1234"
                            className="form-control"
                            placeholder="example@gmail.com"
                            aria-describedby="helpId"
                            value = {email}
                            onChange={emailChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Password</label>
                        <input
                            type="password"
                            name=""
                            id="passwordSignup1234"
                            className="form-control"
                            placeholder="Enter your password here"
                            aria-describedby="helpId"
                            value = {password}
                            onChange={passwordChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name=""
                            id="confirmPasswordSignup1234"
                            className="form-control"
                            placeholder="Confirm your password here"
                            aria-describedby="helpId"
                            value = {confirmPassword}
                            onChange={confirmPasswordChange}
                            required
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <button
                            type="button"
                            name=""
                            id=""
                            className="btn btn-primary"
                            onClick={signup}
                        >
                            Sign Up
                        </button>
                    </div>
                    
                </div>                

            </div> 
            <nav className="nav justify-content-center  ">
                <Link className="nav-link active" to="/login" aria-current="page">Login</Link>
            </nav>
            {status && 
            <div className="d-block my-2" style={{width: "25rem"}}>
                <div
                    className="alert alert-primary alert-dismissible fade show"
                    role="alert">
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                        ></button>
                        {status}
                </div>
            </div>}
        </div>
    )
}


