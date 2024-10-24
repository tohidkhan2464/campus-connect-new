/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useSelector } from "react-redux";
import { CiEdit, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  console.log("USER", user);
  return (
    <div>
      <div className="mt-16 w-full h-full flex items-center justify-center">
        <div className="w-8/12 mx-auto h-full flex items-center justify-center">
          {/* Heading */}
          <div className="h-full w-11/12 flex flex-col items-center justify-center gap-y-5">
            <p className="text-center text-4xl underline font-semibold">My Profile</p>
            <div className="flex flex-col justify-center items-center w-10/12 gap-y-10">
              {/* Details div */}
              <div
                className="flex flex-row gap-x-10 items-center justify-between rounded-xl border-[3px] border-secondary-600
               mx-auto w-11/12 bg-white p-8 px-14"
              >
                {/* Profile Photo Div */}
                <Link to={`/my-profile/${user?.userName}`}>
                  <div className="relative border-[2px] border-secondary-600 cursor-pointer group p-2 rounded-full  h-44 w-44">
                    <img
                      src={user?.profileImage}
                      className="h-full w-full rounded-full group-hover:blur-[4px] transition-all duration-200"
                    />

                    <CiEdit className="text-5xl hidden group-hover:flex z-50 text-secondary-900 transition-all duration-200 group-hover:scale-125 cursor-pointer absolute bottom-1 left-[50%] translate-x-[-50%]" />
                  </div>
                </Link>

                {/* Details Div */}
                <div>
                  <div className="">
                    <div className="text-xl flex flex-row gap-x-2 items-center justify-between font-semibold">
                      <p className="underline">{user?.userName}</p>

                      <div className="flex flex-row items-center gap-x-2 text-3xl">
                        <Link to={`/my-profile/${user?.userName}`}>
                          <p className="flex flex-row gap-x-2 hover:text-red whitespace-nowrap font-semibold transition-all duration-200 items-center">
                            <CiEdit className="hover:scale-125 transition-transform duration-200" />
                          </p>
                        </Link>

                        {/* setting button */}
                        <Link to={"/settings"}>
                          <p className="flex flex-row gap-x-2 hover:text-red font-semibold transition-all duration-200 items-center">
                            <CiSettings className=" hover:animate-spin" />
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-2">
                    {/* no of posts */}
                    <p>{user?.posts?.length} Posts</p>
                    {/* no of followers */}
                    <p>{user?.follower?.length} Followers</p>
                    {/* no of followings */}
                    <p>{user?.following?.length} Followings</p>
                  </div>
                  <div className="flex flex-row justify-between gap-x-2">
                    {/* name */}
                    <p>
                      {user?.firstName} {user?.lastName}
                    </p>
                    {/* account Type */}
                    <p className="text-secondary-800 underline">
                      {user?.accountType}
                    </p>
                  </div>
                  <p className="text-sm">{user?.email}</p>{" "}
                  <p className="mt-1 text-secondary-600">
                    {user?.additionalDetails?.about}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
