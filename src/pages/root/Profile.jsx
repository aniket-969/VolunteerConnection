import React, { useEffect, useState } from 'react'
import { fetchUserData, handlePostDelete } from '../../utils/fetchVolunteerData';
import { formatDate, formatUpdatedAt } from '../../utils/fetchVolunteerData'
import { MdOutlineDeleteOutline } from "react-icons/md";
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';

const Profile = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies("accessToken")
  const userData  = cookies.userData
  console.log(userData);
  console.log(cookies.accessToken);

  const handleDelete = async (postId) => {

    try {
      const data = await handlePostDelete(postId)
      console.log(data.message);
      toast.success(data.message)
      fetchData()
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("userId")
      console.log(userId);
      const volData = await fetchUserData(userId);
      // console.log(volData);
      setData(volData)
      setMessage(volData.message)

      if (volData) setLoading(false)

    } catch (error) {
      console.error("Error fetching data:", error);

    }
  };

  useEffect(() => {

    fetchData();

  }, [])

  console.log(data);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        !message ? (

          <section className='my-5'>

            <div className='flex flex-col items-center gap-3 my-6 justify-center'>

              <img src={userData.avatar} className=' image--cover h-[100px] w-[100px] bg-black' />

              <div className='flex justify-center items-center flex-col'>
                <p>{userData.fullName}</p>
                <p>@{userData.username}</p>

              </div>

            </div>

            <div>
              {
                data.map(post => (
                  <div key={post._id} className='pop1 flex flex-col gap-4 mx-5 my-2 px-5 py-4 rounded-2xl '>

                    {/* post name and username */}
                    <div className='flex items-center gap-5 justify-between'>

                      {/* post name and username */}
                      <div className='flex flex-col'>

                        <div className='flex items-center text-sm md:text-lg max-w-[12rem]'>
                          <p>{post.createdBy.fullName.split(' ')[0]}
                          </p>
                          <span className="mx-2 h-4 w-[2.5px] bg-dark"></span>
                          <p className='truncate'>@{post.createdBy.username}</p>
                        </div>

                        <p className='text-xs'>{`${formatUpdatedAt(post.updatedAt)}`}</p>
                      </div>

                      {/* post availaibility */}
                      <div className='text-xs flex flex-col gap-1 items-center'>
                        <button onClick={() => handleDelete(post._id)} className='text-red-500 text-xl'><MdOutlineDeleteOutline /></button>
                        {`${formatDate(post.startDate)} - ${formatDate(post.endDate)}`}
                      </div>

                    </div>

                    {/* post image */}
                    <div className=' '>
                      <img src={post.images[0]} className="w-full max-h-[16rem] my-2 rounded-xl" alt="" />
                    </div>

                    {/* post description */}
                    <div className=''>

                      <div>

                        <p className='text-base md:text-lg'>{post.title}</p>
                        <p className='line-clamp-2 text-sm md:text-base'>{post.description}</p>

                      </div>

                      <div className='text-sm md:text-base'>
                        <p >Email: {post.contactEmail}</p>
                        <p>Phone: {post.contactPhone}</p>
                      </div>
                      {post.skills ? (
                        <p className='text-sm md:text-base'>Skills -{post.skills.skillName}</p>
                      ) : post.category ? (
                        <p className='text-sm md:text-base'>Category-{post.category.categoryName}</p>
                      ) : (
                        <></>
                      )}


                    </div>


                  </div>
                ))
              }
            </div>

          </section>

        ) : (
          <p>You have no posts to show</p>
        )
      )}</>
  )
}

export default Profile