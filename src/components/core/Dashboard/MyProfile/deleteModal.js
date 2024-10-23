import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { deleteProfile } from "../../../../services/operations/settingsAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const DeleteModal = ({ token, user, deleteModal, setDeleteModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitDeletionForm = (data) => {
    try {
      dispatch(deleteProfile(token, data, navigate));
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="absolute h-screen w-screen mt-0 -top-[5.8rem] -left-16 z-[1000]">
      <div className="mt-16 w-full h-full flex items-center justify-center bg-primary-200 bg-opacity-40 backdrop-blur-md">
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative flex flex-col items-center justify-center bg-white py-10 px-8 rounded-xl border-[3px] border-secondary-600">
            <RxCross2
              onClick={() => {
                setDeleteModal(false);
                navigate("/my-profile");
              }}
              className="absolute top-7 right-7 text-secondary-500 text-2xl cursor-pointer hover:text-secondary-900"
            />
            <div className="bg-primary-100 p-2 rounded-full mb-6">
              <CiTrash className="h-14 w-14 text-black" />
            </div>
            <h1 className="text-2xl text-black font-semibold">
              Delete your Campus Connect Account ?
            </h1>
            <p className="mt-2 text-secondary-500">
              You are requesting to delete userName.
            </p>
            <p className="text-secondary-500">
              You can stop deletion by clicking on cancel button.
            </p>

            <form
              onSubmit={handleSubmit(submitDeletionForm)}
              className="w-full"
            >
              {/* password */}
              <div className="flex flex-col items-center my-4 group w-full">
                <label htmlFor="currentPassword" className="label-style">
                  Confirm Password for deleting the account.
                  <sup className=" text-red">*</sup>
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Enter your Current Password"
                  {...register("currentPassword", { required: true })}
                  className="input-style w-8/12 mt-1"
                />
                {errors.currentPassword && (
                  <span className=" text-red underline animate-bounce">
                    Current Password is required
                  </span>
                )}
              </div>

              <div className="flex flex-row gap-x-4 w-full mx-auto">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteModal(false);
                    navigate("/my-profile");
                  }}
                  className="cancel-button-style"
                >
                  CANCEL
                </button>
                <button type="submit" className="submit-button-style">
                  DELETE ACCOUNT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
