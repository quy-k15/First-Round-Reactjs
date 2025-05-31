import { FaUserAlt } from "react-icons/fa";
import "./UserProfileCard.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const UserProfileCard = () => {
  const phone = localStorage.getItem("phone_number");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("phone_number");
    navigate("/");
  }
  return (
    <div className="userProfileCard">
      <h1>User Profile</h1>
      <div className="userProfile">
        <FaUserAlt className="iconProfilediv" />

        <p>phone:</p>
        <h3>{phone}</h3>
      </div>
      <Button className="btnLogOut" onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default UserProfileCard;
