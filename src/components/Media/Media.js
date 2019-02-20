import React, { Component } from "react";
import "./Media.css";
import ReactDOM from "react-dom";
import { Carousel } from "react-responsive-carousel";

const Media = ({ mediaStuff }) => {
  return (
    <Carousel autopaly>
      <div>
        <img src={require("../../static/1.jpg")} alt="" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={require("../../static/2.jpg")} alt="" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={require("../../static/3.jpg")} alt="" />
        <p className="legend">Legend 3</p>
      </div>
      <div>
        <img src={require("../../static/4.jpg")} alt="" />
        <p className="legend">Legend 4</p>
      </div>
      <div>
        <img src={require("../../static/5.jpg")} alt="" />
        <p className="legend">Legend 5</p>
      </div>
      <div>
        <img src={require("../../static/gettyimages-887636042.jpg")} alt="" />

        <p className="legend">Legend 6</p>
      </div>
    </Carousel>
  );
};
export default Media;
