import React from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";

const Delete = ({props,setShow}) => {
    console.log(props);
  return (
    <>{
        !props? 
        <p className='' onClick={()=>setShow(false)}></p>
        :<div className=''>
            <button className='text-red-500 text-xl'><MdOutlineDeleteOutline/></button>
        </div>
        }</>
  )
}

export default Delete