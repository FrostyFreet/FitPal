import axios from "axios";
interface propsType{
    activity:string
    total_calories:number
    duration:number
}

export const insertWorkout=async({activity,total_calories,duration}:propsType)=>{
    try{
        const response=await axios.post("http://localhost:3000/api/insertDailyActivity",{
            activity:activity,
            total_calories:total_calories,
            duration:duration
        })
        return response.data
    }
    catch (e) {
        console.error(e)
    }
}