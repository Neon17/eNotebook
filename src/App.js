import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from './components/Notes';
import Home from './components/Home';
import EditNote from './components/EditNote';

function App() {

  return (
    <>
    <Router future={{v7_startTransition:'true',v7_relativeSplatPath:'true'}}>
      <Navbar title = 'E-NoteBook'/>
      <Routes>
        <Route exact path = "/" element={<Home/>}/>
        <Route exact path = "/notes" element={<Notes/>} />
        <Route exact path = "/notes/edit/:id" element={<EditNote/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
