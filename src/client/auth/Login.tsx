import { Link, useNavigate } from "react-router";
import { Mail, Lock, ArrowRight, EyeOff, Eye } from "lucide-react";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendLoginRequest } from "../api/sendLoginRequest.tsx";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutate: login } = useMutation({
    mutationFn: sendLoginRequest,
    onSuccess: (data) => {
      if (data.status === 400) {
        if (data.code === "email_not_confirmed") setError("Confirm your email");
        else if (data.code === "invalid_credentials") {
          setError("Invalid email or password")
        }
      } else {
        setError("")
      }
    },
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password })
    navigate("/")
    window.location.reload()
  }
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" >
        <div
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div data-oid="qcqix-d">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" data-oid="62vx5nb" />
                </div>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div
                className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" data-oid="d_xvbxb" />
                </div>
                <input
                  type={!passwordVisible ? "password" : "text"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  autoComplete="current-password"
                  required
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="••••••••"
                />

                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? (
                    <EyeOff className="h-5 w-5 text-gray-400"/>
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400"/>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />

                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password"
                  className="font-medium text-teal-600 hover:text-teal-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Sign in
              </button>
            </div>
            {error != "" && (
              <div className="text-red-700 text-md mb-4 text-center">
                {error}
              </div>
            )}
          </form>

          <div className="mt-6">
            <div className="relative" data-oid="3jqpvcz">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6" >
              <Link to="/register"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-teal-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Register
                <ArrowRight className="ml-2 h-5 w-5"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
