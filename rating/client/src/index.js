import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 
import './styles/index.scss'; 
import {Provider} from 'react-redux'
import { applyMiddleware, createStore } from 'redux'; 
import {composeWithDevTools} from 'redux-devtools-extension'; 
import thunk from 'redux-thunk'; 
import logger from 'redux-logger';
import rootReducer from './reducers'
import { getusers } from './actions/users.actions';
import { getPosts } from './actions/post.actions';

const store = createStore(
  rootReducer , composeWithDevTools(applyMiddleware(thunk, logger )) 
); 

store.dispatch(getusers()); 
store.dispatch(getPosts()); 

ReactDOM.render(
  <Provider store={store}>
     <App />
  </Provider>
,    

  document.getElementById('root')
);
