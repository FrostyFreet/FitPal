import axios from "axios";

export const insertToDailyLogs=async(date:Date,tcc:number,tcb:number,ts:number,twm:number,notes:string)=>{
    try{
        const response=await axios.post("http://localhost:3000/api/fetchDailyLogs",{
            date,tcc,tcb,ts,twm,notes
        })
        return response.data
    }
    catch (e) {
        console.error(e)
        return null
    }
}