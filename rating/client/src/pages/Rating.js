import React from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ajoutStars } from '../actions/user.actions';

const Rating = () => { 

    const dispatch = useDispatch(); 
    const userData = useSelector((state)=> state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const usersArr = Object.keys(usersData).map((i) => usersData[i])
    const location = useLocation();
    const iduser = location.state.iduser;
    console.log(iduser);
    const display = () => { 

        let i = 0;
        if (document.getElementById('rate-1').checked) {
            i += 1;
        }
        if (document.getElementById('rate-2').checked) {
            i += 2;
        }
        if (document.getElementById('rate-3').checked) {
            i += 3;
        }
        if (document.getElementById('rate-4').checked) {
            i += 4;
        }
        if (document.getElementById('rate-5').checked) {
            i += 5;
        }
        console.log(i);

        if (i > 0) {
            dispatch(ajoutStars(iduser, i))
        }
    }
    return (
        <div className='Rating'>
            <div className='img-container'>


                {usersArr.map((user) => {
                    if (user._id == iduser) {
                        return (
                            <>
                                <div className='img'>
                                    <img src={user.picture} alt="userpic" />
                                </div>

                                <h2>{user.pseudo}</h2>
                            </>

                        )

                    }

                })}
            </div>
            <section id="rating">
                <div className='rating-heading'>


                    <span>Pour avoir un meilleure environnement </span>
                    <h1>VOTRE EVALUATION EST IMPORTANTE POUR NOUS</h1>
                </div>
            </section>
            <div className='container'>
                <div className="star-widget">
                    <input type="radio" name="rate" id="rate-5" />
                    <label htmlFor="rate-5" className="fas fa-star"></label>
                    <input type="radio" name="rate" id="rate-4" />
                    <label htmlFor="rate-4" className="fas fa-star"></label>
                    <input type="radio" name="rate" id="rate-3" />
                    <label htmlFor="rate-3" className="fas fa-star"></label>
                    <input type="radio" name="rate" id="rate-2" />
                    <label htmlFor="rate-2" className="fas fa-star"></label>
                    <input type="radio" name="rate" id="rate-1" />
                    <label htmlFor="rate-1" className="fas fa-star"></label>
                </div> 
                <div className='btn'>
                    <button onClick={display}>
                        Donner STARS
                    </button>
                </div>
            </div>

        </div>


    )
}

export default Rating;