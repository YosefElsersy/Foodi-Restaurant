// Import necessary dependencies
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    login(email, password)
      .then((result) => {
        // Signed in successfully
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/users", userInfor)
          .then((response) => {
            alert("Signin successful!");
            navigate(location.state?.from?.pathname || "/");
          });
      })
      .catch((error) => {
        // Handle login error
        setErrorMessage("Please provide valid email and password!");
      });
  };

  // Login with Google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        // Handle successful Google login
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic.post("/users", userInfor)
          .then((response) => {
            alert("Signin successful!");
            navigate("/");
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Please Login!</h3>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            {/* <label className="label">
              <a href="#" className="label-text-alt link link-hover mt-2">
                Forgot password?
              </a>
            </label> */}
          </div>

          {/* Show errors */}
          {errorMessage && (
            <p className="text-red text-xs italic">{errorMessage}</p>
          )}

          {/* Submit button */}
          <div className="form-control mt-4">
            <input
              type="submit"
              className="btn bg-green text-white"
              value="Login"
            />
          </div>

          {/* Close button */}
          <Link to="/">
            <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </div>
          </Link>

          <p className="text-center my-2">
            Don`t have an account?
            <Link to="/signup" className="underline text-red ml-1">
              Signup Now
            </Link>
          </p>
        </form>
        <div className="text-center space-x-3">
        <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-green hover:text-white"
            style={{ width: "82%" }} // Specify the width here
          >
            <FaGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
