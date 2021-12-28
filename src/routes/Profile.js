import React from "react";
import { authService } from "fbConfig";
import { useNavigate } from "react-router-dom";

//https://blog.woolta.com/categories/1/posts/211
const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
