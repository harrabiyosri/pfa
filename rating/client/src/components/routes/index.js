import React from 'react';
import {BrowserRouter as Router,Routes, Navigate, Route} from 'react-router-dom';
import Home from '../../pages/Home'; 
import Profil from '../../pages/Profil';
import Navbar from '../Navbar'; 
import Evaluation from '../../pages/Evaluation';
import Trending from '../../pages/Trending';
import Rating from '../../pages/Rating';
const index = () => {   
    let iduser
    return(
         <Router>  
             <Navbar />
             <Routes>
                 <Route path="/" element = {<Home />} /> 
                 <Route path="/Profil" element={<Profil />} /> 
                 <Route path='/Trending' element={<Trending />} />
                 <Route path="/" element={<Navigate replace to="/Home" />} />  
                 <Route path="/Evaluation/:id" exact element = {<Evaluation />} /> 
                 <Route path="/Rating" exact element = {<Rating />} />
             </Routes>   
         </Router>
    );
    
};

export default index;
