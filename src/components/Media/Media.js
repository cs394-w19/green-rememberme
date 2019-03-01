import React from "react";
import "./Media.css";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";

const Media = ({ mediaStuff }) => {
  var style = {
    margin: "0 auto",
    marginRight: "30px"
  }
  return (
    <div className="maxWidth">
      <Carousel>
        <div>
          <ReactPlayer
            width="100%"
            controls
            pip
            url="https://www.youtube.com/watch?v=1StF6gHT4m8"
            playing
          />
        </div>
        <div>
          <img src={require("../../static/1.jpg")} alt="" />
        </div>
        <img src={require("../../static/1.jpg")} alt="" />

        <img src={require("../../static/2.jpg")} alt="" />

        <img src={require("../../static/3.jpg")} alt="" />

        <img src={require("../../static/daughter.png")} alt="" />

        <img src={require("../../static/grandma.png")} alt="" />

        <img src={require("../../static/mom.png")} alt="" />
      </Carousel>
    </div>
  );
};
export default Media;
