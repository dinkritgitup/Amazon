import {useContext,useEffect} from 'react'
import  {useNavigate } from "react-router-dom"
import {DataContext} from "../Header/DataProvider/DataProvider"
const ProtectedRoute =({children,msg,redirect}) =>{
    const navigate = useNavigate()
    const [{user}] = useContext(DataContext)
    
    useEffect(()=>{
         if(!user){
            navigate("/auth",{state:{msg,redirect}})
         }
    },[user,navigate,msg,redirect])




    return children;
}
export default ProtectedRoute;
