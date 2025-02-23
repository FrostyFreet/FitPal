import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router";

const activities = [
  { type: "Running", duration: "30 mins", calories: 300 },
  { type: "Cycling", duration: "45 mins", calories: 400 },
  { type: "Walking", duration: "60 mins", calories: 200 },
];

export default function ActivityLog() {
  return (
    <div className="max-w-7xl mx-auto" data-oid="v.5.6rw">
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6"
        data-oid="sy5qm2y"
      >
        <div className="flex items-center mb-4 sm:mb-0" data-oid="3zfk2oj">
          <Link to="/" className="mr-4" data-oid="ppan7vx">
            <ArrowLeft className="h-6 w-6 text-gray-400" data-oid="tefxtoi" />
          </Link>
          <h2
            className="text-2xl font-semibold text-gray-900"
            data-oid="ykffy63"
          >
            Activity Log
          </h2>
        </div>
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full sm:w-auto"
          data-oid="7co3xfc"
        >
          <Plus className="h-5 w-5 mr-2" data-oid="34l.mxp" /> Add New Activity
        </button>
      </div>
      <div className="mb-4 flex flex-wrap gap-2" data-oid="pyzemu:">
        <button
          className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50"
          data-oid="1s0o438"
        >
          All
        </button>
        <button
          className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50"
          data-oid="hg-fybo"
        >
          Running
        </button>
        <button
          className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50"
          data-oid="_6iu1hj"
        >
          Walking
        </button>
        <button
          className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50"
          data-oid="igi.xpu"
        >
          Cycling
        </button>
      </div>
      <div className="space-y-4" data-oid="o15cpfe">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4"
            data-oid="qv.4zsu"
          >
            <div
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center"
              data-oid="d.shz4-"
            >
              <div className="mb-2 sm:mb-0" data-oid="8ku-hib">
                <h3
                  className="text-lg font-medium text-gray-900"
                  data-oid="gvsyaiv"
                >
                  {activity.type}
                </h3>
                <p className="text-sm text-gray-500" data-oid="co1ivw0">
                  Duration: {activity.duration}
                </p>
              </div>
              <div className="text-left sm:text-right" data-oid="ybdxvkx">
                <p
                  className="text-lg font-medium text-gray-900"
                  data-oid="w3fzlax"
                >
                  {activity.calories} cal
                </p>
                <p className="text-sm text-gray-500" data-oid="z.6g8ys">
                  burned
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
