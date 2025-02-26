"use client"

import {useContext, useState} from "react"
import { Link } from "react-router"
import { ArrowLeft, Plus } from "lucide-react"
import ActivityModal from "../components/ActivityModal"
import {fetchDailyActivity} from "../api/fetchDailyActivity.tsx";
import {useQuery} from "@tanstack/react-query";
import {IsLoggedInContext} from "../App.tsx";

const activities = [
  { type: "Running", duration: "30 mins", calories: 300 },
  { type: "Cycling", duration: "45 mins", calories: 400 },
  { type: "Walking", duration: "60 mins", calories: 200 },
]

interface workOutType{
    id:number,
    duration_minutes:number,
    workout_type:string,
    calories_burned:number
}

export default function ActivityLog() {
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)
    const context=useContext(IsLoggedInContext)!
    const {loggedIn}=context
    const {data:workOutData}=useQuery({
        queryKey:["dailyActivity"],
        queryFn:fetchDailyActivity,
        enabled:loggedIn !== null,
    })

    console.log(workOutData)

  return (
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <Link to="/" className="mr-4">
              <ArrowLeft className="h-6 w-6 text-gray-400" />
            </Link>
            <h2 className="text-2xl font-semibold text-gray-900">Activity Log</h2>
          </div>
          <button
              onClick={() => setIsActivityModalOpen(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full sm:w-auto"
          >
            <Plus className="h-5 w-5 mr-2" /> Add New Activity
          </button>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          <button className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
            All
          </button>
          <button className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
            Running
          </button>
          <button className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
            Walking
          </button>
          <button className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
            Cycling
          </button>
        </div>
        <div className="space-y-4">

          {!workOutData?
              activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-lg font-medium text-gray-900">{activity.type}</h3>
                    <p className="text-sm text-gray-500">Duration: {activity.duration}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-lg font-medium text-gray-900">{activity.calories} cal</p>
                    <p className="text-sm text-gray-500">burned</p>
                  </div>
                </div>
              </div>
          ))
          :
              workOutData.map((activity:workOutType) => (
                  <div key={activity.id} className="bg-white rounded-lg shadow p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div className="mb-2 sm:mb-0">
                              <h3 className="text-lg font-medium text-gray-900">{activity.workout_type}</h3>
                              <p className="text-sm text-gray-500">Duration: {activity.duration_minutes}</p>
                          </div>
                          <div className="text-left sm:text-right">
                              <p className="text-lg font-medium text-gray-900">{activity.calories_burned} cal</p>
                              <p className="text-sm text-gray-500">burned</p>
                          </div>
                      </div>
                  </div>
              ))

          }
        </div>
        <ActivityModal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)} />
      </div>
  )
}

