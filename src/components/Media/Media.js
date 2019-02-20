import React, { Component } from "react";
import "./Media.css";
import ReactDOM from "react-dom";
import { Carousel } from "react-responsive-carousel";

const Media = ({ mediaStuff }) => {
  return (
    <div className='maxWidth'>
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
          <img src={require("../../static/4.jpg")} alt="" />
        </div>
        <div>
          <img src={require("../../static/5.jpg")} alt="" />
        </div>
        <div>
          <img src={require("../../static/gettyimages-887636042.jpg")} alt="" />
        </div>
      </Carousel>
    </div>
  );
};
export default Media;
