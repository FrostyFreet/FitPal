import { Link, useNavigate } from "react-router";
import { User, Mail, Lock, ArrowRight, EyeOff, Eye } from "lucide-react";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendRegisterRequest } from "../api/sendRegisterRequest.tsx";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [full_name, setFullName] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const { mutate: register } = useMutation({
    mutationFn: sendRegisterRequest,
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ email, password, full_name });
    setSuccess(true);
    setEmail("");
    setFullName("");
    setPassword("");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      data-oid=":jm:c9y"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md" data-oid="g_b:crc">
        <h2
          className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          data-oid="brxcl_n"
        >
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" data-oid="3v2d3d8">
        <div
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          data-oid="8972vha"
        >
          <form
            className="space-y-6"
            method="POST"
            onSubmit={handleSubmit}
            data-oid="6i2uwyw"
          >
            <div data-oid=".3pl9.:">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
                data-oid="brz:21w"
              >
                Full Name
              </label>
              <div
                className="mt-1 relative rounded-md shadow-sm"
                data-oid="0_e.lur"
              >
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  data-oid="gbwlkdn"
                >
                  <User className="h-5 w-5 text-gray-400" data-oid="zsatet:" />
                </div>
                <input
                  onChange={(e) => setFullName(e.target.value)}
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="John Doe"
                  data-oid="mu4tm9j"
                />
              </div>
            </div>

            <div data-oid="-ppt89a">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
                data-oid="tm6:91d"
              >
                Email address
              </label>
              <div
                className="mt-1 relative rounded-md shadow-sm"
                data-oid="3ndc6q-"
              >
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  data-oid="jquq8_i"
                >
                  <Mail className="h-5 w-5 text-gray-400" data-oid="pnyv2:q" />
                </div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                  data-oid="s35iwc."
                />
              </div>
            </div>

            <div data-oid="-ibjon2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
                data-oid="lonhh_h"
              >
                Password
              </label>
              <div
                className="mt-1 relative rounded-md shadow-sm"
                data-oid="ze0a3_q"
              >
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  data-oid="2ou.ws9"
                >
                  <Lock className="h-5 w-5 text-gray-400" data-oid="5nx73mr" />
                </div>
                <input
                  type={!passwordVisible ? "password" : "text"}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  required
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="••••••••"
                  data-oid="kia6j:t"
                />

                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  data-oid="a2qta-l"
                >
                  {passwordVisible ? (
                    <EyeOff
                      className="h-5 w-5 text-gray-400"
                      data-oid="sjt37:-"
                    />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" data-oid="z5rb6gl" />
                  )}
                </div>
              </div>
            </div>

            <div data-oid="n_3ixrj">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                data-oid="l5ayf22"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-6" data-oid="cpeunn.">
            <div className="relative" data-oid="c6:m5e3">
              <div
                className="absolute inset-0 flex items-center"
                data-oid="3d95852"
              >
                <div
                  className="w-full border-t border-gray-300"
                  data-oid="j.g40q7"
                ></div>
              </div>
              <div
                className="relative flex justify-center text-sm"
                data-oid="4_7nr6c"
              >
                <span
                  className="px-2 bg-white text-gray-500"
                  data-oid="4uiamdi"
                >
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6" data-oid="u1rj09b">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-teal-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                data-oid="hdp48qq"
              >
                Log in
                <ArrowRight className="ml-2 h-5 w-5" data-oid="elt60-6" />
              </Link>
            </div>
            {success && (
              <div
                className="text-green-700 text-md mb-4 text-center"
                data-oid="jk.x10r"
              >
                <p data-oid="8iwea-5">Successfull registration! Welcome!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
