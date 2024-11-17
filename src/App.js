import './App.css';
// import axios from 'axios';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from './components/Notes';
import Home from './components/Home';

function App() {

  const fetchAPI = async()=>{
    // const response = await axios.get("http://localhost:5000/");
  }

  useEffect(()=>{
    fetchAPI();
  })

  return (
    <>
    <Router future={{v7_startTransition:'true',v7_relativeSplatPath:'true'}}>
      <Navbar title = 'E-NoteBook'/>
      <Routes>
        <Route exact path = "/" element={<Home/>}/>
        <Route exact path = "/notes" element={<Notes/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
