import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addcomment, getPosts } from '../../actions/post.actions';
import FollowHandler from '../Profil/FollowHandler';
import { isEmpty, timestampParser } from '../utils';
import EditDeleteComment from './EditDeleteComment';

const CardComment = ({ post }) => {

    const [text, setText] = useState("")
    const userData = useSelector((state) =>  state.userReducer )
    const usersData = useSelector((state) =>  state.usersReducer )
    const dispatch = useDispatch();

    const commentHandler = (e) => { 
        e.preventDefault(); 
        if(text){
            dispatch(addcomment(post._id , userData._id , userData.pseudo , text)) 
            .then(() => dispatch(getPosts())); 
            setText('');
        }

    }
    return (
        <div className='comments-container'>
            {post.comments.map((comment) => {
                return (
                    <div className={comment.commenterId === userData._id ? "comment-container client"
                        : "comment-container"} key={comment._id}>
                        <div className='left-part'>
                            <img src={!isEmpty(usersData[0]) &&
                                usersData.map((user) => {
                                    if (user._id === comment.commenterId) {
                                        return user.picture;
                                    } else return null
                                })
                                    .join("")
                            }
                                alt="commenter-pic" />
                        </div> 
                        <div className='right-part'>
                            <div className='comment-header'>
                                <div className='pseudo'>
                                    <h3>{comment.commenterPseudo}</h3> 
                                    {comment.commenterId !== userData._id && (
                                        <FollowHandler  
                                           idTofollow={comment.commenterId} 
                                           type = {"card"}
                                        />
                                    )}
                                </div> 
                                <span>{timestampParser(comment.timestamp)}</span>
                            </div> 
                            <p>{comment.text}</p>
                            <EditDeleteComment comment={comment} postId={post._id}/>
                        </div>
                    </div>
                )
            })} 
            {userData._id && (
                <form action="" onSubmit={commentHandler} className='comment-form'>
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)}
                    value={text} placeholder="ajouter votre commentaire" /> 
                    <br /> 
                    <input type="submit" value="Envoyer" />
                </form> 

            )}
        </div>
    )
}

export default CardComment;