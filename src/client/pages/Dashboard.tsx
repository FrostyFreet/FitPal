"use client"

import { Flame, Heart, Clock, Apple, Plus } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useContext, useState } from "react"
import { IsLoggedInContext } from "../App.tsx"

import ActivityModal from "../components/ActivityModal.tsx"
import MealModal from "../components/MealModal.tsx"
import { fetchUserDetails } from "../api/fetchUserDetails.tsx"
import { fetchDailyLogs } from "../api/fetchDailyLogs.tsx"

const metrics = [
    { icon: Flame, label: "Calorie Goal", value: "2,200", color: "text-blue-500" },
    { icon: Heart, label: "Calories Burned", value: "75", color: "text-orange-500" },
    { icon: Apple, label: "Calories Eaten", value: "2,000", color: "text-green-500" },
    { icon: Clock, label: "Workout Duration", value: "30 mins", color: "text-purple-500" },
]

export default function Dashboard() {
    const context = useContext(IsLoggedInContext)!
    const { loggedIn } = context
    const [isActivityModalOpen, setIsActivityModalOpen] = useState<boolean>(false)
    const [isMealModalOpen, setIsMealModalOpen] = useState<boolean>(false)
    const time = new Date().getHours()
    let welcome_message = ""
    if (time <= 10) {
        welcome_message = "Morning"
    }
    if (time > 10 && time < 18) {
        welcome_message = "Afternoon"
    }
    if (time >= 18 && time <=4) {
        welcome_message = "Night"
    }

    const { data: userDetailsData } = useQuery({
        queryKey: ["userDetailsData"],
        queryFn: fetchUserDetails,
        enabled: loggedIn !== null,
    })
    const { data: dailyLogs } = useQuery({
        queryKey: ["dailyLogsData"],
        queryFn: fetchDailyLogs,
        enabled: loggedIn !== null,
    })
    if (dailyLogs) {
        console.log(dailyLogs)
    }


    const caloriesEaten = loggedIn ? dailyLogs?.calories_eaten || 0 : 2000
    const calorieGoal = loggedIn ? userDetailsData?.[0]?.calorie_by_goal || 2200 : 2200
    const progressPercentage = Math.min(Math.round((caloriesEaten / calorieGoal) * 100), 100)

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-start sm:py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                            Good {welcome_message}, {userDetailsData ? userDetailsData[0].full_name : "User"}!
                        </h1>
                        <div className="mb-4">
                            <h2 className="text-lg font-medium text-gray-900 mb-2">Today's Progress</h2>
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                      Calorie Goal
                    </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-teal-600">{progressPercentage}%</span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                                    <div
                                        style={{ width: `${progressPercentage}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                            {metrics.map((metric) => (
                                <div key={metric.label} className="flex flex-col items-center">
                                    <div className={`rounded-full p-3 ${metric.color} bg-opacity-20`}>
                                        <metric.icon className={`h-8 w-8 ${metric.color}`} />
                                    </div>
                                    <div className="mt-3 text-center">
                                        <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                                        <p className="mt-1 text-xl font-semibold text-gray-900">
                                            {loggedIn
                                                ? metric.label === "Calorie Goal"
                                                    ? userDetailsData?.[0]?.calorie_by_goal || metric.value
                                                    : metric.label === "Calories Eaten"
                                                        ? dailyLogs?.calories_eaten || "0"
                                                        : metric.label === "Calories Burned"
                                                            ? dailyLogs?.calories_burned || "0"
                                                            : metric.label === "Workout Duration"
                                                                ? `${dailyLogs?.workout_duration || "0"} mins`
                                                                : metric.value
                                                : metric.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                onClick={() => setIsActivityModalOpen(true)}
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Log Activity
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                onClick={() => setIsMealModalOpen(true)}
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Log Meal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ActivityModal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)} />
            <MealModal isOpen={isMealModalOpen} onClose={() => setIsMealModalOpen(false)} />
        </div>
    )
}

