import React from "react";
import "./Header.css";

// Note that since we extracted the title from the props being passed in,
// we no longer need to call this.props.title to reference the title
// We can simply call title instead
const Header = ({ title }) => {
  return (
    <div>
      <h3>{title}</h3>
    </div>
  );
};

export default Header;
