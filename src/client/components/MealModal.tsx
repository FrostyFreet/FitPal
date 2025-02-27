import type React from "react"
import { useState } from "react"
import { X, Search } from "lucide-react"

interface MealModalProps {
    isOpen: boolean
    onClose: () => void
}


const allMeals = [
    { name: "Eggs", calories: 155, protein: 13, carbs: 1, fat: 11 },
    { name: "Milk", calories: 42, protein: 3.4, carbs: 5, fat: 1 },
    { name: "Bread", calories: 265, protein: 9, carbs: 49, fat: 3 },
    { name: "Rice", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    { name: "Potato", calories: 77, protein: 2, carbs: 17, fat: 0.1 },
    { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: "Salmon", calories: 208, protein: 20, carbs: 0, fat: 13 },
    { name: "Broccoli", calories: 31, protein: 2.5, carbs: 6, fat: 0.4 },
    { name: "Avocado", calories: 160, protein: 2, carbs: 9, fat: 15 },
    { name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
]

export default function MealModal({ isOpen, onClose }: MealModalProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedMeal, setSelectedMeal] = useState<(typeof allMeals)[0] | null>(null)
    const [amount, setAmount] = useState("")

    const filteredMeals = allMeals.filter((meal) => meal.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleMealSelect = (meal: (typeof allMeals)[0]) => {
        setSelectedMeal(meal)
        setAmount("")
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedMeal && amount) {
            console.log("Logged meal:", { ...selectedMeal, amount: Number.parseInt(amount) })
            onClose()
        }
    }

    if (!isOpen) return null


    return (
        <div className="fixed inset-0 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Log Meal</h3>
                    <form onSubmit={handleSubmit}>
                        {!selectedMeal ? (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="meal-search" className="block text-sm font-medium text-gray-700">
                                        Search or select a meal
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            id="meal-search"
                                            className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Search meals..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                                <ul className="mt-4 max-h-60 overflow-auto">
                                    {filteredMeals.map((meal) => (
                                        <li
                                            key={meal.name}
                                            className="px-2 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleMealSelect(meal)}
                                        >
                                            <div className="font-medium">{meal.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {meal.calories} cal | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-900">{selectedMeal.name}</h4>
                                    <p className="text-sm text-gray-500">
                                        {selectedMeal.calories} cal | P: {selectedMeal.protein}g | C: {selectedMeal.carbs}g | F:{" "}
                                        {selectedMeal.fat}g
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                        Amount (grams)
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        required
                                        className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min="1"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                        onClick={() => setSelectedMeal(null)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                        disabled={!amount}
                                    >
                                        Log Meal
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}

