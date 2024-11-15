import axios from 'axios';
import React,{useEffect} from 'react';

export default function Notes(props){

    const fetchNotesAPI = async()=>{
        const response = (await axios.get("http://localhost:5000/api/v1/notes/"));
        console.log(response.data);
    }

    useEffect(()=>{
        fetchNotesAPI();
    })

    return (
        <div>
            Notes Page
        </div>
    )
}
