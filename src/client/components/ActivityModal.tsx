import { FormEvent,useState} from "react"
import { X, Search, Plus } from "lucide-react"
import {fetchCaloriesBurnedByActivity} from "../api/fetchCaloriesBurnedByActivity.tsx";
import {useMutation} from "@tanstack/react-query";
import {insertWorkout} from "../api/insertWorkout.tsx";

interface ActivityModalProps {
    isOpen: boolean
    onClose: () => void

}

const predefinedActivities = ["Running", "Walking", "Cycling", "Swimming", "Weight Training", "Yoga", "Dancing", "Basketball", "Tennis", "Soccer",]

export default function ActivityModal({ isOpen, onClose }: ActivityModalProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedActivity, setSelectedActivity] = useState("")
    const [customActivity, setCustomActivity] = useState("")
    const [showCustomInput, setShowCustomInput] = useState(false)
    const [duration, setDuration] = useState("")

    const {mutate:workout}=useMutation({
        mutationFn:insertWorkout,
        onSuccess:()=>{
            console.log("Inserted workout")
        }
    })

    const filteredActivities = predefinedActivities.filter((activity) =>
        activity.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleActivitySelect = (activity: string) => {
        setSelectedActivity(activity)
        setCustomActivity("")
        setShowCustomInput(false)
    }

    const handleCustomActivitySelect = () => {
        setSelectedActivity("")
        setShowCustomInput(true)
    }

    const handleSubmit =async (e: FormEvent) => {
        e.preventDefault()
        const activityToLog = selectedActivity || customActivity;
        const parsedDuration = Number.parseInt(duration);

        if (activityToLog && parsedDuration > 0) {
            const resp = await fetchCaloriesBurnedByActivity(activityToLog, parsedDuration)
            if (resp) {
                workout({ activity: activityToLog, total_calories: resp[0].total_calories, duration: parsedDuration })}
            else {
                console.error("No data received from the API")
            }

            setSelectedActivity("");
            setCustomActivity("");
            setDuration("");
            setShowCustomInput(false);
            onClose();
        } else {
            alert("Please select an activity and enter a valid duration (minimum 1 minute).");
        }
    };



    if (!isOpen) return null

    return (
        <div className="fixed inset-0 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Log Activity</h3>
                    <div className="mt-2 px-7 py-3">
                        <form onSubmit={handleSubmit}>
                        {!selectedActivity && !showCustomInput ? (
                            <>
                                <div className="relative mb-4">
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
                                    <li
                                        className="px-2 py-2 hover:bg-gray-100 cursor-pointer text-left text-teal-600 font-medium"
                                        onClick={handleCustomActivitySelect}
                                    >
                                        <Plus className="inline-block h-5 w-5 mr-2" />
                                        Add custom activity
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <div className="space-y-4">
                                {showCustomInput ? (
                                    <div className="text-left">
                                        <label htmlFor="customActivity" className="block text-sm font-medium text-gray-700">
                                            Custom Activity
                                        </label>
                                        <input
                                            type="text"
                                            id="customActivity"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            value={customActivity}
                                            onChange={(e) => setCustomActivity(e.target.value)}
                                            placeholder="Enter your activity"
                                        />
                                    </div>
                                ) : (
                                    <p className="text-left font-medium">Selected Activity: {selectedActivity}</p>
                                )}
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
                                        required
                                    />
                                </div>
                                <button type={"submit"}
                                    className="w-full px-4 py-2 bg-teal-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300">
                                    Log Activity
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedActivity("")
                                        setCustomActivity("")
                                        setShowCustomInput(false)
                                    }}
                                    className="w-full px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                >
                                    Back to Activities
                                </button>
                            </div>
                        )}
                        </form>
                    </div>
                </div>
                <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600">
                    <X className="h-6 w-6" />
                </button>
            </div>
        </div>
    )
}

