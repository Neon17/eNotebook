import axios from 'axios';
import React,{ useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import noteContext from '../context/notes/noteContext';

export default function Notes(props){
    // let context = useContext(noteContext);
    const navigate = useNavigate();
    let [localNotes,setLocalNotes] = useState();
    let [globalNotes, setGlobalNotes] = useState();
    let [alert,setAlert] = useState(null);
    
    
    useEffect(()=>{
        if ((!localStorage.getItem('token')))
            navigate('/login',{ replace: true })
        else {
            const headers= {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            axios.get(
                "http://localhost:5000/api/v1/notes/",
                { headers },
            )
            .then((res)=>{
                setLocalNotes(res.data.localNotes);
                setGlobalNotes(res.data.globalNotes);
                if (res.data.status === 'error'){
                    if (res.data.message === 'jwt expired'){
                        localStorage.removeItem('token');
                        navigate('/login',{ replace: true })
                    }
                }
            })
            .catch((err)=>console.error(err));
        }
    })
    
    let deleteNote = async(id)=>{
        let res = await axios.delete(`http://localhost:5000/api/v1/notes/${id}`);
        if (res.data.status==='success'){
            setAlert("Success! Note is deleted");
        }    
        else if (res.data.status==='error'){
            setAlert("Error! Note cannot be deleted");
        }
    }

    const editNote = async(id)=>{
        let res = await axios.patch(`http://localhost:5000/api/v1/notes/${id}`);
        if (res.data.status==='success'){
            setAlert("Success! Note is deleted");
        }      
        else if (res.data.status==='error'){
            setAlert("Error! Note cannot be deleted");
        }
    }

    // setTimeout(() => {
    //     setAlert(null);
    // }, 5000);
    
    return (
        <div className='container p-2'>
            <div className='container my-2'>
                <h3 className='text-center'>Global Notes</h3>
                <div className='py-2 d-flex flex-wrap'>
                    {(globalNotes) && (globalNotes.map((element)=>{
                        return (<div className="card m-2" key={element._id} style={{width: '18rem'}}>
                            <div className="card-body">
                                <h5 className="card-title">{element.title}</h5>
                                <p className="card-text">{element.description}</p>
                                {/* <p className="card-text">Created By: {element.createdBy}</p> */}
                                <p className="card-text">{element.date.split('T')[0]}</p>
                            </div>
                        </div>)
                    }))}
                </div>
                {(alert)&& 
                    <div class="alert alert-danger" role="alert">
                        {alert}
                </div>}
                {!(alert) && 
                    <div style={{height: '57.6px',width: '100%'}}></div>
                }
            </div>
            <div className='container my-2'>
                <h3 className='text-center'>Your Notes</h3>
                <div className='py-2 d-flex flex-wrap'>
                    {(localNotes) && (localNotes.map((element)=>{
                        return (<div className="card m-2" key={element._id} style={{width: '18rem'}}>
                            <div className="card-body">
                                <h5 className="card-title">{element.title}</h5>
                                <p className="card-text">{element.description}</p>
                                <p className="card-text">{element.date.split('T')[0]}</p>
                                <Link to={`/notes/edit/${element._id}`} className="btn btn-success btn-sm my-1" onClick={()=>editNote(element._id)}>Edit</Link>
                                <a className="btn btn-danger btn-sm my-1 ms-1" href='/' onClick={()=>deleteNote(element._id)}>Delete</a>
                            </div>
                        </div>)
                    }))}
                </div>
                {(alert)&& 
                    <div class="alert alert-danger" role="alert">
                        {alert}
                </div>}
                {!(alert) && 
                    <div style={{height: '57.6px',width: '100%'}}></div>
                }
            </div>
        </div>
    )
}
