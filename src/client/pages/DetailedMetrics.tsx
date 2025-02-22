import { ArrowLeft } from "lucide-react"
import { Link } from "react-router"

export default function DetailedMetrics() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-6">
                <Link to="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6 text-gray-400" />
                </Link>
                <h2 className="text-2xl font-semibold text-gray-900">Detailed Metrics</h2>
            </div>
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="mb-4">
                    <div className="h-64 bg-gray-200 rounded-lg mb-4">
                        {/* Placeholder for the interactive chart */}
                        <div className="h-full flex items-center justify-center text-gray-500">Interactive Chart Placeholder</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
                            Daily
                        </button>
                        <button className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
                            Weekly
                        </button>
                        <button className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
                            Monthly
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                                Date
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                                Steps
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                                Calories
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                                Heart Rate
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {/* Sample data rows */}
                        <tr>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 sm:px-6">2023-05-01</td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6">8,500</td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6">2,200</td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6">75 bpm</td>
                        </tr>
                        {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

