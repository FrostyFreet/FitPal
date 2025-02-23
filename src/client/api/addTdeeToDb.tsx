import axios from "axios";



export const addTdeeToDb=async(tdee:number)=>{
    try{
        const response=await axios.post("http://localhost:3000/api/insertTdee",{
            tdee:tdee
        })
        return response.data
    }
    catch (e) {
        console.error(e)
        return null
    }
}