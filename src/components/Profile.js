import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile(){
    const navigate = useNavigate();
    let [data,setData] = useState(null);
    let [updateStatus, setUpdateStatus] = useState(false);

    const changeField = (event)=>{
        if (updateStatus){
            if (event.target.id==='profilename')
                setData({name: event.target.value});
            else if (event.target.id==='profileemail')
                setData({email: event.target.value});
        }
    }

    const changeUpdateStatus = ()=>setUpdateStatus(!updateStatus);

    useEffect(()=>{
        if (!localStorage.getItem('token'))
            navigate('/login',{ replace:true });
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        axios.get('http://localhost:5000/api/v1/users/profile', { headers })
        .then((res)=>{
            if (res.data.status==='error'){
                if (res.data.message==='jwt expired'){
                    localStorage.removeItem('token');
                    navigate('/login',{ replace:true });
                }
            }
            else
                setData(res.data.data);
        })
        .catch((err)=>{
            console.error(err.message);
        })
    },[])

    return (
        <div className='container-fluid p-2 pt-5' style={{backgroundColor: 'aliceblue',minHeight: '100vh'}}>
            <div className='container p-3 rounded bg-white'>
                <h3 className='mb-4'>General Information</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Name</label>
                        <input type="text" name="" id="profilename" value={(data)?data.name:""} onChange={changeField} className="form-control" placeholder="" aria-describedby="helpId" />
                    </div>                    
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Email</label>
                        <input type="email" name="" id="profileemail" value={(data)?data.email:""} onChange={changeField} className="form-control" placeholder="" aria-describedby="emailHelpId" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Date of Birth</label>
                        <input type="date" name="" id="profiledob" className="form-control" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type="button" onClick={changeUpdateStatus} className="btn btn-primary btn-sm" data-bs-toggle="button" aria-pressed="false" autoComplete="off">
                            Edit
                        </button>
                    </div>
                </form> 
            </div>
            <div className='container p-3 mt-2 rounded bg-white'>
            <h3 className='mb-4'>Credientials</h3>
                <form>
                    <div className="mb-3 mt-1">
                        <label htmlFor="" className="form-label">Create Password</label>
                        <input type="password" className="form-control" name="" id="profilenewpassword" placeholder=""/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Confirm New Password</label>
                        <input type="password" className="form-control" name="" id="profileconfirmpassword" placeholder=""/>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="button" aria-pressed="false" autoComplete="off">
                            {(updateStatus)?'Update':'Edit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
