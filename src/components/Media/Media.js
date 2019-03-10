import React, { Component } from "react";
import "./Media.css";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";
import FileUploader from "react-firebase-file-uploader";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: blue
  },
  typography: { useNextVariants: true }
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    maxWidth: "400px",
    overflow: "auto"
  },
  select: {
    width: 200,
  },
  legend: {
    marginTop: theme.spacing.unit * 2,
    maxWidth: 300,
  },
  popper: {
    zIndex: 1,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.common.white} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.common.white} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.common.white} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.common.white}`,
      },
    },
  },
});

class Media extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUploading: false,
      progress: 0,
      imageArray: [],
      videoURL: "",
      open: false,
      placement: "bottom",
      disablePortal: false
    };
  }

  componentDidMount() {
    this.initMedia();
  }

  initMedia(){
    let initialArray = [];
    let video = "";
    console.log("id: ", this.props.recipeID)
    this.props.firebase.db.collection("recipes").doc(this.props.recipeID).get().then(ref => {
      if (!ref.exists) {
        console.log("No such family ID!");
      } else {
        console.log("Family members are: ", ref.data().recipe.imageArray);
        initialArray = ref.data().recipe.imageArray;
        video = ref.data().recipe.videoURL;
        console.log(video);
      }
    }).then(() => {
      if(video == undefined){
        video = "https://www.youtube.com/watch?v=klVWGHtRTuE";
      }
      console.log("initialArray is: ", initialArray);
      this.setState({
        imageArray: initialArray,
        videoURL: video
      })
    })
  }

  // handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  // handleProgress = progress => this.setState({ progress });
  // handleUploadError = error => {
  //   this.setState({ isUploading: false });
  //   console.error(error);
  // };
  // handleUploadSuccess = async (filename) => {
  //   this.setState({
  //     avatar: filename,
  //     progress: 100,
  //     isUploading: false
  //   });
  //   //let returnURL = await this.props.firebase.saveURL(filename, this.state.recipeID);
  //   this.props.firebase.storage.ref("images").child(filename).getDownloadURL().then(url => {

  //     this.setState(prev => ({
  //       imageArray: [`${url}`, ...prev.imageArray]
  //     }))
  //     console.log("before update")
  //     this.props.firebase.db.collection("recipes").doc(this.props.recipeID).update({
  //       "recipe.imageArray": this.state.imageArray
  //     });
  //     console.log("after update")

  //   }
  //   );
  // };

  // handleChange = e => {
  //   this.setState({
  //     videoURL: e.target.value
  //   });
  // };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  // handleOK = () => {
  //   this.props.firebase.db.collection("recipes").doc(this.props.recipeID).update({
  //     "recipe.videoURL": this.state.videoURL
  //   });
  //   this.setState({ open: false });
  // };

  render() {
    const { open, placement } = this.state;
    return (
      <div className="mediaPart">
        <div style={{boxShadow: "1px 1px 3px 1px #999"}}>
        <Carousel infiniteLoop={true} swipeable={true} emulateTouch={true} dynamicHeight={true} swipeScrollTolerance={5} transitionTime={100} useKeyboardArrows={true} showStatus={false} showArrows={true} showThumbs={false}>
          <div className="player">
            <ReactPlayer
              width={"auto"}
              height={"180px"}
              pip={true}
              url={this.state.videoURL}
              playing={false}
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 0,
                    controls: 2,
                    fs: 1,
                    playsinline: 0
                  }
                }
              }}
            />
            <br />
          </div>

          {this.state.imageArray.map(url => (
            <img key={url} src={url} alt="" style={{height: "200px", width: "auto"}}/>
          ))}

          <img src="https://firebasestorage.googleapis.com/v0/b/remember-me-green.appspot.com/o/images%2F2.jpg?alt=media&token=f168afbe-c85c-49b2-bc33-db4e37485bb0" style={{height: "200px", width: "auto"}}/>

          <img src="https://firebasestorage.googleapis.com/v0/b/remember-me-green.appspot.com/o/images%2F3.jpg?alt=media&token=04c5de5d-14e2-4d8a-9a75-bebd72408d4b" style={{maxHeight: "200px", width: "auto"}}/>

        </Carousel>
        </div>
        <br />
        {/* <br />
        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        <br />
        <div style={{
          marginTop: "-40px",
          marginBottom: "20px"
        }}>
          <MuiThemeProvider theme={theme}>
            <Button
              onClick={this.handleClickOpen}
              color="primary"
              variant="contained"
              disableRipple
              buttonRef={node => {
                this.anchorEl = node;
              }}
              style={{
                float: "left",
                width: "140px",
                height: "34px",
                marginLeft: "10%",
                marginTop: "14px",
                fontVariant: "normal"
              }}
            >
              Upload Video
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Paste your Youtube link here:</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  The carousel will show your video with your provided link.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Video Link"
                  type="email"
                  fullWidth
                  onChange={this.handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={this.handleOK} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>

          </MuiThemeProvider>
          <br />
          <label className="uploadButton"
            style={{
              backgroundColor: 'steelblue',
              color: 'white',
              padding: 10,
              borderRadius: 4,
              pointer: 'cursor',
              fontSize: "12px",
              boxShadow: "0px 2px 2px #999"
            }}>
            &nbsp;&nbsp;&nbsp; UPLOAD IMAGE &nbsp;&nbsp;&nbsp;
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
        </div> */}
        <br />
      </div>
    );
  }
}

// Media.propTypes = {
//   classes: PropTypes.object.isRequired
// };
export default Media;
