import React from 'react'
import { useState, useEffect } from 'react';
import VolunteerForm from './VolunteerForm';
import OrgForm from './OrgForm';

const CreatePost = () => {

  const [role, setRole] = useState()
  const [visibility, setVisibility] = useState('hidden')
  const [qvisibility, setQVisibility] = useState('block')


  const updateRole = () => {
    setQVisibility('hidden')
    setVisibility('block')
    const volunteerCheckbox = document.getElementById('volunteerCheckbox');
    const organisationCheckbox = document.getElementById('organisationCheckbox');
    if (volunteerCheckbox.checked) {
      setRole(true)
    } else if (organisationCheckbox.checked) {
      setRole(false)
    }

  }
  return (
    <div className='mx-2'>
      <div className={`${qvisibility} flex gap-2 text-lg my-4 mx-2`}>
        <p className=''>
          Create post as a:
        </p>
        <input type="checkbox" id="volunteerCheckbox" value="true" onClick={updateRole} />
        <label htmlFor="vehicle1"> Volunteer</label>
        <input type="checkbox" id="organisationCheckbox" value="false" onClick={updateRole} />
        <label htmlFor="vehicle2"> Organisation</label>
      </div>

<section className='flex justify-center'>
  <div className={`${visibility} my-4 mx-2 py-2 bb flex flex-col gap-4 justify-center items-center sm:max-w-[710px]`} >
        {role ? <VolunteerForm /> : <OrgForm />}
      </div>
</section>
      

    </div>
  )
}

export default CreatePost