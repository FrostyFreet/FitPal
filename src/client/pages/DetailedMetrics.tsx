import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function DetailedMetrics() {
  return (
    <div className="max-w-7xl mx-auto" data-oid="062i9nx">
      <div className="flex items-center mb-6" data-oid="sdts0ob">
        <Link to="/" className="mr-4" data-oid="_h81rha">
          <ArrowLeft className="h-6 w-6 text-gray-400" data-oid="q3cofiq" />
        </Link>
        <h2 className="text-2xl font-semibold text-gray-900" data-oid="8831xy4">
          Detailed Metrics
        </h2>
      </div>
      <div className="bg-white rounded-lg shadow p-4 sm:p-6" data-oid="a__lx1w">
        <div className="mb-4" data-oid="xl2.i_0">
          <div className="h-64 bg-gray-200 rounded-lg mb-4" data-oid="3f_6.b2">
            {/* Placeholder for the interactive chart */}
            <div
              className="h-full flex items-center justify-center text-gray-500"
              data-oid="jm6-n6d"
            >
              Interactive Chart Placeholder
            </div>
          </div>
          <div className="flex flex-wrap gap-2" data-oid="zuv9.gb">
            <button
              className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50"
              data-oid="hg22d1n"
            >
              Daily
            </button>
            <button
              className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50"
              data-oid="usv1aah"
            >
              Weekly
            </button>
            <button
              className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50"
              data-oid="61l.:7f"
            >
              Monthly
            </button>
          </div>
        </div>
        <div className="overflow-x-auto" data-oid="nk86rcx">
          <table
            className="min-w-full divide-y divide-gray-200"
            data-oid="yfo_6en"
          >
            <thead className="bg-gray-50" data-oid="pu_r4qq">
              <tr data-oid="kuh0mx:">
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
                  data-oid="_5c1_ub"
                >
                  Date
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
                  data-oid="ainupjz"
                >
                  Steps
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
                  data-oid="s.ul6wc"
                >
                  Calories
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
                  data-oid="pjte4zs"
                >
                  Heart Rate
                </th>
              </tr>
            </thead>
            <tbody
              className="bg-white divide-y divide-gray-200"
              data-oid="i53terc"
            >
              {/* Sample data rows */}
              <tr data-oid="qtyprvo">
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 sm:px-6"
                  data-oid="hpdsfkt"
                >
                  2023-05-01
                </td>
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6"
                  data-oid="xv5t_an"
                >
                  8,500
                </td>
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6"
                  data-oid="eqlym1h"
                >
                  2,200
                </td>
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6"
                  data-oid="c__6__v"
                >
                  75 bpm
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
