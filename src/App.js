import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from './components/Notes';

function App() {

  const fetchAPI = async()=>{
    const response = await axios.get("http://localhost:5000/");
    console.log(response.data);
  }

  useEffect(()=>{
    fetchAPI();
  })

  return (
    <>
    <Router>
      <Navbar title = 'E-NoteBook'/>
      <Routes>
        <Route exact path = "/" element="Home Page"/>
        <Route exact path = "/notes" element={<Notes/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
