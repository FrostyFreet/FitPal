import { ArrowLeft, Plus } from "lucide-react"
import { Link } from "react-router"

const meals = [
    { name: "Breakfast", calories: 400, protein: 20, carbs: 50, fat: 15 },
    { name: "Lunch", calories: 600, protein: 30, carbs: 70, fat: 20 },
    { name: "Dinner", calories: 500, protein: 25, carbs: 60, fat: 18 },
]

export default function Nutrition() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex items-center mb-4 sm:mb-0">
                    <Link to="/" className="mr-4">
                        <ArrowLeft className="h-6 w-6 text-gray-400" />
                    </Link>
                    <h2 className="text-2xl font-semibold text-gray-900">Nutrition</h2>
                </div>
                <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full sm:w-auto">
                    <Plus className="h-5 w-5 mr-2" /> Log Meal
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Summary</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div>
                        <p className="text-sm text-gray-500">Calories</p>
                        <p className="text-xl sm:text-2xl font-semibold text-gray-900">1,500 / 2,000</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Protein</p>
                        <p className="text-xl sm:text-2xl font-semibold text-gray-900">75g / 100g</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Carbs</p>
                        <p className="text-xl sm:text-2xl font-semibold text-gray-900">180g / 250g</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Fat</p>
                        <p className="text-xl sm:text-2xl font-semibold text-gray-900">53g / 65g</p>
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Meals</h3>
            <div className="space-y-4">
                {meals.map((meal, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <div className="mb-2 sm:mb-0">
                                <h4 className="text-lg font-medium text-gray-900">{meal.name}</h4>
                                <div className="mt-1 text-sm text-gray-500">
                                    <span className="mr-4">Protein: {meal.protein}g</span>
                                    <span className="mr-4">Carbs: {meal.carbs}g</span>
                                    <span>Fat: {meal.fat}g</span>
                                </div>
                            </div>
                            <p className="text-lg font-medium text-gray-900">{meal.calories} cal</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

