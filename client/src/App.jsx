import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import {Routes,Route,Navigate} from 'react-router-dom'
const App = () => {
  return (
    <Routes>
      <Route path =  '/' element={<Home />}/>
      <Route path =  '/about' element={  <About />}/>
      <Route path =  '*' element={  <Navigate to='/' replace />}/>
    
      
    </Routes>
  );
};

export default App;
