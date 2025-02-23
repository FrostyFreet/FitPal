import axios from "axios";
import {UserDetails} from "../types.tsx";


export const changeUserDetails=async({weight,height,gender,goal,activity_level,age}:UserDetails)=>{
    try{
        const response=await axios.post("http://localhost:3000/api/changeUserDetails",{
            weight:weight,
            height:height,
            gender:gender,
            goal:goal,
            activity_level:activity_level,
            age:age
        })
        return response.data
    }
    catch (e) {
        console.error(e)
        return null
    }
}