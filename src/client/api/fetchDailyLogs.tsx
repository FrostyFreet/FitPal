import axios from "axios";

export const fetchDailyLogs=async()=>{
    try{
        const response=await axios.get("http://localhost:3000/api/fetchDailyLogs")
        return response.data
    }
    catch (e) {
        console.error(e)
        return null
    }
}