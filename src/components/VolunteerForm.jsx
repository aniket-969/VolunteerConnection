import React from 'react'
import { useState, useEffect } from 'react';
import Location from './Location';
import { FaPhoneAlt } from "react-icons/fa"
import { FaEnvelope } from 'react-icons/fa';
import { MdKeyboardAlt } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa"
import Skills from './Skills';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useUserContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const VolunteerForm = () => {

    const { userLocation, locationDetails } = useUserContext()
    const navigate = useNavigate()
    const { latitude, longitude } = userLocation || {}
    // console.log(locationDetails);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            if (!canSubmit) {
                return;
            }
            const skillId = await getSkillId()

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("contactPhone", phone);
            formData.append("contactEmail", email);
            formData.append("avatar", file);
            formData.append("startDate", startdate);
            formData.append("endDate", enddate);

            if (latitude && longitude) {
                formData.append("latitude", latitude);
                formData.append("longitude", longitude);
                formData.append("country", locationDetails.country)
                formData.append("county", locationDetails.county)
                formData.append("road", locationDetails.road)
                formData.append("village", locationDetails.village)
                formData.append("state", locationDetails.state)
            }

            formData.append("role", "Volunteer");
            formData.append("skills", skillId);
            formData.append("createdBy", userId);
            console.log(formData);
            const volunteerFormData = await axios.post(
                "http://localhost:9000/api/v1/users/volunteer-form",
                formData
            );
            console.log(volunteerFormData);
            toast.success("Posted successfully")
            navigate("/")

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }

    };

    const getSkillId = async () => {

        try {
            const formData1 = new FormData()
            console.log(skillDescription, skills);
            formData1.append("skillName", skills)
            formData1.append("description", skillDescription)
            // console.log(formData1);
            const skillsData = await axios.post(
                "http://localhost:9000/api/v1/users/skill-form", formData1
            );
            // console.log(skillsData);
            return skillsData.data.data._id;
        } catch (error) {
            toast.error(error + "There was an error")
            return null
        }
    }

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [startdate, setstartDate] = useState()
    const [enddate, setendDate] = useState()
    const [skills, setSkills] = useState()
    const [skillDescription, setSkillDescription] = useState()
    const [file, setFile] = useState()
    const [canSubmit, setCanSubmit] = useState(false);
    const [userId, setUserId] = useState()

    useEffect(() => {

        const userId = localStorage.getItem("userId")
        setUserId(userId)
        if (latitude !== undefined && longitude !== undefined) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [latitude, longitude]);


    return (
        <>
            <h2 className='text-lg'>Volunteer Form</h2>
            <form onSubmit={onSubmitForm} className=' flex flex-col justify-center  gap-3 max-w-[80%]'>
                <div className=" flex items-center gap-2 bglight p-2">
                    <FaCommentDots />
                    <input
                        className="bglight w-[100%] " id='title' name='title'
                        type="text"
                        placeholder=" Title" onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

 
                <div className="flex items-center gap-2 bglight p-2">

                    <MdKeyboardAlt />

                    <textarea id='description' name='description'
                        className="bglight w-[100%]"
                        type="text"
                        placeholder=" Description" onChange={(e) => setDescription(e.target.value)}

                    />

                </div>

                <div className="flex items-center gap-2 bglight p-2">
                    <FaEnvelope />
                    <input id='email' name='email' type="email" placeholder=" Email" className="bglight" onChange={(e) => setEmail(e.target.value)} />
                </div>


                <div className="flex items-center gap-2 bglight p-2" >
                    < FaPhoneAlt />

                    <input
                       id='phone' name='phone' type="tel" pattern="[0-9]{10}"
                        placeholder=" Phone"
                        className="bglight" onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <Skills setSkills={setSkills} setSkillDescription={setSkillDescription} />

                <div className=" flex items-center justify-start gap-2" >
                    {/* <FaRegKeyboard /> */}
                    <label htmlFor="">Available from:</label>
                    <input id='date' name='date'
                        type="date"
                        className="bglight p-2"
                        onChange={(e) => setstartDate(e.target.value)}
                    />
                </div>


                <div className=" flex items-center justify-start gap-6" >
                    {/* <FaRegKeyboard /> */}
                    <label htmlFor="">Available till:</label>
                    <input name='date' id='date'
                        type="date"
                        placeholder=" end date"
                        className="bglight p-2" onChange={(e) => setendDate(e.target.value)}
                    />

                </div>

                <div>
                    <label >Choose images to upload: </label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>

                <button type="submit" className='bg-dark text-white py-1' disabled={!canSubmit}>Add Post</button>
            </form>
            <Location />
        </>
    )
}

export default VolunteerForm