import { ArrowLeft, User } from "lucide-react";
import {Link, useNavigate} from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sendLogOutRequest } from "../api/sendLogOutRequest.tsx";

import { fetchFullName } from "../api/fetchFullName.tsx";
import {useContext} from "react";
import {IsLoggedInContext} from "../App.tsx";

export default function ProfileSettings() {
  const navigate=useNavigate()
  const loggedIn=useContext(IsLoggedInContext)
  const { mutate: logOut } = useMutation({
    mutationFn: sendLogOutRequest,
    onSuccess: () => {
      console.log("Logged Out")
    },
    onError: (error) => {
      console.error("Logout error:", error)
      alert("Logout failed. Please try again.")
    },
  })
  const { data: fullName } = useQuery({
    queryKey: ["userFullName"],
    queryFn: fetchFullName,
  })

  const handleLogout = () => {
    logOut();
    navigate("/login")
    window.location.reload();
  };
  return (
    <div className="max-w-7xl mx-auto" data-oid=".0wlf2u">
      <div className="flex items-center mb-6" data-oid="uo.9eld">
        <Link to="/" className="mr-4" data-oid="2x49-i-">
          <ArrowLeft className="h-6 w-6 text-gray-400" data-oid="i.7_iwx" />
        </Link>
        <h2 className="text-2xl font-semibold text-gray-900" data-oid="j:kq5-4">
          Profile & Settings
        </h2>
      </div>
      <div className="bg-white rounded-lg shadow p-4 sm:p-6" data-oid="m49u2nd">
        <div
          className="flex flex-col sm:flex-row items-center mb-6"
          data-oid="h-e93sj"
        >
          <div
            className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4"
            data-oid="a6sum59"
          >
            <User className="h-12 w-12 text-gray-600" data-oid="t:slrti" />
          </div>
          <div className="text-center sm:text-left" data-oid="mz2v4lb">
            <h3
              className="text-xl font-medium text-gray-900"
              data-oid="p8uc7:e"
            >
              {fullName ? fullName.map((i:{ full_name: string }) => i.full_name) : "John Doe"}
            </h3>
            <p className="text-gray-500" data-oid="-rw:.kl"></p>
          </div>
        </div>
        <div className="space-y-4" data-oid="z27c7fm">
          <div data-oid="zah2opo">
            <h6
              className="text-xl font-medium text-gray-900"
              data-oid="n4won5w"
            >
              Name
            </h6>

            <p className="text-gray-500" data-oid="h-34jt2">
              {fullName ? fullName.map((i:{full_name:string}) => i.full_name) : "John Doe"}
            </p>
          </div>
          <div data-oid="46-51vi">
            <h6
              className="text-xl font-medium text-gray-900"
              data-oid="17:23la"
            >
              Email
            </h6>
            <p className="text-gray-500" data-oid="nktl:.5">
              {loggedIn!==null ? loggedIn.session.user.email :  "John Doe"}
            </p>
          </div>
          <div className="flex items-center justify-between" data-oid="y3e:qt8">
            <span
              className="text-sm font-medium text-gray-700"
              data-oid="r6o5db_"
            >
              Enable Notifications
            </span>
            <button
              className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 bg-gray-200"
              role="switch"
              aria-checked="false"
              data-oid="izref8b"
            >
              <span
                className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                data-oid="keq7hj5"
              ></span>
            </button>
          </div>
          <div className="flex items-center justify-between" data-oid="04m6uiu">
            <span
              className="text-sm font-medium text-gray-700"
              data-oid="h93trxi"
            >
              Dark Mode
            </span>
            <button
              className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 bg-gray-200"
              role="switch"
              aria-checked="false"
              data-oid="nac6m6t"
            >
              <span
                className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                data-oid=":rq4uho"
              ></span>
            </button>
          </div>
          <button
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
            data-oid="dmzw:q8"
          >
            Save Changes
          </button>
          <button
            className="w-full border border-red-500 text-red-500 hover:bg-red-50 font-bold py-2 px-4 rounded"
            onClick={handleLogout}
            data-oid="6zl0ei8"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
