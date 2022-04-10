import React, { useContext, useEffect, useState } from 'react';
import LeftNav from '../routes/LeftNav';
import { useDispatch, useSelector } from 'react-redux';
import UploadImg from './UploadImg';
import { uploadBio } from '../../actions/user.actions';
import { dateParser, isEmpty } from '../utils';
import FollowHandler from './FollowHandler';
import Ratinghandler from './Ratinghandler';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Evaluation from '../../pages/Evaluation'; 
import { UidContext } from '../AppContext';


const UpdateProfil = () => {
    const [bio, setBio] = useState('');
    const [updateform, setUpdateform] = useState(false);  
    const [search , setSearch] = useState('');
    const [sort , setSort] = useState([]);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer); 
    const usersArr = Object.keys(usersData).map((i)=> usersData[i]);
    const dispatch = useDispatch();
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);
    const [approximite, setapproximite] = useState(false); 
    const [employe , setEmploye] = useState(false);
    const error = useSelector((state) => state.errorReducer.userError); 
    const uid = useContext(UidContext);  

    useEffect(()=>{ 
        if(!isEmpty(usersArr[0])){
            let sorted = usersArr.sort((a , b) =>{
                return(b.sommeStars - a.sommeStars);
            }) 
            sorted.length = 4;
            setSort(sorted);
        } 

    },[usersData]);

    const handleUpdate = () => {
        dispatch(uploadBio(userData._id, bio));
        setUpdateform(false);
    }

    const location = (e) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position)
            userData.latitude = position.coords.latitude;
            userData.longitude = position.coords.longitude;
            console.log(userData.latitude);
        });


    }
    return (
        <div className='profil-container'>
            <LeftNav />
            <h1>Profile de {userData.pseudo}</h1>
            <div className='update-container'>
                <div className='left-part'>
                    <h3>photo de profile</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg />
                    <p>{error.format}</p>
                    <p>{error.maxSize}</p>
                </div>
                <div className='right-part'>
                    <div className='bio-update'>
                        <h3>BIO</h3>
                        {updateform == false && (
                            <>
                                <p onClick={() => setUpdateform(!updateform)}>{userData.bio}</p>
                                <button onClick={() => setUpdateform(!updateform)}>changer bio</button>
                            </>
                        )}
                        {updateform && (
                            <>
                                <textarea
                                    type="text"
                                    defaultValue={userData.bio}
                                    onChange={(e) => setBio(e.target.value)}>
                                </textarea>
                                <button onClick={handleUpdate}>Valider modification</button>
                            </>
                        )}
                    </div>
                    <h4>Memebre depuis le : {dateParser(userData.createdAt)}</h4>
                    <h5 onClick={() => setFollowingPopup(true)}> Abonnements : {userData.following ? userData.following.length : ""}</h5>
                    <h5 onClick={() => setFollowersPopup(true)}> Abonnées : {userData.followers ? userData.followers.length : ""}</h5>
                    {uid == "62307214f950278dd5f93cbe" && (
                        <>
                            <div className='btn'>
                                <button onClick={() => setEmploye(true)}>
                                    Employe du mois
                                </button>
                            </div>
                        </>
                    )

                    }  
                    {employe && (
                        <> 
                          <div className='popup-profil-container'> 
                             <div className='modal'>
                                 <h3>Employée du Mois</h3> 
                                 <span className='cross' onClick={()=> setEmploye(false)}>&#10005;</span> 
                                 {!isEmpty(sort[0]) && (
                                     <> 
                                     <ul>
                                         { sort.map((user) =>{
                                             return(<li key={user._id}> 
                                                <img src={user.picture}/> 
                                                <h4>{user.pseudo}</h4> 
                                                <h4>{(user.sommeStars)} <div className='fas fa-star'></div></h4>
                                             </li>)
                                         })

                                         }
                                     </ul>
                                     </>
                                 )}
                             </div>
                          </div>
                        </>
                    )}

                </div>
            </div>
            <div className='container'>
                <button onClick={() => setapproximite(true)}>compte approximités</button>
            </div>
            {approximite && (
                <div className='popup-profil-container'>
                    <div className='modal'>
                        <h3>Compte approximité</h3>  
                        
                        <input  type="text" placeholder = "Search..." onChange={(e)=> setSearch(e.target.value)} /> 
                        
                        <span className='cross' onClick={() => setapproximite(false)}>&#10005;</span>
                        <ul>
                            {usersData.filter((user)=>{
                                if(user == ''){
                                    return user;
                                }else if(user.pseudo.toLowerCase().includes(search.toLowerCase())){
                                    return user;
                                }
                            }).map((user) => {
                                return (<li key={user._id}>
                                    <img src={user.picture} alt="userpic" />
                                    <h4>{user.pseudo}</h4>
                                    <div className='rating-handler'>

                                        <Ratinghandler props={user._id} />

                                    </div>
                                </li>)
                                
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {followingPopup && (
                <div className='popup-profil-container'>
                    <div className='modal'>
                        <h3>Abonnements</h3>
                        <span className='cross' onClick={() => setFollowingPopup(false)}>&#10005;</span>
                        <ul>
                            {usersData.map((user) => {
                                for (let i = 0; i < userData.following.length; i++) {
                                    if (user._id == userData.following[i]) {
                                        return (<li key={user._id}>
                                            <img src={user.picture} alt="user-pic" />
                                            <h4>{user.pseudo}</h4>
                                            <div className='follow-handler'>
                                                <FollowHandler idTofollow={user._id} type={"suggestion"} />
                                            </div>
                                        </li>)

                                    }

                                }
                                return null;

                            })}
                        </ul>
                    </div>
                </div>
            )}
            {followersPopup && (
                <div className='popup-profil-container'>
                    <div className='modal'>
                        <h3>Abonnées</h3>
                        <span className='cross' onClick={() => setFollowersPopup(false)}>&#10005;</span>
                        <ul>
                            {usersData.map((user) => {
                                for (let i = 0; i < userData.followers.length; i++) {
                                    if (user._id === userData.followers[i]) {
                                        return (<li key={user._id}>
                                            <img src={user.picture} alt="user-pic" />
                                            <h4>{user.pseudo}</h4>
                                            <div className='follow-handler'>
                                                <FollowHandler idTofollow={user._id} type={"suggestion"} />
                                            </div>
                                        </li>)

                                    }
                                }
                                return null;

                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProfil;