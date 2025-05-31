import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { FaUserAlt } from "react-icons/fa";
import "./UserProfileCard.css";

const UserProfileCard = () => {
  const phone = localStorage.getItem("phone_number");
  return (
    <div className="userProfileCard">
      <h1>User Profile</h1>
      <div className="userProfile">
        <FaUserAlt className="iconProfilediv" />

        <p>phone:</p>
        <h3>{phone}</h3>
      </div>
    </div>
  );
};

export default UserProfileCard;
