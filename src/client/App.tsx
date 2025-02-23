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
import {useQuery} from "@tanstack/react-query";
import {isLoggedIn} from "./api/isLoggedIn.tsx";
import {LoggedInData} from "./types.tsx";

export const IsLoggedInContext = createContext<LoggedInData | null>(null)

function App() {
  const [loggedIn,setLoggedIn]=useState(null)

  const { data: isLoggedInData,isSuccess  } = useQuery({
    queryKey: ["isLoggedInData"],
    queryFn: isLoggedIn,
  });
  useEffect(() => {
    if(isSuccess && isLoggedInData.session!==null && isLoggedInData.session.access_token){
      setLoggedIn(isLoggedInData)
    }
    else{
      setLoggedIn(null)
    }
  }, [isSuccess]);

  console.log(loggedIn)

  return (
      <IsLoggedInContext.Provider value={loggedIn}>
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
