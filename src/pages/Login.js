import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(login(data, navigate));
    setLoading(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        password: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  if (loading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue to-red w-screen min-h-screen flex items-center justify-center">
      <div>
        <div className=" bg-white flex items-center justify-center p-10 rounded-lg desktop:w-[500px]">
          <div className="flex flex-col items-center w-full">
            <div className="text-4xl my-4 font-semibold w-full text-center">
              LOGIN
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              {/* Email or User-Name */}
              <div className="flex flex-col items-center my-2 group w-full">
                <label htmlFor="email" className="label-style">
                  E-MAIL OR USER-NAME<sup className=" text-red">*</sup>
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your Email OR User-Name"
                  {...register("email", { required: true })}
                  className="input-style "
                />
                {errors.email && (
                  <span className=" text-red underline animate-bounce">
                    Email OR User-Name is required
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col items-center my-2 mx-auto group w-full">
                <label htmlFor="password" className="label-style">
                  PASSWORD <sup className=" text-red">*</sup>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                  className="input-style "
                />
                {errors.password && (
                  <span className=" text-red underline animate-bounce">
                    password is required
                  </span>
                )}
              </div>

              <div>
                <p className=" w-fit hover:text-red underline my-4 cursor-pointer">
                  Forgot Password?
                </p>
              </div>

              <button type="submit" className="submit-button-style">
                SUBMIT
              </button>
            </form>
            <div>
              <p>
                Didn't have a Account?{" "}
                <span
                  className=" text-red font-semibold underline cursor-pointer hover:text-blue"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
