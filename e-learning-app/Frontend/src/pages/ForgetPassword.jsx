import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
    const navigateTo = useNavigate();
    const handleForm = () => { 
        navigateTo("/login");
    };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Learnify"
          src="https://t4.ftcdn.net/jpg/01/28/93/91/360_F_128939133_0WXTVdZ1bv1NXusQsdYYJLIwTVoXHqQ7.jpg"
          className="mx-auto h-24 w-24"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Password Recovery
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
                      <h3 className="mt-10 text-center text-2xl tracking-tight text-gray-600">            
            Enter your email address to reset your password
            </h3>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleForm}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send reset link
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Got your Password?{" "}
          <span
            onClick={() => navigateTo("/login")}
            className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  >
                      Back to Login
          </span>
        </p>
      </div>
    </div>
  );
}

