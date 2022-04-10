import React from 'react'  
import { useSelector } from 'react-redux';

const Pic = (props) =>{ 
    const iduser = props.props; 
    const usersData = useSelector((state)=> state.usersReducer); 
    const usersArr = Object.keys(usersData).map((i)=> usersData[i])
    return( 
        <div>
           <ul>
                            {usersArr.map((user) => {
                                if(user._id == iduser){
                                    return (<li key={user._id}>
                                        <img src={user.picture} alt="userpic" />
                                        <h4>{user.pseudo}</h4>
                                        
                                            
                                               
    
                                        
                                    </li>)
                                    
                                }
                                
                            })}
                        </ul>
        </div>
    )
} 

export default Pic ;