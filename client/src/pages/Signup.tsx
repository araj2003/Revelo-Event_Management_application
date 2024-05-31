import React, { useState } from "react";
import { useAppDispatch } from "../hooks";
import { signUp } from "../store/userSlice";
import { SignUpType } from "../types";
import { Link } from "react-router-dom";

function Signup() {
  const dispatch = useAppDispatch();
  const [signUpValues, setSignUpValues] = useState<SignUpType>({
    name: "",
    email: "",
    password: "",
    role:"",
    subroll:""
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUp(signUpValues));
  };

  return (
    <section className="bg-white min-h-screen">
      <div className="container flex items-center justify-center px-6 mx-auto min-h-section">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          {/* <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          /> */}

          <h1 className="mt-3 text-2xl font-bold text-center text-gray-800 capitalize sm:text-4xl">
            <div className="flex items-center justify-center pb-2">
              <img
                src="https://www.pngall.com/wp-content/uploads/13/Slack-Logo-PNG-Cutout.png"
                alt="Slack Logo"
                width={150}
                height={150}
              />
            </div>
            sign up to Slack
          </h1>

          <h1 className="mt-4 text-lg text-center text-gray-800">
            We suggest using the email address you use at work.
          </h1>

          {/* <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-300">Email</span> */}
          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.25 9C8.25 6.92893 9.92893 5.25 12 5.25C14.0711 5.25 15.75 6.92893 15.75 9C15.75 11.0711 14.0711 12.75 12 12.75C9.92893 12.75 8.25 11.0711 8.25 9ZM12 6.75C10.7574 6.75 9.75 7.75736 9.75 9C9.75 10.2426 10.7574 11.25 12 11.25C13.2426 11.25 14.25 10.2426 14.25 9C14.25 7.75736 13.2426 6.75 12 6.75Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 14.5456 3.77827 16.851 5.4421 18.5235C5.6225 17.5504 5.97694 16.6329 6.68837 15.8951C7.75252 14.7915 9.45416 14.25 12 14.25C14.5457 14.25 16.2474 14.7915 17.3115 15.8951C18.023 16.6329 18.3774 17.5505 18.5578 18.5236C20.2217 16.8511 21.25 14.5456 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM17.1937 19.6554C17.0918 18.4435 16.8286 17.5553 16.2318 16.9363C15.5823 16.2628 14.3789 15.75 12 15.75C9.62099 15.75 8.41761 16.2628 7.76815 16.9363C7.17127 17.5553 6.90811 18.4434 6.80622 19.6553C8.28684 20.6618 10.0747 21.25 12 21.25C13.9252 21.25 15.7131 20.6618 17.1937 19.6554Z"
                  fill="currentColor"
                />
              </svg>
            </span>

            <input
              type="text"
              name="name"
              onChange={(e) => {
                setSignUpValues({ ...signUpValues, name: e.target.value });
              }}
              className="block w-full py-3 text-black bg-white border rounded-lg px-11  dark:text-black dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Name"
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="email"
              name="email"
              onChange={(e) => {
                setSignUpValues({ ...signUpValues, email: e.target.value });
              }}
              className="block w-full py-3 text-black bg-white border rounded-lg px-11  dark:text-black dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
            />
          </div>
          {/* </label> */}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={(e) => {
                setSignUpValues({ ...signUpValues, password: e.target.value });
              }}
              className="block w-full py-3 text-black bg-white border rounded-lg px-11  dark:text-black dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
            />
          </div>

          {/* DropDown  */}

          <div className="relative flex items-center mt-4">
            <select
              name="role"
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={(e) => {
                setSignUpValues({ ...signUpValues, role:e.target.value });
              }}
            >
              
              <option value="regular">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6l-6 6z" />
              </svg>
            </div>
          </div>
          {
            signUpValues.role === "vendor" && (
              <div className="relative flex items-center mt-4">
            <span className="absolute">
            
<svg className="h-5 w-5 ml-3" fill = "currentColor"  viewBox="0 0 52 52" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
  <path d="M38.3,27.2A11.4,11.4,0,1,0,49.7,38.6,11.46,11.46,0,0,0,38.3,27.2Zm2,12.4a2.39,2.39,0,0,1-.9-.2l-4.3,4.3a1.39,1.39,0,0,1-.9.4,1,1,0,0,1-.9-.4,1.39,1.39,0,0,1,0-1.9l4.3-4.3a2.92,2.92,0,0,1-.2-.9,3.47,3.47,0,0,1,3.4-3.8,2.39,2.39,0,0,1,.9.2c.2,0,.2.2.1.3l-2,1.9a.28.28,0,0,0,0,.5L41.1,37a.38.38,0,0,0,.6,0l1.9-1.9c.1-.1.4-.1.4.1a3.71,3.71,0,0,1,.2.9A3.57,3.57,0,0,1,40.3,39.6Z" />
  <circle cx="21.7" cy="14.9" r="12.9" />
  
  <path d="M25.2,49.8c2.2,0,1-1.5,1-1.5h0a15.44,15.44,0,0,1-3.4-9.7,15,15,0,0,1,1.4-6.4.77.77,0,0,1,.2-.3c.7-1.4-.7-1.5-.7-1.5h0a12.1,12.1,0,0,0-1.9-.1A19.69,19.69,0,0,0,2.4,47.1c0,1,.3,2.8,3.4,2.8H24.9C25.1,49.8,25.1,49.8,25.2,49.8Z" />
</svg>
            </span>

            <input
              type="subroll"
              name="subroll"
              onChange={(e) => {
                setSignUpValues({ ...signUpValues, subroll: e.target.value });
              }}
              className="block w-full py-3 text-black bg-white border rounded-lg px-11  dark:text-black dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Category eg. Photographer,decoration etc"
            />
          </div>
            )
          }

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="showPassword"
              className=" text-blue-500 rounded focus:ring-blue-400"
              onClick={() => setShowPassword(!showPassword)}
            />
            <label
              htmlFor="showPassword"
              className="block ml-2 text-sm text-gray-700 dark:text-gray-500 "
            >
              Show password
            </label>
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-600 rounded-lg hover:bg-purple-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Register
            </button>

            <div className="flex items-center justify-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="flex items-center justify-center  pb-1">
              <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-600 hover:border-slate-600 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-900 hover:shadow transition duration-150">
                <img
                  className="w-10 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="mt-2 text-center ">
              <Link
                to="/signin"
                className="text-sm text-purple-600 font-semibold hover:underline"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Signup;
