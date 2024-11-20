import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from './components/Notes';
import Home from './components/Home';
import EditNote from './components/EditNote';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import Logout from './components/Logout';
// import { useEffect } from 'react';

function App() {
  return (
    <>
      <NoteState>
      <Router future={{v7_startTransition:'true',v7_relativeSplatPath:'true'}}>
        <Navbar title = 'E-NoteBook' key="3286483rhdfiesryf"/>
        <Routes>
          <Route exact path = "/" element={<Home/>}/>
          <Route exact path = "/notes" element={<Notes/>} />
          <Route exact path = "/notes/edit/:id" element={<EditNote/>} />
          <Route exact path = "/login" element={<Login/>} />
          <Route exact path = "/signup" element={<Signup/>} />
          <Route exact path = "/logout" element={<Logout/>} />
          <Route exact path = "/about" element={`About Page`} />
          <Route path = '*' element="Page Not Found" />
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
