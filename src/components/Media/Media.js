import React, { Component } from "react";
import "./Media.css";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";
import FileUploader from "react-firebase-file-uploader";

class Media extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: "",
      isUploading: false,
      progress: 0,
      imageArray: [],
      recipeID: "k1r81WuFVK1i5zMiGJ1B"
    };
  }

  componentDidMount() {
    let initialArray = [];
    this.props.firebase.db.collection("images").doc(this.state.recipeID).get().then(ref => {
      if (!ref.exists) {
        console.log("No such family ID!");
      } else {
        console.log("Family members are: ", ref.data().imageArray);
        initialArray = ref.data().imageArray;
      }
      return 0;
    }).then(() => {
      console.log("initialArray is: ", initialArray);
      this.setState({
        imageArray: initialArray
      })
    })
    
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
    this.props.firebase.storage.ref("images").child(filename).getDownloadURL().then(url => {
        
        this.setState(prev => ({
          imageArray: [`${url}`, ...prev.imageArray]
        }))
        console.log("before update")
        this.props.firebase.db.collection("images").doc(this.state.recipeID).update({
          imageArray: this.state.imageArray
        });
        console.log("after update")

      }
    );
  };

  render() {

    return (
      <div className="mediaPart">
        <Carousel infiniteLoop={true} swipeable={true} emulateTouch={true} dynamicHeight={true} swipeScrollTolerance={5} transitionTime={100} useKeyboardArrows={true} showStatus={false} showArrows={false}>
          <div className="player">
            <ReactPlayer
              width={"100%"}
              height={"300px"}
              pip={true}
              url={"https://www.youtube.com/watch?v=1StF6gHT4m8"}
              playing={false}
              config={{
                youtube: {
                  playerVars: { showinfo: 0,
                                controls: 2,
                                fs: 1,
                                playsinline: 0}
                }
              }}
            />
            <br />
          </div>

          {this.state.imageArray.map(url => (
            <img src={url} alt="" />
          ))}
          
          <img src={require("../../static/2.jpg")} alt="" />

          <img src={require("../../static/3.jpg")} alt="" />

        </Carousel>

        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        <label className="uploadButton" style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor' }}>
          Upload your awesome image
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
