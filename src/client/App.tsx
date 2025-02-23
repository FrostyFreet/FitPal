import "./App.css";
import { Route, Routes } from "react-router";
import { Layout } from "./components/layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ActivityLog from "./pages/ActivityLog.tsx";
import Nutrition from "./pages/Nutrition.tsx";
import DetailedMetrics from "./pages/DetailedMetrics.tsx";
import ProfileSettings from "./pages/ProfileSettings.tsx";
import ForgotPassword from "./auth/ForgotPassword.tsx";
import Register from "./auth/Register.tsx";
import Login from "./auth/Login.tsx";
import {createContext, useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {isLoggedIn} from "./api/isLoggedIn.tsx";
import {ContextType, LoggedInData, UserDetails} from "./types.tsx";
import {fetchUserDetails} from "./api/fetchUserDetails.tsx";
import {addTdeeToDb} from "./api/addTdeeToDb.tsx";
export const IsLoggedInContext = createContext<ContextType | null>(null)

function App() {
  const [loggedIn,setLoggedIn]=useState<LoggedInData | null>(null)
  const [userDetail,setUserDetails]=useState<UserDetails | null>(null)
  const [isDetailsSuccess,setIsDetailsSuccess]=useState<boolean>(false)
  const [BMR,setBMR] = useState<number>(0);
  const [tdee,setTdee]=useState<number>()

  const { data: isLoggedInData,isSuccess  } = useQuery({
    queryKey: ["isLoggedInData"],
    queryFn: isLoggedIn,
  });

  const { data: userDetailsData,isSuccess:detailsSuccess } = useQuery({
    queryKey: ["userDetailsData"],
    queryFn: fetchUserDetails,
    enabled: loggedIn !== null,
  })

  const {mutate}=useMutation({
    mutationFn:addTdeeToDb,
    onSuccess:()=>{
      console.log("Inserted tdee")
    }
  })

  useEffect(() => {
    if (
        isSuccess &&
        isLoggedInData.session !== null &&
        isLoggedInData.session.access_token
    ) {
      setLoggedIn(isLoggedInData);
      if (detailsSuccess && userDetailsData && userDetailsData.length > 0) {
        const { weight, height, gender, age, activity_level } = userDetailsData[0];

        // Update user details state if needed
        setUserDetails(userDetailsData[0]);

        // Compute BMR directly using the fetched values
        let calculatedBmr = 0;
        if (gender === "male") {
          calculatedBmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
        } else if (gender === "female") {
          calculatedBmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
        }
        setBMR(calculatedBmr);

        // Calculate TDEE based on activity level
        let calculatedTdee = 0;
        if (calculatedBmr !== 0) {
          if (activity_level === "sedentary") {
            calculatedTdee = calculatedBmr * 1.2;
          } else if (activity_level === "ligthly_active") {
            calculatedTdee = calculatedBmr * 1.375;
          } else if (activity_level === "moderately_active") {
            calculatedTdee = calculatedBmr * 1.55;
          } else if (activity_level === "very_active") {
            calculatedTdee = calculatedBmr * 1.725;
          } else if (activity_level === "extra_active") {
            calculatedTdee = calculatedBmr * 1.9;
          }
          setTdee(calculatedTdee);

          mutate(calculatedTdee)
        }
        setIsDetailsSuccess(true);
      }
    } else {
      setLoggedIn(null);
    }
  }, [detailsSuccess, isLoggedInData, isSuccess, userDetailsData]);




  console.log(tdee)
  return (
      <IsLoggedInContext.Provider value={{loggedIn,userDetail,isDetailsSuccess}}>
        <Layout data-oid="xixv02.">
          <Routes data-oid="hbb:69h">
            <Route path="/register" element={<Register  />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>

            <Route path="/" element={<Dashboard />}/>
            <Route path="/activity" element={<ActivityLog />}/>

            <Route path="/nutrition" element={<Nutrition />}/>

            <Route path="/metrics" element={<DetailedMetrics />}/>
            <Route path="/profile" element={<ProfileSettings  />}/>
          </Routes>
        </Layout>
      </IsLoggedInContext.Provider>
  );
}

export default App;
