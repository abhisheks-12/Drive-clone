import { useState } from "react";
import React from "react";
import "./Sidebar.css";
import MobileScreenShareIcon from "@material-ui/icons/MobileScreenShare";
import DevicesIcon from "@material-ui/icons/Devices";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CloudDoneOutlinedIcon from "@material-ui/icons/CloudDoneOutlined";
import { Modal } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from "firebase";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handelClose = () => {
    setOpen(false);
  };

  const handelOpen = () => {
    setOpen(true);
  };

  const handelChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handelUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);

    storage
      .ref(`files/${file.name}`)
      .put(file)
      .then((snapshot) => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("myfiles").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              filename: file.name,
              fileURL: url,
              sieze: snapshot._delegate.bytesTransferred,
            });

            setIsUploading(false);
            setFile(null);
            setOpen(false);
          });
      });
  };

  return (
    <>
      <Modal open={open} onClose={handelClose}>
        <div className="modal-pop">
          <form>
            <div className="modalHeading">
              <h3>Select and Upload</h3>
            </div>

            <div className="modalBody">
              {isUploading ? (
                <p className="uploading">Uploading</p>
              ) : (
                <>
                  <input type="file" onChange={handelChange} />
                  <input
                    type="submit"
                    className="post-submit"
                    onClick={handelUpload}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>

      <div className="sidebar">
        <div className="sidebar-btn">
          <button onClick={handelOpen}>
            <img
              src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-add-icon.png"
              alt="logo"
              width="15px"
            />
            <span>Add</span>
          </button>
        </div>

        <div className="sidebar-options">
          <div className="sidebar-option sidebar-option-active">
            <MobileScreenShareIcon></MobileScreenShareIcon>
            <span>
              <strong>My Drive</strong>
            </span>
          </div>

          <div className="sidebar-option">
            <DevicesIcon></DevicesIcon>
            <span>Computers</span>
          </div>

          <div className="sidebar-option">
            <PeopleAltIcon></PeopleAltIcon>
            <span>Shared With Me</span>
          </div>

          <div className="sidebar-option">
            <QueryBuilderOutlinedIcon></QueryBuilderOutlinedIcon>
            <span>Recent</span>
          </div>

          <div className="sidebar-option">
            <StarBorderOutlinedIcon></StarBorderOutlinedIcon>
            <span>Starred</span>
          </div>

          <div className="sidebar-option">
            <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
            <span>Recent</span>
          </div>
        </div>

        <hr></hr>

        <div className="sidebar-options">
          <div className="sidebar-option">
            <CloudDoneOutlinedIcon></CloudDoneOutlinedIcon>
            <span>Storage</span>
          </div>
          <div className="progress-bar">
            <progress size="tiny" value="2" max="15"></progress>
            <span>1.2 GB of 15 GB</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
