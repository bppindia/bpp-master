import React, { useState } from "react";
import Layout from '../../layout/Layout'
import bppFlag from '../../assets/bppFlag.png'
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { getURLbyEndPointV2 } from "../../store/api";


export default function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(getURLbyEndPointV2("loginMaster"), {
        email,
        password,
      });
      if (res && res.data) {
        if (res && res.data && res.data.status) {
          const { token, userId, result } = res.data.data;
          const userDetails = JSON.parse(result);
  
          // Convert userDetails object to string
          const userDetailsString = JSON.stringify(userDetails);
  
          // Set cookies instead of sessionStorage
          Cookies.set("authToken", token);
          Cookies.set("userId", userId);
          Cookies.set("userDetails", encodeURIComponent(userDetailsString));
  
          toast.success(res.data.message);
          setTimeout(() => {
            if (userDetails.role === "master") {
              navigate(location.state || "/master-dashboard");
            } else if (userDetails.role === "employee") {
              navigate(location.state || "/employee-dashboard");
            } else {
              alert("Unauthorised access attempt.");
            }
          }, 1000);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("Email or password are Incorrect");
    }
  };

    return (
      <>
      <Layout>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src={bppFlag}
              className="mx-auto h-24 w-auto"
            />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    required
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
        </Layout>
      </>
    )
  }
  