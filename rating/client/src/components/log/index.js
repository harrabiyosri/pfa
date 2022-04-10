import React,{useState} from 'react' 
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = (props) => {  
    const[signUpModel,setsignUpModel] = useState(props.signup);
    const[signInModel,setsignInModel] = useState(props.signin); 

    const handleModels = (e) => {
        if(e.target.id === "register"){
            setsignInModel(false); 
            setsignUpModel(true);
        }else if(e.target.id === "login"){
            setsignUpModel(false);
            setsignInModel(true);
        }
    } 
    return(
        <div className='connection-form'>
           <div className='form-container'>
              <ul>
                  <li onClick={handleModels} id="register" 
                  className={signUpModel ? 'active-btn' : null}>S'inscrire</li>  
                  <li onClick={handleModels} id="login" 
                  className={signInModel ? 'active-btn' : null}>Se Connecter</li>
              </ul>  
              {signUpModel && <SignUpForm />}
              {signInModel && <SignInForm />}
           </div>
        </div>
    ); 
}; 
 
export default Log;