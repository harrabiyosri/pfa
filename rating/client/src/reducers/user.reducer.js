
import { FOLLOW_USER, GET_USER, UPLOAD_BIO, UPLOAD_PICTURE, UNFOLLOW_USER, ADD_STARS} from "../actions/user.actions";

const initialState = {}; 


export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload; 
        case UPLOAD_PICTURE: 
            return {
                ...state, 
                picture: action.payload
            } 
        case UPLOAD_BIO: 
            return {
                ...state, 
                bio: action.payload
            } 
        case FOLLOW_USER: 
            return {
                ...state, 
                following: action.payload
            } 
        case UNFOLLOW_USER: 
            return {
                ...state,  
                following: state.following.filter((id)=> id !== action.payload)
            }  
        case ADD_STARS : 
            return {
                ...state, 
                nbStars : state.nbStars.push(parseInt(action.payload.nbStars))
            }
        default:
            return state;
    }
}