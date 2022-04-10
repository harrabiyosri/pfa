import React from 'react'; 
import { Link } from 'react-router-dom';


const Ratinghandler = (props) =>{  
    let iduser = props.props;
    
    return( 
        <Link to = "/Rating"  
             state = {{ 
               iduser : iduser,
            }}
        >
             <button >   
                  RateME
              </button>
        </Link>
          
        
        
    ); 
};  


export default Ratinghandler;