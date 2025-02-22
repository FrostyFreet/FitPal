import { ArrowLeft, User } from "lucide-react"
import { Link } from "react-router"
import {useMutation, useQuery} from "@tanstack/react-query";
import {sendLogOutRequest} from "../api/sendLogOutRequest.tsx";

import {fetchFullName} from "../api/fetchFullName.tsx";
import {isLoggedIn} from "../api/isLoggedIn.tsx";

export default function ProfileSettings () {
    const {mutate:logOut} = useMutation({
        mutationFn:sendLogOutRequest,
        onSuccess:()=>{
            console.log("Logged Out")
            window.location.href = '/login'
        },
        onError: (error) => {
            console.error('Logout error:', error)
            alert('Logout failed. Please try again.')
        }
    })
    const {data:fullName}=useQuery({
        queryKey:["userFullName"],
        queryFn:fetchFullName
    })
    const {data:userData}=useQuery({
        queryKey: ['isLoggedInData'],
        queryFn: isLoggedIn,
    })



    const handleLogout = () => {logOut()}
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-6">
                <Link to="/" className="mr-4">
                    <ArrowLeft className="h-6 w-6 text-gray-400" />
                </Link>
                <h2 className="text-2xl font-semibold text-gray-900">Profile & Settings</h2>
            </div>
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center mb-6">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                        <User className="h-12 w-12 text-gray-600" />
                    </div>
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-medium text-gray-900">{fullName ? fullName.map((i)=>i.full_name) : "John Doe"}</h3>
                        <p className="text-gray-500"></p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <h6 className="text-xl font-medium text-gray-900">Name</h6>

                        <p className="text-gray-500">{fullName ? fullName.map((i) => i.full_name) : "John Doe"}</p>
                    </div>
                    <div>
                        <h6 className="text-xl font-medium text-gray-900">Email</h6>
                        <p className="text-gray-500">{userData ? userData.session.user.email : "John Doe"}</p>
                    </div>
                    <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Enable Notifications</span>
                        <button
                            className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 bg-gray-200"
                            role="switch"
                            aria-checked="false"
                        >
                            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Dark Mode</span>
                        <button
                            className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 bg-gray-200"
                            role="switch"
                            aria-checked="false"
                        >
                            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                        </button>
                    </div>
                    <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">
                        Save Changes
                    </button>
                    <button className="w-full border border-red-500 text-red-500 hover:bg-red-50 font-bold py-2 px-4 rounded" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    )
}

