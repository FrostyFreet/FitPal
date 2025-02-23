import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router";

const meals = [
  { name: "Breakfast", calories: 400, protein: 20, carbs: 50, fat: 15 },
  { name: "Lunch", calories: 600, protein: 30, carbs: 70, fat: 20 },
  { name: "Dinner", calories: 500, protein: 25, carbs: 60, fat: 18 },
];

export default function Nutrition() {
  return (
    <div className="max-w-7xl mx-auto" data-oid="qzk6jbu">
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6"
        data-oid="5wg2lgs"
      >
        <div className="flex items-center mb-4 sm:mb-0" data-oid="5ltnm:k">
          <Link to="/" className="mr-4" data-oid="tbks2ot">
            <ArrowLeft className="h-6 w-6 text-gray-400" data-oid="gnd3wxz" />
          </Link>
          <h2
            className="text-2xl font-semibold text-gray-900"
            data-oid="5pubnrg"
          >
            Nutrition
          </h2>
        </div>
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full sm:w-auto"
          data-oid="2qpay4_"
        >
          <Plus className="h-5 w-5 mr-2" data-oid="r77cr8v" /> Log Meal
        </button>
      </div>

      <div
        className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6"
        data-oid=".w5yk7t"
      >
        <h3
          className="text-lg font-medium text-gray-900 mb-4"
          data-oid="p7z_jhx"
        >
          Daily Summary
        </h3>
        <div
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          data-oid="dvv026r"
        >
          <div data-oid="85ym:_7">
            <p className="text-sm text-gray-500" data-oid="aqiy1f:">
              Calories
            </p>
            <p
              className="text-xl sm:text-2xl font-semibold text-gray-900"
              data-oid="93_bvol"
            >
              1,500 / 2,000
            </p>
          </div>
          <div data-oid="6l_g6_r">
            <p className="text-sm text-gray-500" data-oid="kk7i.wv">
              Protein
            </p>
            <p
              className="text-xl sm:text-2xl font-semibold text-gray-900"
              data-oid="r9frjqv"
            >
              75g / 100g
            </p>
          </div>
          <div data-oid="_32vdan">
            <p className="text-sm text-gray-500" data-oid="4b3lfvn">
              Carbs
            </p>
            <p
              className="text-xl sm:text-2xl font-semibold text-gray-900"
              data-oid="xbs90ar"
            >
              180g / 250g
            </p>
          </div>
          <div data-oid="s58:jo:">
            <p className="text-sm text-gray-500" data-oid="gm-w6r8">
              Fat
            </p>
            <p
              className="text-xl sm:text-2xl font-semibold text-gray-900"
              data-oid="dek-f5a"
            >
              53g / 65g
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-4" data-oid="zx48nfb">
        Today's Meals
      </h3>
      <div className="space-y-4" data-oid="pfqb_mf">
        {meals.map((meal, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4"
            data-oid="1:1qa8x"
          >
            <div
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center"
              data-oid="sa6d.fp"
            >
              <div className="mb-2 sm:mb-0" data-oid="t5id:21">
                <h4
                  className="text-lg font-medium text-gray-900"
                  data-oid="jep:pm8"
                >
                  {meal.name}
                </h4>
                <div className="mt-1 text-sm text-gray-500" data-oid="0edclcn">
                  <span className="mr-4" data-oid="pensgj1">
                    Protein: {meal.protein}g
                  </span>
                  <span className="mr-4" data-oid="5o3-iaw">
                    Carbs: {meal.carbs}g
                  </span>
                  <span data-oid="cat69eg">Fat: {meal.fat}g</span>
                </div>
              </div>
              <p
                className="text-lg font-medium text-gray-900"
                data-oid=".6vi-_2"
              >
                {meal.calories} cal
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
