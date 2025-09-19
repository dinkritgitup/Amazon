
import Routing from './Router';
import React, {useEffect,useContext} from 'react';
import { DataContext } from './Components/Header/DataProvider/DataProvider';
import {Type} from "./Utility/action.type"
import {auth} from './Utility/firebase'

function App() {
   
    const[{user},dispatch]= useContext(DataContext)
      useEffect(() => {
        auth.onAuthStateChanged((authUser)=>{
          if(authUser){
            // console.log(authUser);
            dispatch({
              type:Type.SET_USER,
              user:authUser
            })
          }else{
            dispatch({
              type: Type.SET_USER,
              user: null,
            });
          }
        })
      }, []); 
   
 return <Routing />;
}

export default App;
