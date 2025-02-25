export interface LoggedInData {
    session: {
        access_token: string |null
        user:{
            email:string|null
        }
    }

}

export interface FullName{
    full_name:string | null
}

export interface UserDetails{
    full_name?:string
    weight:number
    height:number
    gender:string
    goal:string
    activity_level:string
    age:number
    tdee?:number | undefined | null
    calorie_by_goal?:number
    id?:number
    supabase_user_id?:number
}

export interface ContextType{
    loggedIn:LoggedInData | null | undefined
    userDetail:UserDetails | null | undefined
    isDetailsSuccess:boolean | null
}