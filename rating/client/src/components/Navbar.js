import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './log/Logout'; 
import {useSelector} from 'react-redux';
const Navbar = () => {
    const uid = useContext(UidContext); 
    const userData = useSelector((state) => state.userReducer)
    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink exact to="/" >
                        <div className='logo'>
                            <img src="./img/icon.png" alt="logo" />
                            <h3>ValuME</h3>
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <ul>
                        <li></li>
                        <li className='welcome'>
                            <NavLink exact to="/Profil">
                                <h5>Bienvenu {userData.pseudo}</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact to="/">
                                <img src="./img/icons/login.svg" alt="login" />
                            </NavLink>
                        </li>

                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;