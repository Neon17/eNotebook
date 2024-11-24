import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile(){
    let [data,setData] = useState(null);
    let [updateStatus, setUpdateStatus] = useState(false);
    let [alert, setAlert] = useState(null);
    let [alertColor, setAlertColor] = useState("");
    const [email,setEmail] = useState(null); //email is set for reset password functionality to ensure readOnlyness
    const navigate = useNavigate();

    const changeField = (event)=>{
        if (updateStatus){
            if (event.target.id==='profilename')
                setData({name: event.target.value});
            else if (event.target.id==='profileemail')
                setData({email: event.target.value});
            else if (event.target.id==='profiledob'){
                setData({DateOfBirth: event.target.value});
            }
        }
    }

    const changeUpdateStatus = ()=>{
        if (updateStatus) updateGeneral();
        setUpdateStatus(!updateStatus);
    }

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
            else{
                setData(res.data.data);
                setEmail(res.data.data.email);
            }
        })
        .catch((err)=>{
            console.error(err.message);
        })
    },[])

    const updateGeneral = ()=>{
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        axios.patch(
            'http://localhost:5000/api/v1/users/update',
            {
                name: data.name,
                email: data.email,
                DateOfBirth: data.DateOfBirth
            },
            { headers }
        ).then((res)=>{
            if (res.data.status === 'success'){
                setAlert('Successfully updated name, email or dob');
                setAlertColor('success');
            }
            else {
                setAlert('Something went wrong. Try again!');
                setAlertColor('warning');
            }
        }).catch((err)=>{
            console.log(err.message);
        })
    }

    const updatePassword = ()=>{
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        let currentPassword = document.getElementById('profilecurrentpassword').value;
        let newPassword = document.getElementById('profilenewpassword').value;
        let confirmPassword = document.getElementById('profileconfirmpassword').value;
        axios.patch(
            'http://localhost:5000/api/v1/users/updatePassword',
            {
                currentPassword : currentPassword,
                password: newPassword,
                confirmPassword: confirmPassword
            },
            { headers }
        ).then((res)=>{
            if (res.data.status === 'success'){
                setAlert('Successfully Updated Password');
                setAlertColor('success');
            }
            else {
                setAlert(res.data.message);
                setAlertColor('warning');
            }
            document.getElementById('profilecurrentpassword').value = "";
            document.getElementById('profilenewpassword').value= "";
            document.getElementById('profileconfirmpassword').value = "";
        }).catch((err)=>{
            console.log(err.message);
        })
    }

    const resetPassword = ()=>{
        console.log(email);
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        axios.put(
            'http://localhost:5000/api/v1/users/sendResetTokenEmail',
            {
                email: email
            },
            { headers }
        ).then((res)=>{
            console.log(res.data);
        }).catch((err)=>{
            console.error(err);
        })
    }

    setTimeout(() => {
        setAlertColor(null);
        setAlert(null);
    }, 5000);

    return (
        <>
        <div className={`alert alert-${alertColor} border-none m-0`} style={{height: '56px',backgroundColor: 'aliceblue'}} role="alert">
            {alert}
        </div>
        <div className='container-fluid p-2 pt-3 m-0' style={{backgroundColor: 'aliceblue',minHeight: '100vh'}}>
            <div className='container p-3 rounded bg-white'>
                <h3 className='mb-4'>General Information</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Name</label>
                        <input type="text" name="" id="profilename" value={data?data.name:""} onChange={changeField} className="form-control" placeholder="" aria-describedby="helpId" readOnly={(updateStatus)?false:true}/>
                    </div>                    
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Email</label>
                        <input type="email" name="" id="profileemail" value={data?data.email:""} onChange={changeField} className="form-control" placeholder="" aria-describedby="emailHelpId" readOnly={(updateStatus)?false:true}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Date of Birth</label>
                        <input type="date" name="" id="profiledob" value={data?data.DateOfBirth:"0000-00-00"} onChange={changeField} className="form-control" placeholder="" aria-describedby="helpId" readOnly={(updateStatus)?false:true}/>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type="button" onClick={changeUpdateStatus} className="btn btn-primary btn-sm" data-bs-toggle="button" aria-pressed="false" autoComplete="off">
                            {(updateStatus)?'Update':'Edit'}
                        </button>
                    </div>
                </form> 
            </div>
            <div className='container p-3 mt-2 rounded bg-white'>
                <h3 className='mb-4'>Credientials</h3>
                <form>
                    <div className="mb-3 mt-1">
                        <label htmlFor="" className="form-label">Current Password</label>
                        <input type="password" className="form-control" name="" id="profilecurrentpassword" placeholder=""/>
                    </div>
                    <div className="mb-3 mt-1">
                        <label htmlFor="" className="form-label">New Password</label>
                        <input type="password" className="form-control" name="" id="profilenewpassword" placeholder=""/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Confirm New Password</label>
                        <input type="password" className="form-control" name="" id="profileconfirmpassword" placeholder=""/>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type="button" className="btn btn-primary btn-sm" onClick={updatePassword} data-bs-toggle="button" aria-pressed="false" autoComplete="off">
                            Update
                        </button>
                    </div>
                </form>
            </div>
            <div className='container p-0 mt-3'>
                <button type="button" className="btn btn-primary" onClick={resetPassword} data-bs-toggle="button" aria-pressed="false" autoComplete="off">
                    Reset Password
                </button>
            </div>
        </div>

        </>
    )
}
