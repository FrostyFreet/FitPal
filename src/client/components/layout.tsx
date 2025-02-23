import React, {useContext} from "react";
import { useState } from "react";
import { Bell, User, Menu } from "lucide-react";
import { Sidebar } from "./sidebar.tsx";
import { Link } from "react-router";
import {IsLoggedInContext} from "../App.tsx";

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const context=useContext(IsLoggedInContext)!
  const {loggedIn}=context

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}  />
      <div className="flex flex-col flex-1 overflow-hidden" >

        <header className="flex items-center justify-between px-4 py-4 bg-white shadow sm:px-6 lg:px-8">
          <div className="flex items-center" >
            <button onClick={() => setSidebarOpen(true)}
                    className="text-gray-500 focus:outline-none focus:text-gray-700 lg:hidden">
              <Menu size={24} />
            </button>

            <h1 className="ml-2 text-xl font-bold text-gray-800 lg:ml-0">
              FitPlate
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              <Bell size={24} />
            </button>

            {loggedIn === null ? (
              <Link to={"/login"} >
                Log in
              </Link>
            ) : (
              <button className="text-gray-600 hover:text-gray-800">
                <User size={24} />
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
