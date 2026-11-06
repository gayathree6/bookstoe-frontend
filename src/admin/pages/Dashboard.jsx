
import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Sidebar from '../components/Sidebar'
import Footer from '../../components/Footer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faUsers,
  faUserTie
} from '@fortawesome/free-solid-svg-icons'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
  PieChart
} from 'recharts'

// Book Purchase Data
const data = [
  { label: 'Jan', x: 180, y: 120 },
  { label: 'Feb', x: 250, y: 180 },
  { label: 'Mar', x: 200, y: 150 },
  { label: 'Apr', x: 300, y: 220 },
  { label: 'May', x: 230, y: 170 },
  { label: 'Jun', x: 320, y: 250 },
]

// Growth Ratio Data
const data01 = [
  { name: 'Books', value: 400 },
  { name: 'Users', value: 300 },
  { name: 'Employees', value: 300 },
  { name: 'Others', value: 200 },
]

const data02 = [
  { name: 'Books', value: 100 },
  { name: 'Users', value: 300 },
  { name: 'Employees', value: 100 },
  { name: 'Others', value: 80 },
  { name: 'New Books', value: 40 },
  { name: 'New Users', value: 30 },
  { name: 'Sales', value: 50 },
]

function Dashboard() {

  return (
    <>
      <AdminHeader />

      <div className="md:grid md:grid-cols-5 gap-6">

        {/* SIDEBAR */}
        <div className="col-span-1">
          <Sidebar />
        </div>

        {/* DASHBOARD CONTENT */}
        <div className="col-span-4 min-w-0 !p-5">

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* BOOKS CARD */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-md !p-6 flex items-center justify-between min-h-[115px]">

              <div>
                <p className="text-lg font-medium">
                  Books
                </p>

                <h2 className="text-4xl font-bold !mt-1">
                  100+
                </h2>
              </div>

              <FontAwesomeIcon
                icon={faBook}
                className="text-5xl opacity-90"
              />

            </div>

            {/* USERS CARD */}
            <div className="bg-gradient-to-r from-teal-700 to-teal-800 text-white rounded-lg shadow-md !p-6 flex items-center justify-between min-h-[115px]">

              <div>
                <p className="text-lg font-medium">
                  Users
                </p>

                <h2 className="text-4xl font-bold !mt-1">
                  100+
                </h2>
              </div>

              <FontAwesomeIcon
                icon={faUsers}
                className="text-5xl opacity-90"
              />

            </div>

            {/* EMPLOYEES CARD */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-lg shadow-md !p-6 flex items-center justify-between min-h-[115px]">

              <div>
                <p className="text-lg font-medium">
                  Employees
                </p>

                <h2 className="text-4xl font-bold !mt-1">
                  100+
                </h2>
              </div>

              <FontAwesomeIcon
                icon={faUserTie}
                className="text-5xl opacity-90"
              />

            </div>

          </div>


          {/* CHART TITLES */}
          


          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 !mt-5">

            {/* BOOK PURCHASE BAR CHART */}
            <div className="bg-white rounded-lg !p-4 shadow-sm min-w-0">
              <h2 className="text-lg font-semibold text-gray-700">
              Book Purchase Ratio
            </h2>


              <ResponsiveContainer width="100%" height={300}>

                <BarChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                >

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="label" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="x"
                    name="Books Purchased"
                    fill="#8884d8"
                    radius={[8, 8, 0, 0]}
                  />

                  <Bar
                    dataKey="y"
                    name="Orders"
                    fill="#82ca9d"
                    radius={[8, 8, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>


            {/* GROWTH PIE CHART */}
            
            <div className="bg-white rounded-lg !p-4 shadow-sm min-w-0">
              <h2 className="text-lg font-semibold text-gray-700">
              Growth Ratio (Yearly)
            </h2>
              

              <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                  <Pie
                    data={data01}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="50%"
                    fill="#8884d8"
                    stroke="white"
                  />

                  <Pie
                    data={data02}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#82ca9d"
                    stroke="white"
                    label
                  />

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default Dashboard
