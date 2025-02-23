import { Link } from "react-router";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      data-oid="yuvnxov"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md" data-oid="79bvfwt">
        <h2
          className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          data-oid="8hr5a:-"
        >
          Reset your password
        </h2>
        <p
          className="mt-2 text-center text-sm text-gray-600"
          data-oid="ztsbsci"
        >
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" data-oid="1mkeqh-">
        <div
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          data-oid="ckx.xw0"
        >
          <form
            className="space-y-6"
            action="#"
            method="POST"
            data-oid="f99zfet"
          >
            <div data-oid="4v2mz_l">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
                data-oid="ni9us7d"
              >
                Email address
              </label>
              <div
                className="mt-1 relative rounded-md shadow-sm"
                data-oid="t2d:spd"
              >
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  data-oid="a9mipwn"
                >
                  <Mail className="h-5 w-5 text-gray-400" data-oid="znrw3oy" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                  data-oid="78jqjlp"
                />
              </div>
            </div>

            <div data-oid="5oznrlp">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                data-oid="m3-ma6."
              >
                Send reset link
              </button>
            </div>
          </form>

          <div className="mt-6" data-oid="q9ebqgc">
            <div className="relative" data-oid="dcxcgjc">
              <div
                className="absolute inset-0 flex items-center"
                data-oid="c4-s3_0"
              >
                <div
                  className="w-full border-t border-gray-300"
                  data-oid="sj6p2ni"
                ></div>
              </div>
              <div
                className="relative flex justify-center text-sm"
                data-oid="m2dv872"
              >
                <span
                  className="px-2 bg-white text-gray-500"
                  data-oid="c85n35o"
                >
                  Or go back to
                </span>
              </div>
            </div>

            <div className="mt-6" data-oid="y-ynmkx">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-teal-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                data-oid="fjho-ws"
              >
                <ArrowLeft className="mr-2 h-5 w-5" data-oid="_r5kja-" />
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
