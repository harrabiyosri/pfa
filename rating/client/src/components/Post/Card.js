import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../utils'; 
import FollowHandler from '../Profil/FollowHandler';
import LikeButton from './LikeButton';
import { updatepost } from '../../actions/post.actions';
import DeleteCard from './DeleteCard';
import CardComment from './CardComments';

const Card = ({ post }) => {

    const [isloading, setIsloading] = useState(true); 
    const [isupdated, setIsUpdated] = useState(false);  
    const [showcomment , setShowComment] = useState(false);
    const [textUpdate , setTextUpdate] = useState(null);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);  
    const dispatch = useDispatch();

    const updateItem =  () =>{
        if(textUpdate){
           dispatch(updatepost(post._id , textUpdate)); 
        } 
        setIsUpdated(false);
    }
    useEffect(() => {
        !isEmpty(usersData[0]) && setIsloading(false);
    }, [usersData]);

    return (
        <li className='card-container' key={post._id}>
            {isloading ? (
                <i className='fas fa-spinner fa-spin'></i>
            ) : (
                <>
                    <div className='card-left'>
                        <img
                            src={
                                !isEmpty(usersData[0]) &&
                                usersData.map((user) => {
                                    if (user._id == post.posterId) {
                                        return user.picture
                                    } 
                                    else return null;
                                })
                                    .join("")
                            } 
                            alt="userpic"
                        />
                    </div> 
                    <div className='card-right'>
                        <div className='card-header'>
                            <div className='pseudo'>
                                <h3>
                                   { 
                                      !isEmpty(usersData[0]) && 
                                      usersData.map((user) =>{
                                          if(user._id == post.posterId){
                                              return user.pseudo
                                          } 
                                          else return null ; 
                                      }) 
                                      .join('')
                                   } 
                                </h3> 
                                {post.posterId !== userData._id && (
                                   <FollowHandler idTofollow={post.posterId} type={"card"}/> 
                                )}
                                
                            </div> 
                            <span>{dateParser(post.createdAt)}</span>
                        </div> 
                        {isupdated === false && <p>{post.message}</p> } 
                        {isupdated && (
                            <div className='update-post'>
                                <textarea  
                                   defaultValue={post.message}  
                                   onChange ={(e) => setTextUpdate(e.target.value)}
                                /> 
                                <div className='button-container'>
                                    <button className='btn' onClick={updateItem}>
                                        Valider modification
                                    </button>
                                </div>
                            </div>
                        )}
                        {post.picture && (
                            <img src={post.picture} alt="card-pic" className='card-pic' />
                        )} 
                        {post.video && (
                            <iframe
                              height="300" 
                              width="500" 
                              src={post.video} 
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write ; encrypted-media;
                              gyroscope ; picture-in-picture"
                              allowFullScreen
                              title={post._id}
                            ></iframe>
                        )}  
                        {userData._id === post.posterId && (
                            <div className='button-container'>
                                <div onClick = {() => setIsUpdated(!isupdated)}>
                                    <img src="./img/icons/edit.svg" alt="edit"/>
                                </div> 
                                <DeleteCard id={post._id} />
                            </div>
                        )}
                        <div className='card-footer'>
                            <div className='comment-icon'>
                                <img onClick ={()=> setShowComment(!showcomment)}
                                 src="./img/icons/message1.svg" alt="comment" /> 
                                <span>{post.comments.length}</span>
                            </div> 
                            <LikeButton post={post}/>
                            <img src="./img/icons/share.svg" alt="share" />
                        </div> 
                        {showcomment && <CardComment post={post}/>}
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;