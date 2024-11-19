import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from './components/Notes';
import Home from './components/Home';
import EditNote from './components/EditNote';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
      <NoteState>
      <Router future={{v7_startTransition:'true',v7_relativeSplatPath:'true'}}>
        <Navbar title = 'E-NoteBook'/>
        <Routes>
          <Route exact path = "/" element={<Home/>}/>
          <Route exact path = "/notes" element={<Notes/>} />
          <Route exact path = "/notes/edit/:id" element={<EditNote/>} />
          <Route exact path = "/login" element={<Login/>} />
          <Route exact path = "/signup" element={<Signup/>} />
          <Route path = '*' element="Page Not Found" />
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
