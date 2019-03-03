import React, { Component } from "react";
import "./Media.css";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";
import FileUploader from "react-firebase-file-uploader";

class Media extends Component {
  state = {
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    recipeID: "k1r81WuFVK1i5zMiGJ1B"
  };

  componentDidMount() {
    console.log(this.props)
  }

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = async (filename) => {
    this.setState({
      avatar: filename,
      progress: 100,
      isUploading: false
    });
    //let returnURL = await this.props.firebase.saveURL(filename, this.state.recipeID);
    this.props.firebase.storage.ref("images").child(filename).getDownloadURL().then(
      url => this.setState({
        avatarURL: url
      })
    );
  };

  render() {

    return (
      <div className="mediaPart">
        <Carousel>
          <div className="player">
            <ReactPlayer
              width="100%"
              controls
              pip
              url="https://www.youtube.com/watch?v=1StF6gHT4m8"
            />
          </div>
          <img src={this.state.avatarURL} alt="" />

          <img src={require("../../static/2.jpg")} alt="" />

          <img src={require("../../static/3.jpg")} alt="" />

        </Carousel>

        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        <label className="uploadButton" style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor' }}>
          Select your awesome image
          <FileUploader
            accept="image/*"
            hidden
            name="recipe"
            randomizeFilename
            storageRef={this.props.firebase.storage.ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </label>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
  export default Media;
