import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPostDetails } from '../utils/fetchVolunteerData';
import { formatDate } from '../utils/fetchVolunteerData';
import { formatUpdatedAt } from '../utils/fetchVolunteerData';

const PostDetails = () => {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      try {

        const postData = await fetchPostDetails(postId);
        console.log(postData);
        if (postData.data) {

          setData(postData.data)
          setLoading(false)
        }

      } catch (error) {
        console.error("Error fetching data:", error);

      }
    };

    fetchData();

  }, [])

  const { postId } = useParams()
  console.log(postId);
  console.log(data);
  return (
    <section className='flex justify-center my-5'>
      {loading ? <p>Loading...</p> :

        <div to={`/posts/${data._id}`} key={data._id} className=' flex flex-col gap-4 mx-5 my-2 px-5 py-4 rounded-2xl pop1 md:w-[800px]'>

          {/* data name and username */}
          <div className='flex items-center gap-5 justify-between'>

            {/* data name and username */}
            <div className='flex flex-col'>

              <div className='flex items-center text-sm md:text-lg max-w-[12rem] sm:max-w-[20rem] md:max-w-[30rem] '>
                <p>{data.createdBy.fullName.split(' ')[0]}
                </p>
                <span className="mx-2 h-4 w-[2.5px] bg-dark"></span>
                <p className='truncate '>@{data.createdBy.username}</p>
              </div>

              <p className='text-xs'>{`${formatUpdatedAt(data.updatedAt)}`}</p>
            </div>

            {/* date availaibility */}
            <div className='text-xs'>
              {`${formatDate(data.startDate)} - ${formatDate(data.endDate)}`}
            </div>

          </div>

          {/* data image */}
          <div className=' '>
            <img src={data.images[0]} className="w-full max-h-[350px] md:max-h-[25rem] my-2 rounded-xl" alt="" />
          </div>

          {/* data description */}
          <div className=''>

            <div className='text-base md:text-lg'>
              <p>{data.title}</p>
              <p className='text-sm md:text-base'>{data.description}</p>

            </div>
            <div className='text-sm md:text-base'>
              <p >Email: {data.contactEmail}</p>
              <p>Phone: {data.contactPhone}</p>
            </div>
            {data.skills ? (
              <div className='text-sm md:text-base'>
                <p >Skills -{data.skills.skillName}</p>
                <p>{data.skills.description}</p>
              </div>
              
            ) : data.category ? (
              <div className='text-sm md:text-base'>
                <p >Category-{data.category.categoryName}</p>
                <p>{data.category.description}</p>
              </div>
              
              
            ) : (
              <></>
            )}
          </div>



          <div className='flex justify-center items-center mt-2 '>
            <p className='text-xs flex items-center justify-center w-[19rem] md:text-sm md:w-[150%]'>
              Posted from:{data.location.road} , {data.location.village} , {data.location.county},{data.location.state} , {data.location.country}
            </p>
          </div>

        </div>

      }</section>
  )
}

export default PostDetails