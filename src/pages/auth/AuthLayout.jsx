import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthProvider";

const AuthLayout = () => {

  const { isAuthenticated } = useUserContext();
  console.log(isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <div className="overflow-hidden  md:flex md:gap-2 md:justify-center md:mx-6 md:my-2 h-[95vh]">

            <section className="flex flex-col gap-7  py-8 px-4 md:w-[768px] bbl md:items-start md:justify-center md:border-non lg:px-10">
              <Outlet />
            </section>

            <div className="hidden md:w-[768px] md:flex">
              <img
                className=""
                src="http://res.cloudinary.com/dgyduqoht/image/upload/v1706978426/r456kc6vbha1ivp5uwyh.jpg"
                alt="image"
              />
            </div>

          </div>
        </>
      )}
    </>
  );
};
export default AuthLayout;
