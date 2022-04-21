import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Services from './pages/Services';
import Signup from './pages/Signup';
function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/create' element={<Account/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </Router>
  );
}

export default App;
