import React from 'react'

export default function Profile(){
    return (
        <div className='container-fluid p-2 pt-5' style={{backgroundColor: 'aliceblue',minHeight: '100vh'}}>
            <div className='container p-3 rounded bg-white'>
                <h3 className='mb-4'>General Information</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Name</label>
                        <input type="text" name="" id="" className="form-control" placeholder="" aria-describedby="helpId" />
                    </div>                    
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Email</label>
                        <input type="email" name="" id="" className="form-control" placeholder="" aria-describedby="emailHelpId" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Date of Birth</label>
                        <input type="date" name="" id="" className="form-control" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="button" aria-pressed="false" autocomplete="off">
                            Edit
                        </button>
                    </div>
                </form> 
            </div>
            <div className='container p-3 mt-2 rounded bg-white'>
            <h3 className='mb-4'>Credientials</h3>
                <form>
                    <div class="mb-3 mt-1">
                        <label for="" class="form-label">Create Password</label>
                        <input type="password" class="form-control" name="" id="" placeholder=""/>
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Confirm New Password</label>
                        <input type="password" class="form-control" name="" id="" placeholder=""/>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="button" aria-pressed="false" autocomplete="off">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
