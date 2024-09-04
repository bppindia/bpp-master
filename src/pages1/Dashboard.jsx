import Layout from '../layout/Layout'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
    <div className="min-h-screen flex flex-col lg:flex-row">

  <aside className="bg-gray-800 text-white w-full lg:w-1/4 p-4">
    <h2 className="text-xl font-bold mb-4">Dashboard Menu</h2>
    <ul>
      <li className="py-2"><a href="#" className="hover:text-gray-400">Home</a></li>
      <li className="py-2"><a href="#" className="hover:text-gray-400">Settings</a></li>
      <li className="py-2"><a href="#" className="hover:text-gray-400">Profile</a></li>
      <li className="py-2"><a href="#" className="hover:text-gray-400">Logout</a></li>
    </ul>
  </aside>


  <main className="flex-1 p-4">

    <header className="mb-8">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
    </header>

    <div className="py-28 flex justify-center items-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        navigate("/master-enroll");
      }}>
        Enroll Details
      </button>
    </div>
  </main>
</div>

    </Layout>
  )
}

export default Dashboard