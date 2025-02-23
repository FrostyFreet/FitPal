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
    weight:number
    height:number
    gender:string
    goal:string
}