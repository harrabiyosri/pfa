import React, { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';
import { isEmpty } from '../utils';
import FollowHandler from './FollowHandler';

const FriendsHint = () => { 

    const [isloading , setIsLoading] = useState(true); 
    const [playOnce , setPlayOnce] = useState(true); 
    const [friendshint , setFriendsHint] = useState([]); 
    const userData = useSelector((state)=> state.userReducer); 
    const usersData = useSelector((state)=> state.usersReducer); 

    

    useEffect(()=>{ 
        const notFriendList = () =>{ 
            let Array = []; 
            usersData.map((user)=>{
                if(user._id !== userData._id && !(user.followers.includes(userData._id))){
                    return Array.push(user._id);
                }
            })  
            Array.sort(()=> 0.5 - Math.random()); 
            if(window.innerHeight > 780){
                Array.length = 5;
            } else if(window.innerHeight > 720){
                Array.length = 4
            } else if(window.innerHeight > 615){
                Array.length = 3 
            }else if(window.innerHeight > 540){
                    Array.length = 1
            }else {
                Array.length = 0 
            }
            setFriendsHint(Array);
    
        } 

        if(playOnce && usersData && userData._id){
           notFriendList(); 
           setPlayOnce(false); 
           setIsLoading(false); 

        }
    },[userData , usersData , playOnce])

    return(
        <div className='get-friends-container'>
           <h4>Suggestions</h4> 
           {isloading ? (
               <div className='icon'>
                   <i className='fas fa-spinner fa-pulse'></i>
               </div>
           ) : (
               <ul>
                   {friendshint && friendshint.map((userId)=>{
                       for(let i = 0 ; i< usersData.length ; i++){
                           if(userId === usersData[i]._id){
                               return (
                                   <li className='user-hint' key={userId}>
                                       <img src={usersData[i].picture} alt="user-pic"/> 
                                       <p>{usersData[i].pseudo}</p> 
                                       <FollowHandler idTofollow={usersData[i]._id} type={"suggestion"}/>
                                   </li>
                               )
                           }
                       }
                   })}
               </ul>
           )}
        </div>
    )
} 

export default FriendsHint ; 