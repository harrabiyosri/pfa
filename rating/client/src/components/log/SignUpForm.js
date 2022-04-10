import React, { useState } from 'react';
import axios from 'axios'; 
import SignInForm from './SignInForm'

const SignUpForm = () => {
    const [formSubmit, setformSubmit] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlpassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const Errterms = document.querySelector('.terms.error');
        const Errpseudo = document.querySelector('.pseudo.error');
        const Erremail = document.querySelector('.email.error');
        const Errpassword = document.querySelector('.password.error');
        const Errcontrolpassword = document.querySelector('.controlpassword.error');
        const terms = document.getElementById('terms');

        /*controlpassword.innerHTML=""; 
        Errterms.innerHTML="";*/

        if (password !== controlpassword || !(terms.checked)) {
            if (password !== controlpassword)
                Errcontrolpassword.innerHTML = "Les mots de passe ne coreesponds pas";
            if (!terms.checked)
                Errterms.innerHTML = "Vieullez validez les conditions générales";
        } else {
            await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    pseudo,
                    email,
                    password,
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.errors) {
                        Errpseudo.innerHTML = res.data.errors.pseudo;
                        Erremail.innerHTML = res.data.errors.email;
                        Errpassword.innerHTML = res.data.errors.password;
                    }else{
                        setformSubmit(true);
                    }
                })
                .catch((err) => console.log(err));
        }

    }
    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />  
                    <span></span>
                    <h4 className='success'>Enregistrement réussi, Vieullez vous connectez</h4>
                </>
            ) : (
                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <label htmlFor='pseudo'>Pseudo</label>
                    <br />
                    <input
                        type="text"
                        name="pseudo"
                        id="pseudo"
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo}
                    />
                    <div className="pseudo error" color='red'></div>
                    <br />
                    <label htmlFor='email'>Email</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className="email error" color='red'></div>
                    <br />
                    <label htmlFor='password'>mot de passe</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="password error" color='red'></div>
                    <br />
                    <label htmlFor='controlpassword'>confirmer mot de passe</label>
                    <br />
                    <input
                        type="password"
                        name="controlpassword"
                        id="controlpassword"
                        onChange={(e) => setControlPassword(e.target.value)}
                        value={controlpassword}
                    />
                    <div className="controlpassword error" color='red'></div>
                    <br />
                    <input type="checkbox" id="terms" />
                    <label htmlFor='terms'>J'accepte les <a href="/" target="_blank"
                        rel="noopener norefrrer">conditions générales</a></label>
                    <br />
                    <div className='terms error'></div>
                    <br />
                    <input type="submit" value="valider inscription" />
                </form>

            )
            }

        </>

    )
}

export default SignUpForm