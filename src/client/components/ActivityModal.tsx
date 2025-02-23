"use client"

import { useState } from "react"
import { X, Search } from "lucide-react"

interface ActivityModalProps {
    isOpen: boolean
    onClose: () => void
}

const activities = [
    "Running",
    "Walking",
    "Cycling",
    "Swimming",
    "Weight Training",
    "Yoga",
    "Dancing",
    "Basketball",
    "Tennis",
    "Soccer",
]

export default function ActivityModal({ isOpen, onClose }: ActivityModalProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedActivity, setSelectedActivity] = useState("")
    const [duration, setDuration] = useState("")

    const filteredActivities = activities.filter((activity) => activity.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleActivitySelect = (activity: string) => {
        setSelectedActivity(activity)
        setSearchTerm("")
    }

    const handleSubmit = () => {
        console.log(`Logged activity: ${selectedActivity}, Duration: ${duration} minutes`)
        setSelectedActivity("")
        setDuration("")
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Log Activity</h3>
                    <div className="mt-2 px-7 py-3">
                        {!selectedActivity ? (
                            <>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        placeholder="Search activities..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                                <ul className="mt-4 max-h-60 overflow-auto">
                                    {filteredActivities.map((activity, index) => (
                                        <li
                                            key={index}
                                            className="px-2 py-2 hover:bg-gray-100 cursor-pointer text-left"
                                            onClick={() => handleActivitySelect(activity)}
                                        >
                                            {activity}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-left font-medium">Selected Activity: {selectedActivity}</p>
                                <div className="text-left">
                                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                                        Duration (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        id="duration"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        min="1"
                                    />
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="w-full px-4 py-2 bg-teal-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
                                >
                                    Log Activity
                                </button>
                            </div>
                        )}
                    </div>
                    {!selectedActivity && (
                        <div className="items-center px-4 py-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
                <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600">
                    <X className="h-6 w-6" />
                </button>
            </div>
        </div>
    )
}

