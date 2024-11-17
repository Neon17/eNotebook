import axios from 'axios';
import React,{useEffect, useState} from 'react';

export default function Notes(props){

    let [data,setData] = useState();

    let fetchNotesAPI = async()=>{
        try{
            let res = await axios.get("http://localhost:5000/api/v1/notes/")
            setData(res.data.data);
        }
        catch (error){
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchNotesAPI();
    },[])
    
    return (
        <div className='container'>
            {(data) && (data.map((element)=>{
                return (<div className='py-2' key={element._id}>
                    <h6>Title: {element.title}</h6>
                    <p>Description: {element.description}</p>
                    <p>Date: {element.date}</p>
                </div>)
            }))}
        </div>
    )
}
