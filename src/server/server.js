import express from 'express'
import cors from 'cors'
import {createClient} from '@supabase/supabase-js'
import dotenv from 'dotenv';
import path from 'path';
import axios from "axios";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: '../../.env'});

const app=express()
const port = process.env.PORT || 3000;app.use(cors())

app.use(express.json());

const supabase = createClient(`${process.env.VITE_PROJECT_URL}`, `${process.env.VITE_SUPABASE_ANON_PUBLIC}`);

app.get("/api/isLoggedIn",async(req,res)=>{
    const { data, error } = await supabase.auth.getSession()
    if(error){res.send(error)}
    else {

        if (data.session !== null) {
            res.status(200).json(data)
        } else {
            res.status(200).json(data)
        }
    }
})
app.post("/api/register", async (req, res) => {
    const { email, password, full_name } = req.body

    try {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email:email,
            password:password
        })

        if (signUpError) {
            res.status(400).json({ message: "Sign-up failed", error: signUpError })
        } else {
            const userId = signUpData.user.id

            console.log("Attempting to insert user details:", userId, full_name)

            const { data: insertData, error: insertError } = await supabase.from('user_details').insert([
                {
                    supabase_user_id: userId,
                    full_name,
                },
            ])

            if (insertError) {
                console.error("Full name not inserted:", insertError)
                res.status(500).json({ message: "Internal Server Error" })
                return
            }

            console.log("User details inserted successfully.")

            res.status(201).json(signUpData)

        }
    } catch (e) {
        console.error(e)

        res.status(500).send("Internal Server Error")

    }
    console.log(req.body)
})

app.post("/api/login",async(req,res)=>{
    const{email,password}=req.body
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if(error){
        res.send(error)
    }
    else{res.status(200).json(data)}
})

app.post("/api/resetpassword",async(req,res)=>{
    const{email}=req.body
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://example.com/update-password',
    })
    if(error){
        res.send(error)
    }
    else{res.status(200).json(data)}
})
app.post("/api/logOut",async(req,res)=>{
    const { error } = await supabase.auth.signOut()
    if(error){
        res.send(error)
    }
})

app.get("/api/fetchFullName",async(req,res)=>{
    const { data: sessionData } = await supabase.auth.getSession()

    if (!sessionData || !sessionData.session || !sessionData.session.user) {
        res.status(401).send("Unauthorized")
        return
    }
    const userId = sessionData.session.user.id

    const { data,error } = await supabase
        .from('user_details')
        .select('full_name')
        .eq('supabase_user_id',userId)
    if(data){
        res.status(200).json(data)
    }
    else{
        console.error(error)
    }
})
app.post("/api/changeUserDetails",async(req,res)=>{
    const {weight,height,gender,goal,activity_level}=req.body
    try{
        const { data: sessionData } = await supabase.auth.getSession()
        if (!sessionData || !sessionData.session || !sessionData.session.user) {
            res.status(401).send("Unauthorized")
            return
        }
        const userId = sessionData.session.user.id

        const {error } = await supabase
            .from('user_details')
            .update({weight:weight,height:height,gender:gender,fitness_goal:goal,activity_level:activity_level})
            .eq("supabase_user_id",userId)
        if(error){
            console.error(error)
            res.error(error)
        }
    }
    catch (e) {
        console.error("An error occurred while updating user details",e)
    }
})
app.get("/api/fetchUserDetails",async(req,res)=>{
    try{
        const { data: sessionData } = await supabase.auth.getSession()
        if (!sessionData || !sessionData.session || !sessionData.session.user) {
            console.error("No authenticated user found.")
            res.status(401).send("Unauthorized")
            return
        }
        const userId = sessionData.session.user.id

        const {data,error } = await supabase
            .from('user_details')
            .select()
            .eq("supabase_user_id",userId)
        if(error){
            console.error(error)
            res.error(error)
        }
        else{
            res.status(200).json(data)
        }
    }
    catch (e) {
        console.error("An error occurred while updating user details",e)
    }
})

app.post("/api/insertTdee",async(req,res)=>{
    const {tdee}=req.body
    try{
        const { data: sessionData } = await supabase.auth.getSession()
        if (!sessionData || !sessionData.session || !sessionData.session.user) {
            res.status(401).send("Unauthorized")
            return
        }
        const userId = sessionData.session.user.id

        const {error } = await supabase
            .from('user_details')
            .update({tdee:tdee})
            .eq("supabase_user_id",userId)
        if(error){
            console.error(error)
            res.error(error)
        }
    }
    catch (e) {
        console.error("An error occurred while updating user details",e)
    }
})

app.post("/api/insertCalorieNeedByGoal",async(req,res)=>{
    const {calorie}=req.body
    try{
        const { data: sessionData } = await supabase.auth.getSession()
        if (!sessionData || !sessionData.session || !sessionData.session.user) {
            res.status(401).send("Unauthorized")
            return
        }
        const userId = sessionData.session.user.id

        const {error } = await supabase
            .from('user_details')
            .update({calorie_by_goal:calorie})
            .eq("supabase_user_id",userId)
        if(error){
            console.error(error)
            res.error(error)
        }
    }
    catch (e) {
        console.error("An error occurred while updating user details",e)
    }
})


app.get("/api/fetchDailyLogs",async(req,res)=>{
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData || !sessionData.session || !sessionData.session.user) {
        res.status(401).send("Unauthorized")
        return
    }
    const userId = sessionData.session.user.id
    if(sessionData){
        try{
            const {data,error}=await supabase.from('daily_logs')
                .select(`*,user_details(supabase_user_id)`)

            if(error){
                console.error("Error occurred while querying",error)
            }
            if (!data || data.length === 0) {
                return res.json({ message: "No data found" });
            }

            res.status(200).json(data);
        }
        catch (e) {
            console.error("An error occurred while fetching daily logs "+e)
        }
    }

})

app.post("/api/insertToDailyLogs",async(req,res)=>{
    const {tcc,tcb,ts,twm,notes}=req.body
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData || !sessionData.session || !sessionData.session.user) {
        res.status(401).send("Unauthorized")
        return
    }
    const userId = sessionData.session.user.id

    try{
        const{data,error}=await supabase.from('daily_logs')
            .update({
                user_id:userId,
                total_calories_consumed:tcc,
                total_calories_burned:tcb,
                total_steps:ts,
                total_workout_minutes:twm,
                notes:notes
            })
        if(error){
            console.error(error)
            res.error(error)
        }
        res.status(200).json(data)
    }
    catch (e) {
        console.error(e)
    }


})

app.get("/api/caloriesBurnedByActivity",async(req,res)=>{
    const {activity,duration}=req.query
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData || !sessionData.session || !sessionData.session.user) {
        res.status(401).send("Unauthorized")
        return
    }
    const userId = sessionData.session.user.id
    if(sessionData) {
        try {
            //retrieving user weight
            const {data:userDetails}= await supabase
                .from('user_details')
                .select('weight')
                .eq('supabase_user_id',userId)

            const userWeight = userDetails[0].weight;
            const response = await axios.get(`https://api.api-ninjas.com/v1/caloriesburned`, {
                params: {activity: activity,weight:userWeight,duration:duration},
                headers: {'X-Api-Key': process.env.VITE_API_NINJA_API_KEY}
            })

            if (response) {
                res.status(200).json(response.data)
            }

        } catch (e) {
            console.error(e)
        }
    }
})

app.post("/api/insertDailyActivity",async(req,res)=>{
    const {activity,total_calories,duration}=req.body
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData || !sessionData.session || !sessionData.session.user) {
        res.status(401).send("Unauthorized")
        return
    }
    const userId = sessionData.session.user.id
    if(sessionData) {
        try {

            const{data,error}=await supabase.from('workout_logs')
                .upsert({user_id:userId,workout_type:activity,duration_minutes:duration,calories_burned:total_calories})

            if(error){
                console.error(error)
            }
            res.status(200).json(data)


        } catch (e) {
            console.error(e)
        }
    }
})


app.get("/api/fetchDailyActivity",async(req,res)=>{
    const today = new Date().toISOString().split('T')[0];
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData || !sessionData.session || !sessionData.session.user) {
        res.status(401).send("Unauthorized")
        return
    }
    const userId = sessionData.session.user.id
    if(sessionData) {
        try {
            const{data,error}=await supabase.from('workout_logs')
                .select('*')
                .eq("user_id",userId)
                .gte('date', `${today}T00:00:00.000Z`) // Start of the day (UTC)
                .lt('date', `${today}T23:59:59.999Z`);

            if(error){
                console.error(error)
            }
            res.status(200).json(data)


        } catch (e) {
            console.error(e)
        }
    }
})

app.post("/api/fetchFoodData",async(req,res)=>{
    const {foodName,weight}=req.body
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData || !sessionData.session || !sessionData.session.user) {
        res.status(401).send("Unauthorized")
        return
    }
    const userId = sessionData.session.user.id
    if(sessionData) {
        try {
            const response=await axios.post("https://trackapi.nutritionix.com/v2/natural/nutrients",
                {
                    query:`${weight}g ${foodName}`
                },
                {
                    headers: {
                        'x-app-key': process.env.VITE_API_NINJA_API_KEY,
                        'x-app-id': process.env.VITE_NUTRITIONIX_Application_ID,
                        'x-remote-user-id': 0,
                        'Content-Type': 'application/json'
                    }
                }

            )
            const foodData = response.data.foods[0];

            if(response.data){
                const{error}=await supabase.from('meal_items')
                    .upsert([
                        {
                            user_id: userId,
                            meal_type: 'breakfast',
                            date: new Date(),
                            food_name: foodData.food_name,
                            quantity: foodData.serving_qty,
                            unit: foodData.serving_unit,
                            calories: foodData.calories,
                            protein: foodData.protein,
                            carbs: foodData.carbs,
                            fat: foodData.fat
                        }
                    ]);

                if(error){
                    console.error(error)
                }
            }



        } catch (e) {
            console.error(e)
        }
    }


})

app.listen(port,()=>console.log(`Server is listening on port ${port}`) )


