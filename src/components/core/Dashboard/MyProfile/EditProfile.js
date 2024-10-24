import EditProfilePicture from "./EditProfilePicture";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { updateProfile } from "../../../../services/operations/settingsAPI";
import { useForm } from "react-hook-form";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];
const years = [1, 2, 3, 4];

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitProfileForm = async (data) => {
    // console.log("DATA EDIT", data);
    data.userName = user.userName;
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE ", error.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      navigate("/my-profile");
    }
  }, [isSubmitSuccessful]);

  return (
    <div>
      <div className="mt-16 w-full h-full flex items-center justify-center">
        <div className="w-8/12 mx-auto h-full flex items-center justify-center">
          <div className="h-full w-full">
            <h1 className="text-center text-4xl underline font-semibold">
              Edit Profile
            </h1>
            {/* profileImage */}
            <div>
              <EditProfilePicture />
            </div>

            <form
              onSubmit={handleSubmit(submitProfileForm)}
              className="w-9/12 mx-auto"
            >
              <div className="flex flex-col justify-between  mt-16  bg-white p-6 rounded-lg border-[3px] border-secondary-600 z-0">
                <div className="flex flex-row w-full items-center justify-center">
                  <p className="text-4xl underline font-semibold">
                    Public Information
                  </p>
                </div>

                {/* firstName lastName  email userName*/}
                <div>
                  {/* First Name - Last Name */}
                  <div className="flex gap-x-10 mt-5 mobile:flex-col mobile:gap-y-4">
                    {/* First Name */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="firstName" className="label-style">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter First Name"
                        className="input-style text-left p-2"
                        {...register("firstName", { required: true })}
                        defaultValue={user?.firstName}
                      />
                      {errors.firstName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter your First Name.
                        </span>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="lastName" className="label-style">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter your Last Name"
                        className="input-style text-left p-2"
                        {...register("lastName", { required: true })}
                        defaultValue={user?.lastName}
                      />
                      {errors.lastName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter your Last Name.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* email User-Name */}
                  <div className="flex gap-x-10 mt-5 mobile:flex-col mobile:gap-y-4 ">
                    {/* Email */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="email" className="label-style">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        disabled
                        placeholder="Enter your Email"
                        className="input-style text-left p-2 cursor-not-allowed"
                        {...register("email")}
                        defaultValue={user?.email}
                      />
                      {errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter your Email.
                        </span>
                      )}
                    </div>

                    {/* User-Name */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="userName" className="label-style">
                        User-Name
                      </label>
                      <input
                        type="text"
                        name="userName"
                        id="userName"
                        disabled
                        placeholder="Enter your User-Name"
                        className="input-style text-left p-2 cursor-not-allowed"
                        {...register("userName")}
                        defaultValue={user?.userName}
                      />
                      {errors.userName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter your User-Name.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/*   gender about contactNumber dateOfBirth */}
                <div>
                  {/* Gender - About */}
                  <div className="flex gap-x-10 mt-5 mobile:mt-4 mobile:flex-col mobile:gap-y-4">
                    {/* Gender */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="gender" className="label-style">
                        Gender
                      </label>
                      <select
                        type="text"
                        name="gender"
                        id="gender"
                        className="input-style text-left p-2 cursor-pointer"
                        {...register("gender")}
                        defaultValue={user?.additionalDetails?.gender}
                      >
                        {genders.map((ele, i) => {
                          return (
                            <option key={i} value={ele}>
                              {ele}
                            </option>
                          );
                        })}
                      </select>
                      {errors.gender && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please Select your Gender.
                        </span>
                      )}
                    </div>

                    {/* About */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="about" className="label-style">
                        Type something your about yourself.
                      </label>
                      <input
                        type="text"
                        name="about"
                        id="about"
                        placeholder="Type something your about yourself."
                        className="input-style text-left p-2"
                        {...register("about")}
                        defaultValue={user?.additionalDetails?.about}
                      />
                      {errors.about && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please type something your about yourself.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone Number - Date of Birth */}
                  <div className="flex gap-x-10 mt-5 mobile:mt-4 mobile:flex-col mobile:gap-y-4">
                    {/* Phone Number */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="contactNumber" className="label-style">
                        Contact Number
                      </label>
                      <input
                        type="number"
                        name="contactNumber"
                        id="contactNumber"
                        placeholder="Enter Contact Number"
                        className="input-style text-left p-2"
                        {...register("contactNumber")}
                        defaultValue={user?.additionalDetails?.contactNumber}
                      />
                      {errors.contactNumber && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          {errors.contactNumber.message}
                        </span>
                      )}
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="dateOfBirth" className="label-style">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        className="input-style text-left p-2"
                        {...register("dateOfBirth")}
                        defaultValue={user?.additionalDetails?.dateOfBirth}
                      />
                      {errors.dateOfBirth && (
                        <span className="-mt-1 text-[12px] bg-richblack-700 text-yellow-100">
                          {errors.dateOfBirth.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex w-full mt-10 items-center justify-center">
                  <p className="text-4xl underline font-semibold">
                    College Information
                  </p>
                </div>

                {/* departmentName Branch/Stream enrollmentNumber year collegeName */}
                <div>
                  {/* branchName - DepartmentName */}
                  <div className="flex gap-x-10 mt-5 mobile:mt-4 mobile:flex-col mobile:gap-y-4">
                    {/* Branch / Stream */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="branchName" className="label-style">
                        Name of your Branch / Stream
                      </label>
                      <input
                        type="text"
                        name="branchName"
                        id="branchName"
                        placeholder="Enter your Branch/Stream Name."
                        className="input-style text-left p-2"
                        {...register("branchName")}
                        defaultValue={user?.additionalDetails?.branchName}
                      />
                      {errors.branchName && (
                        <span className="-mt-1 text-[12px] bg-richblack-700 text-yellow-100">
                          {errors.branchName.message}
                        </span>
                      )}
                    </div>

                    {/* Department Name */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="departmentName" className="label-style">
                        Name of your Department
                      </label>
                      <input
                        type="text"
                        name="departmentName"
                        id="departmentName"
                        placeholder="Enter your Department Name."
                        className="input-style text-left p-2"
                        {...register("departmentName")}
                        defaultValue={user?.additionalDetails?.departmentName}
                      />
                      {errors.departmentName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter the name of your Department.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Enrollment Number year */}
                  <div className="flex gap-x-10 mt-5 mobile:mt-4 mobile:flex-col mobile:gap-y-4">
                    {/* Enrollment Number */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="enrollmentNumber" className="label-style">
                        Enrollment Number
                      </label>
                      <input
                        type="text"
                        name="enrollmentNumber"
                        id="enrollmentNumber"
                        placeholder="Enter your Enrollment/Roll Number"
                        className="input-style text-left p-2"
                        {...register("enrollmentNumber")}
                        defaultValue={user?.additionalDetails?.enrollmentNumber}
                      />
                      {errors.enrollmentNumber && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Plearse enter your Enrollment/Roll Number
                        </span>
                      )}
                    </div>

                    {/* Year */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="year" className="label-style">
                        Year
                      </label>
                      <select
                        type="number"
                        name="year"
                        id="year"
                        className="input-style text-left p-2 cursor-pointer"
                        {...register("year", { required: true })}
                        defaultValue={user?.additionalDetails?.year}
                      >
                        {years.map((ele, i) => {
                          return (
                            <option key={i} value={ele}>
                              {ele}
                            </option>
                          );
                        })}
                      </select>
                      {errors.year && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please select your year.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* College Name - City Name */}
                <div>
                  {/* College Name - City Name */}
                  <div className="flex gap-x-10 mt-5 mobile:mt-4 mobile:flex-col mobile:gap-y-4">
                    {/* College Name */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="collegeName" className="label-style">
                        Name of your College
                      </label>
                      <input
                        type="text"
                        name="collegeName"
                        id="collegeName"
                        placeholder="Enter your College Name."
                        className="input-style text-left p-2"
                        {...register("collegeName")}
                        defaultValue={user?.additionalDetails?.collegeName}
                      />
                      {errors.collegeName && (
                        <span className="-mt-1 text-[12px] bg-richblack-700 text-yellow-100">
                          Please enter the name of your College.{" "}
                        </span>
                      )}
                    </div>

                    {/* City Name */}
                    <div className="flex flex-col w-[48%]">
                      <label htmlFor="cityName" className="label-style">
                        Name of your City
                      </label>
                      <input
                        type="text"
                        name="cityName"
                        id="cityName"
                        placeholder="Enter your City Name."
                        className="input-style text-left p-2"
                        {...register("cityName")}
                        defaultValue={user?.additionalDetails?.cityName}
                      />
                      {errors.cityName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                          Please enter the name of your City.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-x-4 ml-[53%] max-w-[49%] my-10 justify-end items-center">
                  <button
                    type="button"
                    onClick={() => navigate("/my-profile")}
                    className="cancel-button-style"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-button-style">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
