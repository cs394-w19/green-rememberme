import React from "react";
import "./Media.css";
import Coverflow from "react-coverflow";
import ReactPlayer from "react-player";

const Media = ({ mediaStuff }) => {
  var style = {
    margin: "0 auto",
    marginRight: "30px"
  }
  return (
    <div className="maxWidth">
      <Coverflow
        width={900}
        height={200}
        displayQuantityOfSide={1}
        navigation={false}
        enableHeading={false}
        style={style}
      >
        <div
          role="menuitem"
          tabIndex="0"
        >
        </div>
        <img src={require("../../static/1.jpg")} alt="" />

        <img src={require("../../static/2.jpg")} alt="" />

        <img src={require("../../static/3.jpg")} alt="" />

        <img src={require("../../static/daughter.png")} alt="" />

        <img src={require("../../static/grandma.png")} alt="" />

        <img src={require("../../static/mom.png")} alt="" />

      </Coverflow>
    </div>
  );
};
export default Media;
