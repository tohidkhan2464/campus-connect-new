import React from "react";
import "./userInfo.css";
import { useUserStore } from "../../../../lib/userStore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="userinfo">
      <div className="user">

        <img src={user?.profileImage || "./assets/avatar.png"} className="img" alt="" onClick={() => navigate("/my-profile")} />
        <h2 onClick={() => navigate("/my-profile")}>{currentUser?.username}</h2>
      </div>
      <div className="icons">
        <img src="./assets/edit.png" alt="" className="img" onClick={() => navigate(`/my-profile/${currentUser?.username}`)} />
      </div>
    </div>
  );
};

export default UserInfo;