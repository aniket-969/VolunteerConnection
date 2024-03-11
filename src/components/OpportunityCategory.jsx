import React from 'react'
import { FaWrench } from "react-icons/fa";

const OpportunityCategory = ({ setCategory, setCategoryDescription }) => {


    return (
        <>
            <div className="flex items-center gap-5">
 
                <label htmlFor="opportunityCategory" className="bg-light b w-[60%]"> 
                    Opportunity category:</label>
                <select id="opportunityCategory" className='w-[100%] px-3 py-2 bglight' onChange={(e) => setCategory(e.target.value)}>
                    <option value="eventPlanning">Event Planning</option>
                    <option value="fundraising">Fundraising</option>
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
            <div className="flex items-center gap-3 bglight p-2">
                <FaWrench />
                <textarea
id='opportunityDescripton' name='opportunityDescription'
                    placeholder=" Description"
                    className="bglight w-[100%]"
                    onChange={(e) => setCategoryDescription(e.target.value)}
                />
            </div>
        </>
    )
}

export default OpportunityCategory