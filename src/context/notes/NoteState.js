import React,{ useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props)=>{
    const [token, setToken] = useState(null);
    return (
        <NoteContext.Provider value={{token, setToken}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
