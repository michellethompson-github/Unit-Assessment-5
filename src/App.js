import React from 'react';
import Nav from "./Components/Nav/Nav";
import Routes from './routes';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Nav></Nav>      
      <Routes></Routes>      
    </div>
  )
};

export default App;
