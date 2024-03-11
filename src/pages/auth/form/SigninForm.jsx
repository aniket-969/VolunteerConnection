import React from "react";
import { FaEnvelope } from "react-icons/fa6";
import { FaRegKeyboard } from "react-icons/fa6";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useUserContext } from "../../../context/AuthProvider";
import Guest from "./Guest";

const SigninForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [cookies, setCookies, removeCookie] = useCookies("accessToken")

  const navigate = useNavigate();

  const { user, setUser } = useUserContext();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/users/login",
        { email, password }
      );
      console.log(response.data.data);
      setCookies("accessToken", response.data.data.accessToken);
      console.log(cookies);
      window.localStorage.setItem("userId", response.data.data.user._id);
      console.log(response.data.data.user);
      setCookies("userData", response.data.data.user);
      setUser(response.data.data.user);
      console.log(user);
      toast.success("User login successful");
      navigate("/");

    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Invalid User Credentials");
      } else if (error.response.status === 400) {
        toast.error("User doesn't exist");
      } else {
        toast.error(error.message);
      }
    }
  };
  
  return (
    <>
      <div className="flex flex-col items-start gap-2 ">
        <h1 className="text-[#4361ee] text-3xl font-semibold">Sign in</h1>
        <p>Enter your credentials to login</p>
      </div>

      <form
        onSubmit={onSubmitForm}
        className=" flex flex-col gap-4 w-[95%] lg:w-[90%]"
      >
        <div>
          <div className="flex bg-[#F0F8FF] w-[100%] p-2 gap-4 items-center">
            <div className="text-xl">
              <FaEnvelope />
            </div>

            <input
              type="email" id="email" name="email"
              placeholder=" Email "
              className="bg-[#F0F8FF] text-lg w-[100%]"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="flex bg-[#F0F8FF] w-[100%] p-2 gap-4 items-center">
            <div className="text-xl">
              <FaRegKeyboard />
            </div>
            <input
              type="password"
              placeholder=" Password"
              className="bg-[#F0F8FF] text-lg w-[100%]"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#4361ee] text-white text-xl p-3 my-2"
        >
          Sign In
        </button>
      </form>

      <div className="flex gap-5">
        <p>Don't have an account ?</p>
        <Link to="/sign-up" className="text-[#4361ee] font-semibold ">
          Sign Up
        </Link>
      </div>

      <Guest />
    </>
  );
};

export default SigninForm;
