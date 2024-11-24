import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

function Home (props){
    let [status, setStatus] = useState(null);
    let [statusColor, setStatusColor] = useState(null);
    let [date,setDate] = useState(new Date().toISOString().split("T")[0]);
    let [note,setNote] = useState("");
    let [title, setTitle] = useState("");
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
        if ((!localStorage.getItem('token')))
            navigate("/login",{ replace: true })  
        const headers= {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        axios.get(
            "http://localhost:5000/api/v1/notes",
            { headers }
        )
        .then((res)=>{
            if (res.data.status==='error'){
                if (res.data.message === 'jwt expired'){
                    localStorage.removeItem('token');
                    navigate('/login',{ replace: true })
                }
            }
        })
    })

    let postNote = ()=>{
        let radio1 = document.getElementById('flexRadioDefault1');
        let status = (radio1.checked)?'Global':'Local';
        const headers= {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        axios.post(
            "http://localhost:5000/api/v1/notes",
            {
                title: title,
                description: note,
                date: date,
                visibility: status
            },
            { headers }
        )
        .then((res)=>{
            if (res.data.status === 'success'){
                setStatus('Success! Notes created successfully');
                setStatusColor('success');
            }
            else if (res.data.status === 'error'){
                if (res.data.message === 'jwt expired'){
                    localStorage.removeItem('token');
                    navigate('/login',{ replace: true })
                }
                setStatus(`Error! ${res.message}`);
                setStatusColor('danger');
            }
        })
        .catch((err)=>console.error(err));
    }

    setTimeout(()=>{
        setStatus(null);
    },6000)

    return (
        <div className='container-fluid p-2' style={{backgroundColor: 'aliceblue',minHeight: '100vh'}}>
            <div className="container">
                <h3 className='mb-4 mt-3'>Create a Note</h3>

                <form name='myForm'>

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

                    <p className='mt-1'>Visibility</p>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" onClick={changeField} onChange={changeField} name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Global
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" onClick={changeField} onChange={changeField} name="flexRadioDefault" id="flexRadioDefault2" checked/>
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Local
                        </label>
                    </div>
                    

                    <button type="submit" className="btn btn-primary" onClick={postNote}>
                        Submit
                    </button>

                </form>

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

