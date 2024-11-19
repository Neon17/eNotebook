import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

function Home (props){
    let [status, setStatus] = useState(null);
    let [statusColor, setStatusColor] = useState(null);
    let [date,setDate] = useState(new Date().toISOString().split("T")[0]);
    let [note,setNote] = useState("");
    let [title, setTitle] = useState("");
    const context = useContext(noteContext);
    const navigate = useNavigate();

    const changeField = (event)=>{
        if (event.target.id === 'dateNote1234')
            setDate(event.target.value);
        else if (event.target.id === 'titleNote1234')
            setTitle(event.target.value);
        else if (event.target.id === 'fullNote1234')
            setNote(event.target.value);
    }

    useEffect(()=>{
        if (!context.token)
            navigate("/login",{ replace: true })  
    })

    let postNote = ()=>{
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json"
                // "Access-Control-Allow-Origin": "*"
            }
        }
        axios.post(
            "http://localhost:5000/api/v1/notes",
            {
                title: title,
                description: note,
                date: date
            },
            axiosConfig
        )
        .then((res)=>{
            if (res.data.status === 'success'){
                setStatus('Success! Notes created successfully');
                setStatusColor('success');
            }
            else if (res.data.status === 'error'){
                setStatus(`Error! ${res.message}`);
                setStatusColor('danger');
            }
            console.log(res.data.status);
        })
        .catch((err)=>console.error(err));
    }

    setTimeout(()=>{
        setStatus(null);
    },5000)

    return (
        <div>
            <div className="container">
                <h3 className='mb-4 mt-3'>Create a Note</h3>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Title of Note: </label>
                    <input type="text" className="form-control" onChange={changeField} name="" id="titleNote1234" aria-describedby="helpId" placeholder=""/>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Write your notes here</label>
                    <textarea className="form-control" onChange={changeField} name="" id="fullNote1234" rows="3"></textarea>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Date</label>
                    <input type="date" className="form-control" name="" id="dateNote1234" aria-describedby="helpId" onChange={changeField} value={date}/>
                </div>

                <button type="submit" className="btn btn-primary" onClick={postNote}>
                    Submit
                </button>

                {!status || 
                    <div className={`mt-2 alert alert-${statusColor}`} role="alert">
                        {status}
                    </div>
                }
            </div>
        </div>
    )
}

export default Home;

