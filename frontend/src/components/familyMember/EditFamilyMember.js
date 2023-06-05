import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CancelIcon from "@mui/icons-material/Cancel";
import { APIURL, APIURL2 } from "../../utils/APIURL";
import axios from "axios";
import { toast } from "react-toastify";
import Validator from "validatorjs";
import { useDispatch } from "react-redux";

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

const EditFamilyMember = ({ open, setOpen, memberData }) => {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [file, setFile] = useState();
  const [photo, setPhoto] = useState(null);
  const [voice, setVoice] = useState(null);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  // const fileVoiceRef = useRef(null);
  const [voiceFile, setVoiceFile] = useState(null);
  const [previewAudio, setPreviewAudio] = useState(null);

  const handleChangeVoice = async (e) => {
    await setPreviewAudio(null);
    const selectedFile = e.target.files[0];
    await setVoiceFile(selectedFile);
    await setPreviewAudio(
      selectedFile ? URL.createObjectURL(selectedFile) : null
    );
  };

  const handleClose = () => {
    setOpen(false);
    setVoiceFile(null);
    setPreviewAudio(null);
  };

  const handleClearAudioFile = () => {
    setVoiceFile(null);
    setPreviewAudio(null);
  };

  console.log(voiceFile);

  useEffect(() => {
    setVoice(memberData?.voice || "");
    setName(memberData?.name || "");
    setRelation(memberData?.relation || "");
  }, [memberData]);

  const updateFamilyMemberData = async () => {
    const checkData = {
      name: "required",
      relation: "required",
    };
    const sendData = { name, relation };

    const validation = new Validator(sendData, checkData);

    if (validation.fails()) {
      const errorData = Object.values(validation.errors.errors);
      errorData.map((x) => toast.error(`${x}`));
    } else {
      try {
        const formData = new FormData();
        formData.append("userId", memberData?.userId);
        formData.append("name", name);
        formData.append("relation", relation);

        // Append photo only if it exists
        if (photo) {
          formData.append("photo", photo);
        }

        if (voiceFile) {
          formData.append("voice", voiceFile);
        }

        const response = await axios.post(`${APIURL}/editUser`, formData);

        if (response.status === 200) {
          toast.success("User information updated successfully");
          const payloadData = {
            childId: memberData?.childId,
            userId: memberData?.userId,
            name,
            relation,
            photo: photo ? photo.name : memberData?.photo,
            voice: voice ? voice.name : memberData?.voice,
          };
          if (photo) {
            payloadData.photo = photo.name;
          }

          if (photo) {
            payloadData.photo = photo.name;
          }

          console.log(payloadData);

          // Update the memberData object with the updated information
          // const updatedMemberData = {
          //   ...memberData,
          //   name: name,
          //   relation: relation,
          // };

          // if (photo) {
          //   updatedMemberData.photo = response.data.photo;
          // }

          // Dispatch an action to update the memberData in Redux store
          // dispatch(updateFamilyMember(updatedMemberData));
          setFile(null);
        } else {
          toast.error("Failed to update user information");
        }
      } catch (error) {
        toast.error("An error occurred while updating user information");
      }
    }
  };

  const handleChange = (e) => {
    setFile(
      e.target.files.length > 0 ? URL.createObjectURL(e.target.files[0]) : null
    );
    setPhoto(e.target.files[0]);
  };

  const handleClearFile = () => {
    setFile(null);
    setPhoto(null);
    fileInputRef.current.value = null;
  };

  // console.log(previewAudio);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2 className="text-center">Edit Family Member</h2>
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
              src={file ? file : `${APIURL2}uploads/${memberData?.photo}`}
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
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2"
          />
          <input
            type="text"
            placeholder="Relation"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className="mt-2"
          />
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ gap: "10px" }}
          >
            {previewAudio && (
              <audio controls>
                <source src={previewAudio} type="audio/mpeg" />
              </audio>
            )}

            {!previewAudio && (
              <audio controls>
                <source src={`${APIURL2}uploads/${voice}`} type="audio/mpeg" />
              </audio>
            )}
            <div>
              {previewAudio && (
                <IconButton
                  onClick={handleClearAudioFile}
                  aria-label="upload picture"
                  component="label"
                  className="cross_icon_audio"
                  sx={{ color: `var(--501)`, display: "block" }}
                >
                  <CancelIcon />
                </IconButton>
              )}
            </div>

            <div className="d-flex align-items-center">
              <input
                type="file"
                accept="audio/*"
                onChange={handleChangeVoice}
                style={{ display: "none" }}
                ref={fileInputRef}
              />

              <button
                style={{ width: "auto" }}
                className="px-3 prbutton mt-0"
                onClick={() => fileInputRef.current.click()}
              >
                Upload
              </button>
            </div>
          </div>

          <div
            style={{ gap: "20px" }}
            className="d-flex align-items-center justify-content-center"
          >
            <button
              style={{ width: "auto" }}
              className="px-3 prbutton"
              onClick={updateFamilyMemberData}
            >
              Submit
            </button>
            <button
              onClick={handleClose}
              style={{ width: "auto" }}
              className="secondary-button px-3"
            >
              Cancel
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default EditFamilyMember;
