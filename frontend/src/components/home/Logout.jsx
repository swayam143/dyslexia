import React from "react";
import "../../styles/form.css";
import { useDispatch } from "react-redux";
import { logoutChild } from "../../redux/childSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: logoutChild });
  };

  return (
    <div>
      <button
        onClick={logout}
        className="secondary-button ms-auto d-block px-3"
        style={{ width: "auto" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
