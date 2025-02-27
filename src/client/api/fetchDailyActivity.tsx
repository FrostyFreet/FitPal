import axios from "axios";

export const fetchDailyActivity=async()=>{
    try{
        const response=await axios.get("/api/fetchDailyActivity")
        return response.data
    }
    catch (e) {
        console.error(e)
    }
}