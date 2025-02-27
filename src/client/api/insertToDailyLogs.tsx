import axios from "axios";
interface propsType{
    tcc:number | null,
    tcb:number | null,
    ts:number | null,
    twm:number | null,
    notes:string| null
}

export const insertToDailyLogs=async({tcc,tcb,ts,twm,notes}:propsType)=>{
    try{
        const response=await axios.post("http://localhost:3000/api/fetchDailyLogs",{
            tcc,
            tcb,
            ts,
            twm,
            notes
        })
        return response.data
    }
    catch (e) {
        console.error(e)
    }
}