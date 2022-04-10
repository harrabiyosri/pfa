import { React, Component, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ajoutStars } from '../actions/user.actions';
import { useLocation, useNavigate, useParams } from 'react-router';  
import Pic from '../components/Profil/Pic';



const Evaluation = () => {

    const userData = useSelector((state) => state.userReducer)
    const usersData = useSelector((state) => state.usersReducer); 
    const usersArr = Object.keys(usersData).map((i)=> usersData[i])
    const location = useLocation();
    const iduser = location.state.iduser;
    console.log(iduser);
    const [user, setUser] = useState(true);
    const dispatch = useDispatch();

    const post = document.querySelector(".post");
    const widget = document.querySelector(".star-widget");
    const editBtn = document.querySelector(".edit");



    const display = (e) => {

        e.preventDefault();
        e.stopPropagation()
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

        widget.style.display = "none";
        post.style.display = "block";
        editBtn.onclick = () => {
            widget.style.display = "block";
            post.style.display = "none";
        }


    }
    return (




        <div className='rate'> 
           <div className='img-container'>
           <ul>
                            { user  && (
                                 usersArr.map((user) => {
                                    if(user._id == iduser){
                                        return (
                                            <Pic props={iduser}/>
                                        )
                                    }
                                    }
                                )
                            )}
                            
                            
                                
                </ul>
           </div>
            
            <section id="rating">
                <div className='rating-heading'>
                

                    <span>Pour avoir un meilleure environnement </span>
                    <h1>VOTRE EVALUATION EST IMPORTANTE POUR NOUS</h1>
                </div>
            </section>
            <div className="container">
                <div className="post">
                    <div className="text">Merci pour donner votre évaluation!</div>
                    <div className="edit">Ajouter STAR</div>
                </div>
                <div className="star-widget"> 
                <div>
                    
                </div>
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
                    <form action="#" onSubmit={display}>
                        <div className="textarea">
                            <textarea cols="30"></textarea>
                        </div>
                        <div className='btn'>
                            <button type="submit">POST </button>
                        </div>


                    </form>
                    <div />
                </div>

            </div>
        </div>


    );
};

export default Evaluation