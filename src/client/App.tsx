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
import {calculateBMR} from "./helperFunctions/CalculateBMR.tsx";
import {calculateTDEE} from "./helperFunctions/CalculateTDEE.tsx";
import {addCalorieByGoalToDb} from "./api/addCalorieByGoalToDb.tsx";
import {calculateCalorieNeedByGoal} from "./helperFunctions/CalculateCalorieNeedByGoal.tsx";
export const IsLoggedInContext = createContext<ContextType | null>(null)

function App() {
  const [loggedIn,setLoggedIn]=useState<LoggedInData | null>(null)
  const [userDetail,setUserDetails]=useState<UserDetails | null>(null)
  const [isDetailsSuccess,setIsDetailsSuccess]=useState<boolean>(false)
  const [BMR,setBMR] = useState<number>(0);
  const [,setTdee]=useState<number|undefined>()

  const { data: isLoggedInData,isSuccess  } = useQuery({
    queryKey: ["isLoggedInData"],
    queryFn: isLoggedIn,
  });

  const { data: userDetailsData,isSuccess:detailsSuccess } = useQuery({
    queryKey: ["userDetailsData"],
    queryFn: fetchUserDetails,
    enabled: loggedIn !== null,
  })

  const {mutate:TDEE}=useMutation({
    mutationFn:addTdeeToDb,
    onSuccess:()=>{
      console.log("Inserted tdee")
    }
  })
  const {mutate:CALORIE}=useMutation({
    mutationFn:addCalorieByGoalToDb,
    onSuccess:()=>{
      console.log("Inserted CALORIE")
    }
  })

  useEffect(() => {
    if (isSuccess && isLoggedInData.session !== null && isLoggedInData.session.access_token
    ) {
      setLoggedIn(isLoggedInData);
      if (detailsSuccess && userDetailsData && userDetailsData.length > 0) {
        const { weight, height, gender, age, activity_level,fitness_goal } = userDetailsData[0];
        // Update user details state if needed
        setUserDetails(userDetailsData[0]);
        const calculatedBMR=calculateBMR(gender,weight,height,age)
        const calculatedTDEE=calculateTDEE(BMR,activity_level)
        const calculatedCalorieByGoal=calculateCalorieNeedByGoal(calculatedTDEE,fitness_goal)

        setBMR(calculatedBMR)
        setTdee(calculatedTDEE)
        TDEE(calculatedTDEE)
        CALORIE(calculatedCalorieByGoal)

        setIsDetailsSuccess(true);

      }
    } else {
      setLoggedIn(null);
    }
  }, [detailsSuccess, isLoggedInData, isSuccess, userDetailsData]);

  console.log(userDetail)
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
