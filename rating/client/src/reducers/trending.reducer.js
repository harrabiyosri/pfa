import { GET_TRENDS } from "../actions/post.actions";

const intialState = {}; 

export default function trendingReducer(state = intialState , action){
    switch(action.type){
        case GET_TRENDS : 
           return action.payload 
        default : 
           return state
    }
}