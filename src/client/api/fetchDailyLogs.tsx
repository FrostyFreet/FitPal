import axios from "axios";

export const fetchDailyLogs=async()=>{
    try{
        const response=await axios.get("/api/fetchDailyLogs")
        return response.data
    }
    catch (e) {
        console.error(e)
        return null
    }
}