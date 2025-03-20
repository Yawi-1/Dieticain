import React,{useEffect} from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./components/Services/ServiceDetail";
import {Routes,Route,Navigate} from 'react-router-dom'
const App = () => {



  return (
    <Routes>
      <Route path =  '/' element={<Home />}/>
      <Route path =  '/about' element={  <About />}/>
      <Route path =  '/services' element={  <Services />}/>
      <Route path =  '/services/:id' element={  <ServiceDetail />}/>
      <Route path =  '*' element={  <Navigate to='/' replace />}/>
    
      
    </Routes>
  );
};

export default App;
