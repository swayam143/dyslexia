import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import { useRef } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CancelIcon from "@mui/icons-material/Cancel";
import { APIURL2 } from "../../utils/APIURL";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export default function EditProfileModal({ open, setOpen, ChildData }) {
  const handleClose = () => setOpen(false);
  const [username, setUsername] = useState("");
  const [file, setFile] = useState();
  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  console.log(ChildData);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setPhoto(e.target.files[0]);
  }

  const handleClearFile = () => {
    setFile(null);
    setPhoto(null);
    fileInputRef.current.value = null;
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="  text-center">Edit Profile !</h2>
          <div className="form-container p-0">
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
                src={file ? file : `${APIURL2}uploads/${ChildData.photo}`}
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
              className="mt-2"
            />
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: "15px" }}
            >
              <button style={{ width: "auto" }} className="px-3 prbutton">
                Submit
              </button>

              <button
                onClick={() => setOpen(false)}
                style={{ width: "auto" }}
                className="secondary-button px-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
