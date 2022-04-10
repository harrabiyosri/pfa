import React, { useContext } from 'react'; 
import { UidContext } from '../components/AppContext';
import NewPostFrom from '../components/Post/NewPostForm';
import LeftNav from '../components/routes/LeftNav';
import Thread from '../components/Thread';   
import Log from '../components/log'; 
import Trends from '../components/Trends';
import FriendsHint from '../components/Profil/FriendsHint';
 

const Home = () => {   
    const uid = useContext(UidContext)
    
    return(
        <div className='Home'>
            <LeftNav /> 
            <div className='main'> 
                <div className='home-header'>
                   {uid ? <NewPostFrom /> : <Log signin={true} signup={false} />}
                </div>
                <Thread />
            </div> 
            <div className='right-side'>
                <div className='right-side-container'>
                    <div className='wrapper'>
                        <Trends /> 
                        { uid && <FriendsHint />}
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default Home;
