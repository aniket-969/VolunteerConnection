import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { FaImagePortrait } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { FaRegKeyboard } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Guest from "./Guest";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");

  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("fullName", name);
      formData.append("email", email);
      formData.append("avatar", file);

      const user = await axios.post(
        "http://localhost:9000/api/v1/users/register",
        formData
      );
      console.log(user);
      toast.success("User registered successfully");
      navigate("/sign-in");
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };

  return (

    <>

      <div className="  flex flex-col items-start gap-2  ">
        <h1 className="text-[#4361ee] text-3xl font-semibold md:text-blac lg:text-red">Sign Up</h1>
        <p className="text-md">Create your account</p>
      </div>
 
      <form onSubmit={onSubmitForm} className=" flex flex-col gap-4 w-[95%] lg:w-[90%]">

        <div className="flex bg-[#F0F8FF] w-[100%] p-2 gap-4 items-center">

          <div className="text-xl" >
            <FaUser />
          </div>

          <input
            className="bg-[#F0F8FF]  text-lg w-[100%]"
            type="text" id="name" name="name"
            placeholder=" Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <div className="flex bg-[#F0F8FF] w-[100%] p-2 gap-4 items-center">
            {" "}
            <div className="text-xl" >
              <FaImagePortrait />
            </div>

            <input
              className="bg-[#F0F8FF] w-[100%] text-lg"
              type="text" id="username" name="username"
              placeholder=" Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="flex bg-[#F0F8FF] w-[100%] p-2 gap-4 items-center">
            <div className="text-xl" >
              <FaEnvelope />
            </div>

            <input
              type="email"
              placeholder=" Email" id="email" name="email"
              className="bg-[#F0F8FF] text-lg w-[100%]"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="flex bg-[#F0F8FF] w-[100%] p-2 gap-4 items-center">
            <div className="text-xl" >
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

        <div className="flex flex-col gap-3">
          <label>Select profle picture</label>
          <input type="file" className="" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <button type="submit" className="bg-[#4361ee] text-white text-xl p-3 my-2">Sign Up</button>
      </form>

      <div className="flex gap-5">
        <p>Already a user?</p>
        <Link to="/sign-in" className="text-[#4361ee] font-semibold ">
          Sign in
        </Link>
      </div>

      <Guest/>
    </>
  );
};

export default SignupForm;
