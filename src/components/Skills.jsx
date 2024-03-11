import React from "react";
import { FaWrench } from "react-icons/fa";

const Skills = ({ setSkills, setSkillDescription }) => {

  return (
    <>
      <div className="flex items-center gap-5 ">

        <label htmlFor="skills" className="bg-light w-[60%]">Select skills:</label>

        <select id="skills" className="w-[100%] px-3 py-2 bglight" onChange={(e) => setSkills(e.target.value)} >
          <optgroup label="Technical Skills">
            <option className="text-slate-500">Default:</option>
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

      </div>
     
        <div className="flex items-center gap-3 bglight p-2 ">
             <FaWrench />
 
          <textarea id="skillDescription" name="skillDescription"
            placeholder=" Skill Description "
            className="bglight w-[100%]"
            onChange={(e) => setSkillDescription(e.target.value)}
          />
      </div>

    </>
  );
};

export default Skills;
