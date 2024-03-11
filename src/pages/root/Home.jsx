import React, { useEffect, useState } from 'react'
import { fetchDataBySkill, fetchLatestData, fetchNearestData, fetchOnlyOpportunityData, fetchOnlyVolunteerData, fetchVolunteerData, formatDate, formatUpdatedAt } from '../../utils/fetchVolunteerData'
import { useUserContext } from '../../context/AuthProvider'
import Location from '../../components/Location'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCookies } from 'react-cookie'

const Home = () => {

  const [loading, setLoading] = useState(true) 
  const [data, setData] = useState([])
  const { userLocation } = useUserContext()
 
  // console.log(userLocation);

  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const volData = await fetchVolunteerData();

      setData(volData)
      if (volData) setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);

    }
  };

  const handleLatestData = async () => {
    try {

      setLoading(true)
      const latestData = await fetchLatestData()
      console.log(latestData);
      setData(latestData.data)
      setLoading(false);


    } catch (error) {
      console.log(error);
    }
  }

  const handleFetchDataBySkill = async (skill) => {

    try {

      if (skill == "Skills") {

        return;
      }

      setLoading(true)
      const skillData = await fetchDataBySkill(skill)
      if (skillData.data.length === 0) {

        fetchData();
        toast("No data found")
      }
      else {
        console.log(skillData);
        setData(skillData.data)
      }


      setLoading(false)

    } catch (error) {
      console.log(error);
    }
  }

  const handleFetchDataByOpp = async (opportunity) => {
    try {

      if (opportunity == "Opportunity") return;
      setLoading(true)
      const oppData = await fetchDataBySkill(opportunity)
      if (oppData.data.length === 0) {
        fetchData()
        toast("No data found")
      }
      else {
        console.log(oppData);
        setData(oppData.data)
      }

      setLoading(false)

    } catch (error) {

    }
  }

  const handleFetchOnlyVolunteerData = async () => {
    try {
      setLoading(true)
      const volData = await fetchOnlyVolunteerData();
      setData(volData.data)
      setLoading(false)
      console.log(volData);
    } catch (error) {
      console.error("Error fetching volunteer data:", error);
    }
  };

  const handleFetchOnlyOpportunityData = async () => {
    try {
      setLoading(true)
      const oppData = await fetchOnlyOpportunityData();
      setData(oppData.data)

      console.log(oppData);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching volunteer data:", error);
    }
  };

  const handleNearestData = async () => {
    try {
      setLoading(true)
      const nearestData = await fetchNearestData(userLocation.latitude, userLocation.longitude)
      console.log(nearestData);
      // setData(nearestData)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }

  }

  const handleFilterData = (option) => {

    console.log(option);
    switch (option) {
      case 'Volunteers only':
        handleFetchOnlyVolunteerData()
        break;
      case 'Default':
        fetchData()
        break;
      case 'Nearest to you':
        handleNearestData()
        break;
      case 'Opportunity only':
        handleFetchOnlyOpportunityData()
        break;
      case 'Latest':
        handleLatestData()
        break;
    }

  };
  console.log(data);

  return (
    <section className='flex flex-col items-center'>

      <div className='flex flex-col gap-2  md:max-w-[710px] '>

        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 gap-3">
            <p>Loading...</p>
            <div className=" border-4 border-t-4 border-gray-200 h-12 w-12 rounded-full animate-spin text-2xl  ">....</div>

          </div>
        )}

        <div className='flex mt-5 b justify-center items-center gap-3'>
          <label >Filter by :</label>
          <select className='bl p-1.5 text-sm bg-white w-[50%] ' onChange={(e) => handleFilterData(e.target.value)}>
            <option >Default</option>
            <option >Nearest to you</option>
            <option >Volunteers only</option>
            <option > Opportunity only</option>
            <option >Latest</option>

          </select>
        </div>

        <div className='flex m-3 justify-center items-center gap-3 mx-6 '>

          <label >Search by:</label>

          <select id="skills" className="p-1.5  w-[40%] text-sm bg-white bl truncate" onChange={(e) => { handleFetchDataBySkill(e.target.value) }} >
            <option value="">Skills</option>
            <optgroup label="Technical Skills">
              <option value="programming">Programming</option>
              <option value="webDevelopment">Web Development</option>
              <option value="graphicDesign">Graphic Design</option>
            </optgroup>

            <optgroup label="Communication Skills">
              <option value="writing">Writing</option>
              <option value="editing">Editing</option>
              <option value="publicSpeaking">Public Speaking</option>
            </optgroup>

            <optgroup label="Administrative Skills">
              <option value="projectManagement">Project Management</option>
              <option value="eventPlanning">Event Planning</option>
            </optgroup>

            <optgroup label="Creative Skills">
              <option value="artisticAbilities">Artistic Abilities</option>
              <option value="photography">Photography</option>
            </optgroup>

            <optgroup label="Language Skills">
              <option value="fluencyInLanguages">
                Fluency in Multiple Languages
              </option>
            </optgroup>

            <optgroup label="Interpersonal Skills">
              <option value="teamwork">Teamwork</option>
              <option value="leadership">Leadership</option>
            </optgroup>

            <optgroup label="Organizational Skills">
              <option value="timeManagement">Time Management</option>
              <option value="planningAndCoordination">
                Planning and Coordination
              </option>
            </optgroup>

            <optgroup label="Education and Training">
              <option value="tutoring">Tutoring</option>
              <option value="mentoring">Mentoring</option>
            </optgroup>

            <optgroup label="Healthcare Skills">
              <option value="firstAidAndCPR">First Aid and CPR</option>
              <option value="medicalAssistance">Medical Assistance</option>
            </optgroup>

            <optgroup label="Environmental Skills">
              <option value="conservation">Conservation</option>
              <option value="sustainability">Sustainability</option>
            </optgroup>

            <optgroup label="Specialized Skills">
              <option value="legal">Legal</option>
              <option value="financeAndAccounting">Finance and Accounting</option>
            </optgroup>

            <optgroup label="Manual Skills">
              <option value="carpentry">Carpentry</option>
              <option value="plumbing">Plumbing</option>
            </optgroup>

            <optgroup label="Other">
              <option value="otherSkills">Other Skills</option>
            </optgroup>
          </select>
          <select id="opportunityCategory" className='w-[40%] p-1.5 text-sm bl bg-white truncate' onChange={(e) => { handleFetchDataByOpp(e.target.value) }}>
            <option value="">Opportunity</option>
            <option value="fundraising">Fundraising</option>
            <option value="eventPlanning">Event Planning</option>
            <option value="socialMediaManagement">Social Media Management</option>
            <option value="webDevelopment">Web Development</option>
            <option value="graphicDesign">Graphic Design</option>
            <option value="volunteerCoordination">Volunteer Coordination</option>
            <option value="marketing">Marketing</option>
            <option value="dataEntry">Data Entry</option>
            <option value="tutoring">Tutoring or Mentoring</option>
            <option value="environmentalConservation">Environmental Conservation</option>
            <option value="communityOutreach">Community Outreach</option>
            <option value="healthcare">Healthcare Services</option>
            <option value="legalAssistance">Legal Assistance</option>
            <option value="foodDistribution">Food Distribution</option>
            <option value="educationalPrograms">Educational Programs</option>
            <option value="marathon">Marathon</option>
            <option value="other">Other</option>

          </select>

        </div>

        <Location />
        {loading ? <p></p> :

          data.map(post => (

            <div key={post._id} className='pop1 flex flex-col gap-4 mx-5 my-2 px-5 py-4 rounded-2xl  '>

              <div className='flex items-center gap-5 justify-between'>

                {/* post name and username */}
                <div className='flex flex-col '>

                  <div className='flex items-center text-sm md:text-lg max-w-[12rem]'>
                    <p className=''>{post.createdBy.fullName.split(' ')[0]}
                    </p>
                    <span className="mx-2 h-4 w-[2.5px] bg-dark"></span>
                    <p className='truncate'>@{post.createdBy.username}</p>
                  </div>

                  <p className='text-xs'>{`${formatUpdatedAt(post.updatedAt)}`}</p>
                </div>

                {/* post availaibility */}
                <div className='text-xs'>

                  {`${formatDate(post.startDate)} - ${formatDate(post.endDate)}`}
                </div>

              </div>
              <Link to={`/posts/${post._id}`} >
                <div className=' '>
                  {/* post image */}
                  <img src={post.images[0]} className="w-full max-h-[16rem] my-2 rounded-xl sm:max-h-[25rem] " alt="" />
                </div>

                {/* post description */}
                <div className='mt-6'>

                  <div className=''>
                    <p className='text-base md:text-lg'>{post.title}</p>
                    <p className='line-clamp-2 text-sm md:text-base'>{post.description}</p>

                  </div>

                  <div className='text-sm md:text-base'>
                    <p >Email: {post.contactEmail}</p>
                    <p>Phone: {post.contactPhone}</p>
                  </div>

                </div>
                {post.skills ? (
                  <p className='text-sm md:text-base'>Skills -{post.skills.skillName}</p>
                ) : post.category ? (
                  <p className='text-sm md:text-base'>Category-{post.category.categoryName}</p>
                ) : (
                  <></>
                )}
                <div className='flex justify-center items-center mt-3'>
                   <p className='text-xs flex items-center justify-center w-[19rem]'>
                  Posted from:{post.location.road} , {post.location.village} , {post.location.county},{post.location.state} , {post.location.country}
                </p>
                </div>
               


              </Link>


            </div>

          ))

        }
      </div></section>
  )
}

export default Home

