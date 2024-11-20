import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { redirect, useParams, Link } from 'react-router-dom';

function EditNote (){
    let [title, setTitle] = useState("");
    let [note, setNote] = useState("");
    let [date, setDate] = useState("");
    let { id } = useParams();
    
    let [status, setStatus] = useState(null);
    let [statusColor, setStatusColor] = useState(null);

    const fetchEditAPI = async()=>{
        const response = await axios.get(`http://localhost:5000/api/v1/notes/${id}`);
        setDate(response.data.data.date.split('T')[0]);
        setNote(response.data.data.description);
        setTitle(response.data.data.title);
    }

    useEffect(()=>{
        fetchEditAPI();
    })

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
        const axiosConfig={headers: {
            "Content-Type": "application/json"
        }};
        axios.patch(
            `http://localhost:5000/api/v1/notes/${id}`,
            {
                title: title,
                description: note,
                date: date
            },
            axiosConfig
        ).then((res)=>{
            if (res.data.status==='success'){
                setStatus('Successfully Updated the Note');
                setStatusColor('success');
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
    }, 3000);

    return (
        <div>
            <div className="container">                
                <h3 className='mb-4 mt-3 d-flex align-items-center'>
                    <Link name="" id="" className="btn btn-light m-2" to="/notes" role="button">&larr;</Link>
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
