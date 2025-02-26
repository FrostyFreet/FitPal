import axios from "axios";

export const fetchDailyActivity=async()=>{
    try{
        const response=await axios.get("http://localhost:3000/api/fetchDailyActivity")
        return response.data
    }
    catch (e) {
        console.error(e)
    }
}