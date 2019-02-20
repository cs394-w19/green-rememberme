import React from "react";
import "./Header.css";
import { Image } from "semantic-ui-react";

// Note that since we extracted the title from the props being passed in,
// we no longer need to call this.props.title to reference the title
// We can simply call title instead
const Header = ({ title, subtitle, photo }) => {
  return (
    <div className="Header maxWidth">
      <Image src={photo} size='tiny' verticalAlign='middle' circular/> <span> {title} </span>
      {/* <input type="file" accept="image/*" /> */}
    </div>
  );
};

export default Header;
