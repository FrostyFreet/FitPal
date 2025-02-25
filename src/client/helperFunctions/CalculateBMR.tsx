
export const calculateBMR= (gender:string,weight:number,height:number,age:number)=>{
    let calculatedBmr = 0;
    if (gender === "male") {
        calculatedBmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else if (gender === "female") {
        calculatedBmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
    }
    return calculatedBmr
}