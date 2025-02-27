import axios from "axios";

export const fetchCaloriesBurnedByActivity=async(activity:string, duration:number)=>{
    try{
        const response=await axios.get("/api/caloriesBurnedByActivity",{
            params: { activity: activity,duration:duration },
        })
        return response.data
    }
    catch (e) {
        console.error(e)
        return null
    }
}