import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import HelpIcon from "@material-ui/icons/Help";
import SettingsIcon from "@material-ui/icons/Settings";
import AppsIcon from "@material-ui/icons/Apps";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Header = ({photoURL}) => {
  return (
    <div className="header">
      <div className="logo">
        <img
          src="data:image/png;base64,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"
          alt="logo"
        />
        <span>Drive</span>
      </div>

      <div className="search-bar">
        <SearchIcon></SearchIcon>
        <input type="text" placeholder="serach"></input>
        <FormatAlignRightIcon></FormatAlignRightIcon>
      </div>

      <div className="icon-options">
        <span>
          <HelpIcon></HelpIcon>
          <SettingsIcon></SettingsIcon>
        </span>
        <span>
          <AppsIcon></AppsIcon>
          <AccountCircleIcon src={photoURL}></AccountCircleIcon>
        </span>
      </div>
    </div>
  );
};

export default Header;
