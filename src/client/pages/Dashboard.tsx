import { Footprints, Flame, Heart, Clock, Moon, Apple } from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {fetchFullName} from "../api/fetchFullName.tsx";
import {useContext, useState} from "react";
import {IsLoggedInContext} from "../App.tsx";
import {FullName} from "../types.tsx";
import ActivityModal from "../components/ActivityModal.tsx";
import MealModal from "../components/MealModal.tsx";

const default_metrics = [
  { icon: Footprints, label: "Steps", value: "8,500" },
  { icon: Flame, label: "Calorie Goal", value: "2,200" },
  { icon: Heart, label: "Heart Rate", value: "75 bpm" },
  { icon: Clock, label: "Workout Duration", value: "30 mins" },
  { icon: Moon, label: "Sleep", value: "7 hrs" },
  { icon: Apple, label: "Calories Eaten", value: "2,000 cals" },
];

export default function Dashboard() {
    const loggedIn=useContext(IsLoggedInContext)!
    const [isActivityModalOpen, setIsActivityModalOpen] = useState<boolean>(false)
    const [isMealModalOpen, setIsMealModalOpen] = useState<boolean>(false)
    const { data: fullName } = useQuery({
        queryKey: ["userFullName"],
        queryFn: fetchFullName,
        enabled:loggedIn!==null
    })
    const time=new Date().getHours()
    let welcome_message=""
    if(time<=10){welcome_message="Morning"}
    if(time>10 && time <18){welcome_message="Afternoon"}
    if(time>18){welcome_message="Night"}



  return (
    <div className="max-w-7xl mx-auto">

      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Good {welcome_message}, {fullName ? fullName.map((i:FullName)=>i.full_name): "User"}!
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {default_metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center" data-oid="027ptj8">
              <metric.icon className="h-8 w-8 text-teal-500 mr-3"/>
              <div >
                <p className="text-sm font-medium text-gray-500">
                  {metric.label}
                </p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {metric.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
            onClick={()=>setIsActivityModalOpen(true)}
        >
          Log Activity
        </button>
        <button className="border border-teal-500 text-teal-500 hover:bg-teal-50 font-bold py-2 px-4 rounded w-full sm:w-auto"
                onClick={()=>setIsMealModalOpen(true)}

        >
          Log Meal
        </button>
      </div>
        <ActivityModal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)} />
        <MealModal isOpen={isMealModalOpen} onClose={() => setIsMealModalOpen(false)} />
    </div>
  );
}
