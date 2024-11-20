import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Navbar(props){
    let state;
    let [btns,setBtns] = useState(null)
    setInterval(()=>{
        state = localStorage.getItem('token');
        if (state==null){
            setBtns(<><Link name="" id="" className="btn btn-primary me-2" to="/login" role="button" >Login</Link>
            <Link name="" id="" className="btn btn-primary" to="/signup" role="button" >Signup</Link></>);
        }
        else {
            setBtns(<Link name="" id="" className="btn btn-primary me-2" to="/logout" role="button" >Logout</Link>)
        }
    },1000);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary border">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">{props.title}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/">About</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/notes">Notes</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link disabled" to='/' aria-disabled="true">Disabled</Link>
                    </li>
                </ul>
                {btns}             
                </div>
            </div>
        </nav>
    )
}
export default Navbar;
