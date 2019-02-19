import React from "react";
import "./Header.css";

// Note that since we extracted the title from the props being passed in,
// we no longer need to call this.props.title to reference the title
// We can simply call title instead
const Header = ({ title, subtitle, photo }) => {
  return (
    <div className="Header">
      <img class="ui avatar image" src={photo} />
      <span>{title}</span>
      {/* <input type="file" accept="image/*" /> */}
    </div>
  );
};

export default Header;
