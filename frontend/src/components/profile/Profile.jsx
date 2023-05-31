import React, { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { APIURL2 } from "../../utils/APIURL";
import "./profile.css";
import EditProfileModal from "./EditProfileModal";

const Profile = () => {
  const ChildData = useSelector((state) => state.childData.childData);
  const [open, setOpen] = useState(false);
  // console.log(ChildData);

  return (
    <div className="profile-container">
      <h2 className=" my-5 text-center">Welcome, {ChildData.username}!</h2>
      <div className="profile-card d-flex flex-column align-items-center justify-content-cneter">
        <Avatar
          src={`${APIURL2}uploads/${ChildData.photo}`}
          alt="Profile"
          className="profile-avatar"
          sx={{ width: 150, height: 150 }}
        />

        <p className="fw-bold">Username: {ChildData.username}</p>
        <p className="fw-bold">Child ID: {ChildData.childId}</p>
      </div>
      <button className="prbutton w-auto px-3" onClick={() => setOpen(true)}>
        Edit Profile
      </button>
      <EditProfileModal open={open} setOpen={setOpen} ChildData={ChildData} />
    </div>
  );
};

export default Profile;
