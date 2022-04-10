import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addpost, getPosts } from '../../actions/post.actions';
import { isEmpty, timestampParser } from '../utils';  


const NewPostFrom = () => {
    const [isloading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postpicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState("");
    const [file, setFile] = useState("");
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();  
    const error = useSelector((state)=> state.errorReducer.postError);

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0])); 
        setFile(e.target.files[0]); 
        setVideo('');
    }

    const handlePost =  () => {
        if(message || postpicture || video){
           const data = new FormData(); 
           data.append("posterId", userData._id);  
           data.append("message", message);  
           if(file) data.append("file", file); 
           data.append("video", video);  

           dispatch(addpost(data)); 
           dispatch(getPosts());  
           cancelPost();
        }else {
            alert("Veuillez entrer un message!!")
        } 

    }

    const cancelPost = () => {
        setMessage("");
        setPostPicture("");
        setVideo("");
        setFile("");
    } 

    const handlevideo = () =>{
        let findlink = message.split(" ");  
        console.log(findlink);
        for(let i = 0 ; i < findlink.length ; i++){
            if(findlink[i].includes('https://www.yout') || findlink[i].includes('https://ww.yout')){
                let embed = findlink[i].replace("watch?v=" , "embed/"); 
                setVideo(embed.split("&")[0]);  
                findlink.splice(i, 1); 
                setMessage(findlink.join(" ")); 
                setPostPicture('');
            }
        }
    }

    useEffect(() => {
        if (!isEmpty(userData)) {
            setIsLoading(false);
        } 
        handlevideo();
    }, [userData , message , video])
    return (
        <div className='post-container'>
            {isloading ? (
                <i className='fas fa-spinner fa-pulse'></i>
            ) : (
                <>
                    <div className='data'>
                        <p><span>{userData.following ? userData.following.length : 0}
                        </span> {" "} Abonnement{userData.following && userData.following.length > 1
                            ? "s" : null}
                        </p>
                        <p><span>{userData.followers ? userData.followers.length : 0}
                        </span> {" "} Abonné{userData.following && userData.following.length > 1
                            ? "s" : null}
                        </p>
                    </div>
                    <NavLink exact to="/profil">
                        <div className='user-info'>
                            <img src={userData.picture} alt="user-img" />
                        </div>
                    </NavLink>
                    <div className='post-form'>
                        <textarea
                            name="message"
                            id="message"
                            placeholder='Quoi de neuf?'
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        {message || postpicture || video.length > 20 ? (
                            <li className='card-container'>
                                <div className='card-left'>
                                    <img src={userData.picture} alt="user-pic" />
                                </div>
                                <div className='card-right'>
                                    <div className='card-header'>
                                        <div className='pseudo'>
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>{timestampParser(Date.now())}</span>
                                    </div> 
                                    <div className='content'>
                                        <p>{message}</p> 
                                        <img src={postpicture} alt ="" /> 
                                        {video && (
                                            <iframe
                                            height="300" 
                                            width="500" 
                                            src={video} 
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write ; encrypted-media;
                                            gyroscope ; picture-in-picture"
                                            allowFullScreen
                                            title={video}
                                          ></iframe>
                                        )}
                                    </div>

                                </div>
                            </li>
                        ) : null}

                        <div className='footer-form'>
                            <div className='icon'>
                                {isEmpty(video) && (
                                    <>
                                        <img src="./img/icons/picture.svg" alt="img" />
                                        <input
                                            type="file"
                                            id="file-upload"
                                            accept=".jpg , .jpeg , .png"
                                            onChange={(e) => handlePicture(e)} />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo("")}>Supprimer video</button>
                                )}
                            </div> 
                            {!isEmpty(error.format) && <p>{error.format}</p>}  
                            {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>} 

                            <div className='btn-send'>
                                {message || postpicture || video.length > 20 ? (
                                    <button className='cancel' onClick={cancelPost}>Annuler message</button>
                                ) : null}

                                <button className='send' onClick={handlePost}>Envoyer</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )

}

export default NewPostFrom;