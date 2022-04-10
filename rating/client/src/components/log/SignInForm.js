import React, { useState } from 'react';
import axios from 'axios'; 
const SignInForm = () => { 

    const [email,setEmail] = useState(''); 
    const [password,setPassword] = useState(''); 

    const handleLogin = (e) => {  
        e.preventDefault(); 
        const EmailError = document.querySelector('.email.error'); 
        const PasswordError = document.querySelector('.password.error');
        axios({
            method : "POST", 
            url : `${process.env.REACT_APP_API_URL}api/user/login`, 
            withCredentials:true,
            data :{
                email, 
                password,
            },
        })  
         .then((res) => {
             if(res.data.errors){
                 EmailError.innerHTML = res.data.errors.email; 
                 PasswordError.innerHTML = res.data.errors.password;
             }else {
                 window.location='/';
             }
         })  
         .catch((err) => {
             console.log(err);
         });
    };
    return(
       <form action="" onSubmit={handleLogin} id="sigh-up-form">
           <label htmlFor='email'>Email</label> 
           <br /> 
           <input
            type="text"
            name="email" 
            id="email" 
            onChange={(e) => setEmail(e.target.value)}
            value={email} 
            /> 
            <div className='email error'></div>
           <br /> 
           <label htmlFor='password'>Mot de passe</label> 
           <br />  
           <input
            type="password" 
            name="password" 
            id="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            />   
            <div className='password error'></div>
            <br /> 
            <input type="submit" value="Se connecter" />  
       </form>
    );
};

export default SignInForm