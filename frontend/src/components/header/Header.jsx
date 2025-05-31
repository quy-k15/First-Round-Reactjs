import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { FaUserAlt } from "react-icons/fa";
import "./Header.css";

const Headers = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (!input.trim()) return;
    onSearch(input); // gửi query lên cha
    navigate("/search");
    setInput("");
  };

  const handleProfileClick = () => {
    navigate("/profilePage");
  };

  return (
    <div className="header">
      <Input.Search
        placeholder="Search GitHub usernames..."
        enterButton="Search"
        onSearch={handleSearchClick}
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className="inputSearch"
      />
      <FaUserAlt onClick={handleProfileClick} className="iconProfile" />
    </div>
  );
};

export default Headers;
