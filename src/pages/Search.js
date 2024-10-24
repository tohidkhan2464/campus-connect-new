import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { randomSearch } from "../services/operations/searchAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm();

  const submitSearch = (data) => {
    console.log("submitSearch", data);
    reset();
  };

  return (
    <div>
      <div className="mt-16 w-full h-full flex items-center justify-center">
        <div className="w-9/12 mx-auto h-full flex flex-col items-center justify-center">
          <h2 className="text-center text-4xl underline font-semibold">
            Search for ...{" "}
          </h2>
          <div className="w-9/12 mx-auto">
            <div className="flex flex-row justify-between gap-5  mt-10  mx-40 bg-white p-5 py-1 rounded-lg border-[3px] border-secondary-600 z-0">
              <button
                className="submit-button-style max-w-40"
                onClick={() => setSearch("posts")}
              >
                Posts
              </button>
              <button
                className="submit-button-style max-w-40"
                onClick={() => setSearch("users")}
              >
                Users
              </button>
              <button
                className="submit-button-style max-w-40"
                onClick={async() => {
                  setSearch("");
                  await randomSearch(token);
                  navigate("/searchResults");
                }}
              >
                Random
              </button>
            </div>
          </div>

          {search === "posts" && (
            <form
              className="w-9/12 mx-auto"
              onSubmit={handleSubmit(submitSearch)}
            >
              <div className="flex flex-col justify-between mt-16 bg-white p-5 rounded-lg border-[3px] border-secondary-600 z-0">
                <div>
                  <div className="flex gap-x-10 items-center justify-between">
                    <div className="flex flex-col w-[48%]">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter the username of user."
                        className="input-style text-left p-2"
                        {...register("username")}
                      />
                    </div>
                    <div className="flex flex-col w-[38%]">
                      <button className="submit-button-style" type="submit">
                        Search by User
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-x-10 items-center justify-between">
                    <div className="flex flex-col w-[48%]">
                      <input
                        type="text"
                        name="tags"
                        id="tags"
                        placeholder="Enter the tags or captions."
                        className="input-style text-left p-2"
                        {...register("tags")}
                      />
                    </div>
                    <div className="flex flex-col w-[38%]">
                      <button className="submit-button-style" type="submit">
                        Search by Tags
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

          {search === "users" && (
            <form className="w-9/12 mx-auto" onSubmit={submitSearch}>
              <div className="flex flex-col justify-between mt-16 bg-white p-5 rounded-lg border-[3px] border-secondary-600 z-0">
                <div>
                  <div className="flex gap-x-10 items-center justify-between">
                    <div className="flex flex-col w-[48%]">
                      <input
                        type="text"
                        name="name"
                        id="anme"
                        placeholder="Enter the name of user."
                        className="input-style text-left p-2"
                        {...register("name")}
                      />
                    </div>
                    <div className="flex flex-col w-[38%]">
                      <button className="submit-button-style" type="submit">
                        Search by Name
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-x-10 items-center justify-between">
                    <div className="flex flex-col w-[48%]">
                      <input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="Enter the tags or captions."
                        className="input-style text-left p-2"
                        {...register("userName")}
                      />
                    </div>
                    <div className="flex flex-col w-[38%]">
                      <button className="submit-button-style" type="submit">
                        Search by Username
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-x-10 items-center justify-between">
                    <div className="flex flex-col w-[48%]">
                      <input
                        type="text"
                        name="collegeName"
                        id="collegeName"
                        placeholder="Enter the tags or captions."
                        className="input-style text-left p-2"
                        {...register("collegeName")}
                      />
                    </div>
                    <div className="flex flex-col w-[38%]">
                      <button className="submit-button-style" type="submit">
                        Search by College
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
