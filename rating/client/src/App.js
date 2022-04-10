import React, { useEffect, useState } from "react"; 
import Navigate from './components/routes/';  
import { UidContext } from "./components/AppContext";  
import axios from 'axios';
import { useDispatch } from "react-redux";
import { getuser } from "./actions/user.actions";

const App = () => {   
  const [uid,setUid] = useState(null);  
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchToken = async () => {
      await axios ({
        method:"get",
        url:`${process.env.REACT_APP_API_URL}jwtid`, 
        withCredentials:true,
      }) 
       .then((res) => { 
         console.log(res);
         setUid(res.data);
       })
       .catch((err) => console.log("No Token"));
    } 
    fetchToken();  
    if(uid) dispatch(getuser(uid))
  }, [uid , dispatch]);
  return(
    <UidContext.Provider value={uid}>
       <Navigate />
    </UidContext.Provider>
  );
};

export default App;