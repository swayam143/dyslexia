import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Validator from "validatorjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APIURL } from "../utils/APIURL";
import axios from "axios";
import { savedChildData } from "../redux/childSlice";
import { useDispatch } from "react-redux";

const ChildLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = { username, password };

    const checkData = {
      username: "required",
      password: "required",
    };

    const validation = new Validator(sendData, checkData);

    if (validation.fails()) {
      const errorData = Object.values(validation.errors.errors);
      errorData.map((x) => toast.error(`${x}`));
    } else {
      try {
        const response = await axios.post(`${APIURL}child/login`, sendData);
        navigate("/profile");
        // console.log(response.data.data);
        toast.success("Child login successful");
        //
        dispatch({ type: savedChildData, payload: response.data.data });
      } catch (e) {
        // console.log(e.response.data);
        toast.error(e.response.data);
      }
    }
  };

  return (
    <div className="containers">
      <div className="left-section">
        <h2>Welcome Back!</h2>
        <img
          src="https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Login"
        />
      </div>
      <div className="right-section">
        <div className="form-container">
          <h2>Child Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="prbutton">
              Login
            </button>
          </form>
          <button
            onClick={() => navigate("/register")}
            className="secondary-button"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildLoginForm;
