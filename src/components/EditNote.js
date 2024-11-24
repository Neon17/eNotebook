import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { redirect, useParams, Link } from 'react-router-dom';

function EditNote (){
    let [title, setTitle] = useState("");
    let [note, setNote] = useState("");
    let [date, setDate] = useState("");
    let { id } = useParams();
    let [radio1,setRadio1] = useState(false);
    
    let [status, setStatus] = useState(null);
    let [statusColor, setStatusColor] = useState(null);

    const fetchEditAPI = async()=>{
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        const response = await axios.get(`http://localhost:5000/api/v1/notes/${id}`,{ headers });
        setDate(response.data.data.date.split('T')[0]);
        setNote(response.data.data.description);
        setTitle(response.data.data.title);
        setRadio1((response.data.data.visibility==='Global')?true:false);
    }

    useEffect(()=>{
        fetchEditAPI();
    },[])

    const changeField = (event)=>{
        if (event.target.id==="titleNote1234"){
            setTitle(event.target.value);
        }
        else if (event.target.id==='fullNote1234'){
            setNote(event.target.value);
        }
        else if (event.target.id==='dateNote1234'){
            setDate(event.target.value);
        }
    }

    const updateNote = ()=>{
        //update button clicked
        let radio = document.getElementById('flexRadioDefault1');
        let status = (radio.checked)?'Global':'Local';
        const axiosConfig={headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }};
        axios.patch(
            `http://localhost:5000/api/v1/notes/${id}`,
            {
                title: title,
                description: note,
                date: date,
                visibility: status
            },
            axiosConfig
        ).then((res)=>{
            if (res.data.status==='success'){
                setStatus('Successfully Updated the Note');
                setStatusColor('success');
                setRadio1(status);
            }
            else {
                setStatus('Something went wrong!');
                setStatusColor('danger');
            }
            return redirect('/notes');  
        })
        .catch((err)=>{
            setStatus(err.message);
            setStatusColor('danger');
        });
    }

    setTimeout(() => {
        setStatus(null);
    }, 5000);

    return (
        <div className='container-fluid p-2' style={{backgroundColor: 'aliceblue',minHeight: '100vh'}}>
            <div className="container">                
                <h3 className='mb-4 mt-3 d-flex align-items-center'>
                    <Link name="" id="" className="btn m-2" to="/notes" role="button">&larr;</Link>
                    Edit a Note
                </h3>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Title of Note: </label>
                    <input type="text" value={title} className="form-control" onChange={changeField} name="" id="titleNote1234" aria-describedby="helpId" placeholder=""/>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Write your notes here</label>
                    <textarea value={note} className="form-control" onChange={changeField} name="" id="fullNote1234" rows="3"></textarea>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Date</label>
                    <input type="date" value={date} className="form-control" name="" id="dateNote1234" aria-describedby="helpId" onChange={changeField}/>
                </div>

                <p className='mt-1'>Visibility</p>
                <div className="form-check">
                    {(radio1)&&
                        <input className="form-check-input" type="radio" onClick={changeField} onChange={changeField} name="flexRadioDefault" id="flexRadioDefault1" checked/>
                    }
                    {(!radio1)&&
                        <input className="form-check-input" type="radio" onClick={changeField} onChange={changeField} name="flexRadioDefault" id="flexRadioDefault1"/>
                    }
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Global
                    </label>
                </div>
                <div className="form-check mb-2">
                    {(!radio1)&&
                        <input className="form-check-input" type="radio" onClick={changeField} onChange={changeField} name="flexRadioDefault" id="flexRadioDefault2" checked/>
                    }
                    {(radio1)&&
                        <input className="form-check-input" type="radio" onClick={changeField} onChange={changeField} name="flexRadioDefault" id="flexRadioDefault2"/>
                    }
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Local
                    </label>
                </div>

                <button type="submit" className="btn btn-primary" onClick={updateNote}>
                    Update
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

export default EditNote;
