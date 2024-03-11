import React, { useEffect } from 'react'
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useUserContext } from "../../../context/AuthProvider";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Guest = () => {

    const [cookies, setCookie, removeCookie] = useCookies("accessToken")
    console.log(cookies);
    const navigate = useNavigate();
    // const userData  = cookies.userData
    // console.log(userData);
    const{user,setUser} = useUserContext()
    const randomUsername = `guest_${Math.random().toString(36).substring(2, 10)}`;
    const randomEmail = `${randomUsername}@gmail.com`;

    const handleGuest = async () => {
        const data = await Signup()
        console.log("data");
        if (data == true) {
            console.log("reached inside ");
            await Signin()
        }

    }

    const Signup = async () => {
        try {
            const formData = new FormData()
            formData.append("username", randomUsername);
            formData.append("fullName", "Guest23@#$");
            formData.append("email", randomEmail);
            formData.append("password", "sdf@#1234")
            const user = await axios.post(
                "http://localhost:9000/api/v1/users/register",
                formData
            );

            console.log(user);
            if (user) {
                return true;
            }

        } catch (error) {
            console.log(error);
        }
    }

    const Signin = async () => {
        try {
            console.log("reached here");
            const email = randomEmail
            const password = "sdf@#1234"

            const response = await axios.post(
                "http://localhost:9000/api/v1/users/login",
                { email, password })
            setCookie("accessToken", response.data.data.accessToken);
            console.log(response);
            window.localStorage.setItem("userId", response.data.data.user._id);
            const loginTime = new Date().getTime();
            window.localStorage.setItem("loginTime", loginTime);
            setCookie("userData", response.data.data.user);
            //    console.log(response.data.data.user);
            setUser(response.data.data.user);
            console.log(user);
            toast.success("User login successful");
            navigate("/");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handleGuest} className="bg-[#4361ee] text-white text-sm py-2 w-[10rem] ">Continue as Guest</button>
    )
}

export default Guest