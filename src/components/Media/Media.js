import React, { Component } from "react";
import "./Media.css";
import ReactDOM from "react-dom";
import { Carousel } from "react-responsive-carousel";

const Media = ({ mediaStuff }) => {
  return (
    <Carousel autopaly>
      <div>
        <img src={require("../../static/1.jpg")} alt="" />
      </div>
      <div>
        <img src={require("../../static/2.jpg")} alt="" />
      </div>
      <div>
        <img src={require("../../static/3.jpg")} alt="" />
      </div>
      <div>
        <video
          width="100%"
          controls
          src={require("../../static/video.mp4")}
          type="video/mp4"
        />
      </div>
      <div>
        <img src={require("../../static/4.jpg")} alt="" />
      </div>
      <div>
        <img src={require("../../static/5.jpg")} alt="" />
      </div>
      <div>
        <img src={require("../../static/6.jpg")} alt="" />
      </div>
      <div>
        <img src={require("../../static/gettyimages-887636042.jpg")} alt="" />
      </div>
    </Carousel>
  );
};
export default Media;
