import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

export default function Notes(props){
    let context = useContext(noteContext);
    const navigate = useNavigate();
    let [data,setData] = useState();
    let [alert,setAlert] = useState(null);
    let [alertColor, setAlertColor] = useState(null);
    
    useEffect(()=>{
        if (!context.token)
            navigate('/login',{ replace: true })
        else {
            axios.get("http://localhost:5000/api/v1/notes/")
                .then((res)=>{
                    setData(res.data.data);
                })
                .catch((err)=>console.error(err));
        }
    },[])
    
    let deleteNote = async(id)=>{
        let res = await axios.delete(`http://localhost:5000/api/v1/notes/${id}`);
        if (res.data.status==='success'){
            setAlert("Success! Note is deleted");
            setAlertColor("success");
        }    
        else if (res.data.status==='error'){
            setAlert("Error! Note cannot be deleted");
            setAlertColor("danger");
        }
    }

    const editNote = async(id)=>{
        console.log(context.token);
        let res = await axios.patch(`http://localhost:5000/api/v1/notes/${id}`);
        if (res.data.status==='success'){
            setAlert("Success! Note is deleted");
            setAlertColor("success");
        }      
        else if (res.data.status==='error'){
            setAlert("Error! Note cannot be deleted");
            setAlertColor("danger");
        }
    }

    // setTimeout(() => {
    //     setAlert(null);
    // }, 5000);
    
    return (
        <div className='container my-2'>
            {(alert)&& 
                <div class="alert alert-danger" role="alert">
                    {alert}
            </div>}
            {!(alert) && 
                <div style={{height: '57.6px',width: '100%'}}></div>
            }
            <div className='py-2 d-flex flex-wrap'>
                {(data) && (data.map((element)=>{
                    return (<div className="card m-2" key={element._id} style={{width: '18rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">{element.title}</h5>
                            <p className="card-text">{element.description}</p>
                            <p className="card-text">{element.date.split('T')[0]}</p>
                            <Link to={`/notes/edit/${element._id}`} className="btn btn-success btn-sm my-1" onClick={()=>editNote(element._id)}>Edit</Link>
                            <a href="" className="btn btn-danger btn-sm my-1 ms-1" onClick={()=>deleteNote(element._id)}>Delete</a>
                        </div>
                    </div>)
                }))}
            </div>

        </div>
    )
}
