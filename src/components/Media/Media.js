import React, { Component } from "react";
import "./Media.css";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";
import FileUploader from "react-firebase-file-uploader"; 
import uploadPhoto from "../Firebase/firebase";

class Media extends Component {
  state = {
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = (filename, recipeID) => {
    this.setState({ 
      avatar: filename, 
      progress: 100, 
      isUploading: false, 
      avatarURL: uploadPhoto(filename, recipeID) 
    });
    
  };

  render() {
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
          {this.state.avatarURL && <img src={require(this.state.avatarURL)} alt="" />}

          <img src={require("../../static/2.jpg")} alt="" />

          <img src={require("../../static/3.jpg")} alt="" />

        </Carousel>
        <br />
        <br />
        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor' }}>
          Select your awesome image
          <FileUploader
            accept="image/*"
            hidden
            name="avatar"
            storageRef={this.props.firebase.storage.ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </label>
      </div>
    );
  }
}
export default Media;
