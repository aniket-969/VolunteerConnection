import React, { useState, useEffect } from 'react'
import OpportunityCategory from './OpportunityCategory'
import Location from './Location'
import { FaPhoneAlt } from "react-icons/fa"
import { FaEnvelope } from 'react-icons/fa';
import { MdKeyboardAlt } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa"
import { useUserContext } from '../context/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OrgForm = () => {

    const { userLocation, locationDetails } = useUserContext()
    const navigate = useNavigate()
    const { latitude, longitude } = userLocation || {}

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            if (!canSubmit) {
                return;
            }
            const categoryId = await getCategoryId()

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

            formData.append("role", "Organization");
            formData.append("category", categoryId);
            formData.append("createdBy", userId);
            // console.log(formData);
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

    const getCategoryId = async () => {

        try {
            const formData1 = new FormData()
            console.log(categoryDescription, category);
            formData1.append("categoryName", category)
            formData1.append("description", categoryDescription)
            // console.log(formData1);
            const categoryData = await axios.post(
                "http://localhost:9000/api/v1/users/opportunity-category", formData1
            );
            // console.log(skillsData);
            return categoryData.data.data._id;
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
    const [file, setFile] = useState()
    const [canSubmit, setCanSubmit] = useState(false);
    const [userId, setUserId] = useState()
    const [category, setCategory] = useState()
    const [categoryDescription, setCategoryDescription] = useState()
 
    useEffect(() => {

        const userId = localStorage.getItem("userId")
        setUserId(userId)
        if (latitude !== undefined && longitude !== undefined) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [latitude, longitude]);

    // console.log(category, categoryDescription);

    return (
        <>
            <h2>Volunteer Opportunity Form:</h2>

            <form onSubmit={onSubmitForm} className=' flex flex-col justify-center  gap-3 max-w-[80%]'>

                <div className=" flex items-center gap-2 bglight p-2">
                    <FaCommentDots />
                    <input
                        className="bglight w-[100%]" id='title' name='title'
                        type="text"
                        placeholder=" Title" onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                    <div className="flex items-center gap-2 bglight  p-2">

                        <MdKeyboardAlt />
                        <textarea
                            className="bglight w-[100%]"
                            type="text" id='description' name='description'
                            placeholder=" Description" onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

              
                    <div className="flex items-center gap-2 bglight p-2">
                        <FaEnvelope />
                        <input type="email" id='email' name='email' placeholder=" Email" className="bglight w-[100%]" onChange={(e) => setEmail(e.target.value)} />
                    </div>
               

              
                    <div className="flex items-center gap-2 bglight p-2" >
                        < FaPhoneAlt />
                        <input
                            type="tel" id='phone' name='phone' pattern="[0-9]{10}"
                            placeholder=" Phone"
                            className="bglight w-[100%]" onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                

                <OpportunityCategory setCategory={setCategory} setCategoryDescription={setCategoryDescription} />

                <div className=" flex items-center justify-start gap-2" >
                    {/* <FaRegKeyboard /> */}
                    <label >Available from:</label>
                    <input
                        type="date"
id='date' name='date'
                        className="bglight p-2"
                        onChange={(e) => setstartDate(e.target.value)}
                    />
                </div>


                <div className=" flex items-center justify-start gap-6" >
                    {/* <FaRegKeyboard /> */}
                    <label >Available till:</label>
                    <input
                    id='date' name='date'
                        type="date"
                        placeholder=" end date"
                        className="bglight p-2" onChange={(e) => setendDate(e.target.value)}
                    />
                </div>

                <div>
                    <label>Choose images to upload </label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>

                <button className='bg-dark text-white py-1' type="submit">Add Post</button>
            </form>
            <Location />
        </>
    )
}

export default OrgForm