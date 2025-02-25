export const calculateCalorieNeedByGoal=(TDEE:number,goal:string)=>{
    let result=0
    if(goal==="lose_weight"){
        result=TDEE-500
    }
    else if(goal==="gain_weight"){
        result=TDEE+500
    }
    else if(goal==="maintain"){
        result=TDEE
    }
    else if(goal==="build_muscle"){
        result=TDEE+500
    }
    else{
        result=TDEE+500
    }
    return result

}