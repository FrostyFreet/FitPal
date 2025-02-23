import { Footprints, Flame, Heart, Clock, Moon, Apple } from "lucide-react";

const default_metrics = [
  { icon: Footprints, label: "Steps", value: "8,500" },
  { icon: Flame, label: "Calorie Goal", value: "2,200" },
  { icon: Heart, label: "Heart Rate", value: "75 bpm" },
  { icon: Clock, label: "Workout Duration", value: "30 mins" },
  { icon: Moon, label: "Sleep", value: "7 hrs" },
  { icon: Apple, label: "Calories Eaten", value: "2,000 cals" },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">

      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Good Morning, User!
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
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto">
          Log Activity
        </button>
        <button className="border border-teal-500 text-teal-500 hover:bg-teal-50 font-bold py-2 px-4 rounded w-full sm:w-auto">
          Log Meal
        </button>
      </div>

    </div>
  );
}
