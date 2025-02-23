
import { useState } from "react"
import { X, Search } from "lucide-react"

interface MealModalProps {
    isOpen: boolean
    onClose: () => void
}

const meals = [
    "Oatmeal",
    "Scrambled Eggs",
    "Greek Yogurt",
    "Chicken Salad",
    "Grilled Salmon",
    "Vegetable Stir-Fry",
    "Whole Grain Toast",
    "Protein Shake",
    "Quinoa Bowl",
    "Fruit Smoothie",
]

export default function MealModal({ isOpen, onClose }: MealModalProps) {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredMeals = meals.filter((meal) => meal.toLowerCase().includes(searchTerm.toLowerCase()))

    if (!isOpen) return null

    return (
        <div className="fixed inset-0  overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Log Meal</h3>
                    <div className="mt-2 px-7 py-3">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Search meals..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <ul className="mt-4 max-h-60 overflow-auto">
                            {filteredMeals.map((meal, index) => (
                                <li
                                    key={index}
                                    className="px-2 py-2 hover:bg-gray-100 cursor-pointer text-left"
                                    onClick={() => {
                                        console.log(`Selected meal: ${meal}`)
                                        onClose()
                                    }}
                                >
                                    {meal}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="items-center px-4 py-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-teal-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
                <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600">
                    <X className="h-6 w-6" />
                </button>
            </div>
        </div>
    )
}

