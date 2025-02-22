import express from 'express'
import cors from 'cors'
import {createClient} from '@supabase/supabase-js'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '../../.env'});

const app=express()
const port=3000
app.use(cors())
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
        console.error("No authenticated user found.")
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


app.listen(port,()=>console.log(`Server is listening on port ${port}`) )


