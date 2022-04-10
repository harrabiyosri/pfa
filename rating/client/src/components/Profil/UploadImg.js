import React, { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {  

    const dispatch = useDispatch(); 
    const userData = useSelector((state) => state.userReducer);
    
    const [file,setFile] = useState();
    const handlepicture = (e) => {
        e.preventDefault(); 
        const data = new FormData(); 
        data.append("name", userData.pseudo); 
        data.append("userId", userData._id); 
        data.append("file", file); 
        dispatch(uploadPicture(data, file));
    }
    return (
    <form action="" onSubmit={handlepicture} className='upload-pic'>
      <label htmlFor="file">Changer d'image</label> 
      <input
       type="file" 
       id="file" 
       name="file" 
       onChange={(e)=> setFile(e.target.files[0])}
       />
      <br /> 
      <input type="submit" value="envoyer" />
    </form> 
    
    );
};  

export default UploadImg;