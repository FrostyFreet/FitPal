export const calculateCalorieNeedByGoal=(TDEE:number,goal:string)=>{
    let result=0
    if(goal==="lose_weight"){
        result=Math.floor(TDEE-500)
    }
    else if(goal==="gain_weight"){
        result=Math.floor(TDEE+500)
    }
    else if(goal==="maintain"){
        result=Math.floor(TDEE)
    }
    else if(goal==="build_muscle"){
        result=Math.floor(TDEE+500)
    }
    else{
        result=Math.floor(TDEE+500)
    }
    return result

}