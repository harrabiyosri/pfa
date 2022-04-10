import React, { useEffect, useState } from 'react'
import { isEmpty } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { followuser, unfollowuser } from '../../actions/user.actions'

const FollowHandler = ({ idTofollow , type }) => {
    const userData = useSelector((state) => state.userReducer)
    const [isFollowed, setIsFollowed] = useState(false)
    const dispatch = useDispatch();

    const followhandler = () => {
        dispatch(followuser(userData._id, idTofollow));
        setIsFollowed(true);
    }
    const unfollowhandler = () => {
        dispatch(unfollowuser(userData._id, idTofollow));
        setIsFollowed(false);
    }


    useEffect(() => {
        if (!isEmpty(userData.following)) { 
            /*setIsFollowed(false); 
            let use = new Array(10); 
            for(let id in userData.following){
                use.push(id);
            }
            use.map((id)=>{
                    if(idTofollow == id){
                        setIsFollowed(true)
                    }
                }
            )*/
            if (userData.following.includes(idTofollow)) {
                setIsFollowed(true);
              } else setIsFollowed(false);
            }
    }, [userData, idTofollow])
    return (
        <>
            {isFollowed && !isEmpty(userData) && (
                <span onClick={unfollowhandler}>
                    {type == "suggestion" &&<button className='unfollow-btn'>Abonné</button>}
                    {type == "card" && <img src="./img/icons/checked.svg" alt="checked" />}
                </span>
            )}
            {isFollowed === false && !isEmpty(userData) && (
                <span onClick={followhandler}> 
                    {type=="suggestion" &&<button className='follow-btn'>suivre</button>} 
                    {type=="card" && <img src="./img/icons/check.svg" alt="check" />}
                </span>
            )}
        </>
    )
}

export default FollowHandler;