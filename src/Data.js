import { useState, useEffect } from "react";
import React from "react";
import "./css/data.css";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import { db } from "./firebase";

const Data = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    db.collection("myfiles").onSnapshot((snapshot) => {
      setFiles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  // const formatBytes = (bytes, decimals = 2) => {
  //   if (bytes === 0) return " Bytes";
  //   const k = 1024;
  //   const dm = decimals < 0 ? 0 : decimals;
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat(bytes / Math.pow(k, i).toFixed(dm) + " " + sizes[i]);
  // };

  function bytesToSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }

  return (
    <div className="data">
      <div className="data-header">
        <div className="data-headerLeft">
          <p>My Drive</p>
          <ArrowDropDownOutlinedIcon></ArrowDropDownOutlinedIcon>
        </div>

        <div className="data-headerRight">
          <ListOutlinedIcon></ListOutlinedIcon>
          <InfoOutlinedIcon></InfoOutlinedIcon>
        </div>
      </div>

      <div className="data-content">
        <div className="data-grid">
          {files.map((file) => (
            <div className="data-file">
              <InsertDriveFileOutlinedIcon></InsertDriveFileOutlinedIcon>
              <p>{file.data.filename}</p>
            </div>
          ))}
        </div>

        <div className="data-list">
          <div className="details-row">
            <p>
              <b>
                Name <ArrowDownwardOutlinedIcon></ArrowDownwardOutlinedIcon>
              </b>
            </p>
            <p>
              <b>Owner</b>
            </p>
            <p>
              <b>Last Modified</b>
            </p>
            <p>
              <b>File Size</b>
            </p>
          </div>
          {files.map((file) => (
            <div className="details-row">
              <p>
                <a href={file.data.fileURL} target="_blank">
                  {" "}
                  <InsertDriveFileOutlinedIcon />
                  {file.data.filename}{" "}
                </a>
              </p>
              <p>Owner</p>
              <p>
                {new Date(file.data.timestamp?.seconds * 1000).toUTCString()}
              </p>
              <p>{bytesToSize(file.data.size)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Data;
