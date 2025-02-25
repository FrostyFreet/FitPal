export const calculateTDEE=(BMR:number,activity_level:string)=> {
    if (BMR === 0) return 0

    switch (activity_level) {
        case "sedentary":
            return BMR * 1.2
        case "lightly_active":
            return BMR * 1.375;
        case "moderately_active":
            return BMR * 1.55
        case "very_active":
            return BMR * 1.725
        case "extra_active":
            return BMR * 1.9
        default:
            return BMR
    }
}