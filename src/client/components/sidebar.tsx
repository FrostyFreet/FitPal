import { Link } from "react-router";
import { Home, Activity, Utensils, BarChart2, Settings, X } from "lucide-react";
import {useContext} from "react";
import {IsLoggedInContext} from "../App.tsx";
const navItems1 = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Activity, label: "Activity", href: "/activity" },
  { icon: Utensils, label: "Nutrition", href: "/nutrition" },
  { icon: BarChart2, label: "Detailed Metrics", href: "/metrics" },
  { icon: Settings, label: "Profile/Settings", href: "/profile" },
];
const navItems2 = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Activity, label: "Activity", href: "/activity" },
  { icon: Utensils, label: "Nutrition", href: "/nutrition" },
  { icon: BarChart2, label: "Detailed Metrics", href: "/metrics" },
]

export function Sidebar({open, setOpen}: { open: boolean; setOpen: (open: boolean) => void}) {
  const loggedIn=useContext(IsLoggedInContext)

  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${open ? "block" : "hidden"}`}
        onClick={() => setOpen(false)}></div>

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0 ${
          open ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
        }`}>
        <div className="flex items-center justify-between px-4 py-4 lg:hidden">

          <h2 className="text-xl font-semibold text-gray-800">
            Menu
          </h2>

          <button onClick={() => setOpen(false)}
            className="text-gray-500 focus:outline-none focus:text-gray-700">
            <X size={24}  />
          </button>
        </div>

        <nav className="mt-5 px-2" >
          {/* Navitems with profile settings*/}
          {loggedIn!==null? navItems1.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
              onClick={() => setOpen(false)}>
              <item.icon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"/>
              {item.label}
            </Link>
          ))
          :
              /* Navitems without profile settings*/
              navItems2.map((item) => (
                  <Link
                      key={item.href}
                      to={item.href}
                      className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
                      onClick={() => setOpen(false)}>
                    <item.icon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"/>
                    {item.label}
                  </Link>
              ))
          }
        </nav>

      </div>
    </>
  )
}
