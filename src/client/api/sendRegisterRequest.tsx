import axios from "axios";

interface registerType{
    email:string,
    password:string,
    full_name:string
}
export const sendRegisterRequest=async({email,password,full_name}:registerType)=>{
    try{
        const response=await axios.post("http://localhost:3000/api/register",{
            email:email,
            password:password,
            full_name:full_name
        })
        return response.data
    }
    catch (e){
        console.error(e)
    }
}