import {React, useEffect} from 'react';  
import {useDispatch, useSelector} from 'react-redux'
import { useState } from 'react';  
import { getPosts } from '../actions/post.actions';  
import {isEmpty} from './utils';
import Card from './Post/Card';

const Thread = () =>{ 

    const[loadposts, setLoadposts] = useState(true); 
    const dispatch = useDispatch();   
    const [count , setCount] = useState(5);
    const posts = useSelector((state)=> state.postReducer); 
    const loadMore =() =>{
        if(window.innerHeight + document.documentElement.scrollTop + 1 > 
            document.scrollingElement.scrollHeight) {
                setLoadposts(true);
            }
    }

    useEffect (()=>{
        if(loadposts){
            dispatch(getPosts(count));
            setLoadposts(false) 
            setCount(count + 5);
        } 
        window.addEventListener('scroll', loadMore) ;
        return () => window.removeEventListener('scroll', loadMore);
    },[loadposts,dispatch,count]) 

    return(
        <div className='thread-container'>
            <ul>
                {!isEmpty(posts[0]) && (
                    posts.map((post)=>{
                        return(
                            <Card post={post} key={post._id}/>
                        )
                    })
                )}
            </ul>
        </div>
    );
}; 

export default Thread;