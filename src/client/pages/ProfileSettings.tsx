import { ArrowLeft, User } from "lucide-react";
import {Link, useNavigate} from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sendLogOutRequest } from "../api/sendLogOutRequest.tsx";

import { fetchFullName } from "../api/fetchFullName.tsx";
import {FormEvent, useContext, useEffect, useState} from "react";
import {IsLoggedInContext} from "../App.tsx";
import {FullName, UserDetails} from "../types.tsx";
import {changeUserDetails} from "../api/changeUserDetails.tsx";
import {fetchUserDetails} from "../api/fetchUserDetails.tsx";

export default function ProfileSettings() {
  const navigate=useNavigate()
  const [userDetails, setUserDetails] = useState<UserDetails>({
    weight: 0,
    height: 0,
    gender: '',
    goal: ''
  });
  const [notifications, setNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const loggedIn=useContext(IsLoggedInContext)!

  useEffect(() => {
    if(loggedIn && loggedIn===null){
      navigate("/login")
    }
  });

  const { mutate: logOut } = useMutation({
    mutationFn: sendLogOutRequest,
    onSuccess: () => {
      console.log("Logged Out")
    },
    onError: (error) => {
      console.error("Logout error:", error)
      alert("Logout failed. Please try again.")
    },
  })
  const {mutate:updateUser}=useMutation({
    mutationFn:changeUserDetails
  })

  const { data: fullName } = useQuery({
    queryKey: ["userFullName"],
    queryFn: fetchFullName,
    enabled:loggedIn!==null
  })
  const { data: userDetailsData } = useQuery({
    queryKey: ["userDetailsData"],
    queryFn: fetchUserDetails,
    enabled:loggedIn!==null
  })
  console.log(userDetailsData)
  const handleLogout = () => {
    logOut()
    navigate("/login")
    window.location.reload()
  }

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    updateUser(userDetails)
  }
  return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-400" />
          </Link>
          <h2 className="text-4xl font-semibold text-gray-900">Profile & Settings</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
              <User className="h-12 w-12 text-gray-600" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-medium text-gray-900">{fullName? fullName.map((i:FullName)=>i.full_name) :"John Doe"}</h3>
              <p className="text-gray-500">{loggedIn? loggedIn.session.user.email : "example@gmail.com"}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500">
                {fullName? fullName.map((i:FullName)=>i.full_name) :"John Doe"}
              </p>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500">
                {loggedIn? loggedIn.session.user.email : "example@gmail.com"}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <input
                    type="number"
                    id="weight"
                    name={"weight"}
                    value={userDetailsData? userDetailsData.map((i:UserDetails)=>i.weight): userDetails.weight}
                    onChange={(e) => setUserDetails((prev:UserDetails)=>({...prev,[e.target.name]:e.target.value}))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                  Height (cm)
                </label>
                <input
                    type="number"
                    id="height"
                    name={"height"}
                    value={userDetailsData? userDetailsData.map((i:UserDetails)=>i.height): userDetails.weight}
                    onChange={(e) => setUserDetails((prev:UserDetails)=>({...prev,[e.target.name]:e.target.value}))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sex</label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                      type="radio"
                      name="gender"
                      value={userDetailsData? userDetailsData[0].gender : userDetails.gender === "male"}
                      checked={userDetailsData? userDetailsData[0].gender==="male" : userDetails.gender=== "male"}
                      onChange={(e) => setUserDetails((prev:UserDetails)=>({...prev,[e.target.name]:e.target.value}))}
                      className="form-radio text-teal-600"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                      type="radio"
                      name="gender"
                      value={userDetailsData? userDetailsData[0].gender : userDetails.gender === "female"}
                      checked={userDetailsData? userDetailsData[0].gender==="female" : userDetails.gender === "female"}
                      onChange={(e) => setUserDetails((prev:UserDetails)=>({...prev,[e.target.name]:e.target.value}))}
                      className="form-radio text-teal-600"
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                      type="radio"
                      name="gender"
                      value={userDetailsData? userDetailsData[0].gender : userDetails.gender === "other"}
                      checked={userDetailsData? userDetailsData[0].gender==="other" : userDetails.gender === "other"}
                      onChange={(e) => setUserDetails((prev:UserDetails)=>({...prev,[e.target.name]:e.target.value}))}
                      className="form-radio text-teal-600"
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700">
                Fitness Goal
              </label>
              <select
                  id="fitnessGoal"
                  name={"goal"}
                  value={userDetailsData ? userDetailsData[0].fitness_goal : userDetails.goal || ""}
                  onChange={(e) => setUserDetails((prev: UserDetails) => ({...prev, [e.target.name]: e.target.value}))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              >
                <option value="">Select a goal</option>
                <option value="lose_weight">Lose Weight</option>
                <option value="gain_weight">Gain Weight</option>
                <option value="maintain">Maintain Weight</option>
                <option value="build_muscle">Build Muscle</option>
                <option value="improve_endurance">Improve Endurance</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Enable Notifications</span>
              <button
                  type="button"
                  onClick={() => setNotifications(!notifications)}
                  className={`${
                      notifications ? "bg-teal-600" : "bg-gray-200"
                  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
              >
              <span
                  className={`${
                      notifications ? "translate-x-5" : "translate-x-0"
                  } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
              />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Dark Mode</span>
              <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className={`${
                      darkMode ? "bg-teal-600" : "bg-gray-200"
                  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
              >
              <span
                  className={`${darkMode ? "translate-x-5" : "translate-x-0"
                  } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
              />
              </button>
            </div>
            <button type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </form>
          <button className="w-full mt-4 border border-red-500 text-red-500 hover:bg-red-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
  )
}
