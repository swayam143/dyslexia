import React, { useRef, useState } from "react";
import * as Validator from "validatorjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { APIURL } from "../utils/APIURL";

const ChildRegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setPhoto(e.target.files[0]);
  }

  const handleClearFile = () => {
    setFile(null);
    setPhoto(null);
    fileInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = { username, password, confirmPassword };

    const checkdata = {
      username: "required",
      password: "required",
      confirmPassword: "required|same:password",
    };

    const validation = new Validator(sendData, checkdata);

    if (validation.fails()) {
      const errorData = Object.values(validation.errors.errors);
      errorData.map((x) => toast.error(`${x}`));
    } else {
      try {
        const uploadData = new FormData();
        uploadData.append("username", username);
        uploadData.append("password", password);
        uploadData.append("photo", photo ? photo : "");

        const response = await axios.post(
          `${APIURL}child/register`,
          uploadData
        );
        if (response.status === 200) {
          toast.success("Registered Successfully");
          navigate("/login");
        } else {
          toast.error("Something went wrong");
        }
        //   toast.success("Child login successful");
        //   navigate("/dashboard");
      } catch (e) {
        // console.log(e.response.data);
        toast.error(e.response.data);
      }
    }
  };

  console.log(photo);

  return (
    <div className="containers">
      <div className="left-section">
        <h2>Welcome!</h2>
        <img
          src="https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Registration"
        />
      </div>
      <div className="right-section">
        <div className="form-container">
          <h2>Child Registration</h2>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                margin: "20px auto",
              }}
              className="d-flex align-items-center justify-content-center relative"
            >
              <Avatar
                src={file ? file : ""}
                sx={{ width: "140px", height: "140px" }}
              />

              <IconButton
                aria-label="upload picture"
                component="label"
                className="icon_btn_cam"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleChange}
                  ref={fileInputRef}
                />
                <PhotoCamera />
              </IconButton>

              {file && (
                <IconButton
                  onClick={handleClearFile}
                  aria-label="upload picture"
                  component="label"
                  className="icon_btn_del"
                  sx={{ color: `var(--501)` }}
                >
                  <CancelIcon />
                </IconButton>
              )}
            </div>
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit" className="prbutton">
              Register
            </button>
          </form>

          <button
            onClick={() => navigate("/login")}
            className="secondary-button"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildRegistrationForm;

//**To be Added in equiptment table ==> equipment type , job no. , client , location , Manufacturers Number , Certificate Number , PO Number , Conformity , First Inspection , Last Inspection , Next Inspection , Bag No
//**Engraved or skn number is same or different if different what we have to choose
//**item is something like serial number right
//**what is date out and date back
//**In PAW tab the columns as less
