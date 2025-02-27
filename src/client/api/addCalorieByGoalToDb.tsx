import axios from "axios";



export const addCalorieByGoalToDb=async(calorie:number)=>{
    try{
        const response=await axios.post("/api/insertCalorieNeedByGoal",{
            calorie:calorie
        })
        return response.data
    }
    catch (e) {
        console.error(e)
        return null
    }
}