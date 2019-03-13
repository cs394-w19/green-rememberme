import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/";
import "./NewRecipe.css";
import "../App.css";
import Menu from "../components/Menu/Menu";
import { Link, Redirect } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
    flexGrow: 1
  },
  paper: {
    maxWidth: "400px",
    overflow: "auto"
  },
  select: {
    width: 200
  },
  legend: {
    marginTop: theme.spacing.unit * 2,
    maxWidth: 300
  },
  popper: {
    zIndex: 1,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${
          theme.palette.common.white
        } transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${
          theme.palette.common.white
        } transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${
          theme.palette.common.white
        } transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${
          theme.palette.common.white
        }`
      }
    }
  }
});

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.location.email,
      familyID: this.props.location.familyID,
      ingredients: [""],
      instructions: [""],
      title: "",
      complete: false,
      imageArray: [],
      videoURL: "",
      open: false,
      completeOpen: false,
      uploadImageOpen: false,
      uploadImageSuccess: false,
      category: "Breakfast",
      imageNumber: 0
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  toggleMenu() {
    console.log("toggling menu");
    if (this.state.menu) {
      this.setState({
        menu: false
      });
    } else {
      this.setState({
        menu: true
      });
    }
  }

  renderMenu() {
    if (this.state.menu) {
      return (
        <div>
          <div className="menuWrapper" onClick={() => this.toggleMenu()} />
          <Menu
            toggle={() => this.toggleMenu.bind(this)}
            email={this.state.email}
            familyID={this.state.familyID}
          />
        </div>
      );
    }
  }

  addIngredient() {
    this.setState(prevState => ({
      ingredients: [...prevState.ingredients, ""]
    }));
  }

  addInstruction() {
    this.setState(prevState => ({
      instructions: [...prevState.instructions, ""]
    }));
  }

  renderIngredients() {
    const ings = this.state.ingredients.map((val, i) => {
      let varname = "ing" + i;
      let varquantity = "q" + i;
      return (
        <div className="inputContainer" key={i}>
          <input
            className="inputName"
            placeholder="Ingredient"
            onChange={e => this.setState({ [varname]: e.target.value })}
          />
          <input
            className="inputQuantity"
            placeholder="Qty."
            onChange={e => this.setState({ [varquantity]: e.target.value })}
          />
        </div>
      );
    });
    return ings;
  }

  renderInstructions() {
    const ins = this.state.instructions.map((val, i) => {
      let varname = "ins" + i;
      return (
        <div className="inputContainer" key={i}>
          <span>{i + 1}.&nbsp;&nbsp;&nbsp;</span>
          <input
            className="inputInstruction"
            placeholder="Insert instruction"
            onChange={e => this.setState({ [varname]: e.target.value })}
          />
        </div>
      );
    });
    return ins;
  }

  createRecipeObject() {
    let recipe = {
      ingredients: [],
      instructions: [],
      imageArray: [],
      videoURL: "",
      title: "",
      description: "",
      comments: [],
      family: "",
      category: ""
    };
    var i;
    for (i = 0; i < this.state.ingredients.length; i++) {
      let ingname = "ing" + i;
      let ingq = "q" + i;
      recipe.ingredients.push({
        name: this.state[ingname],
        quantity: this.state[ingq]
      });
    }
    for (i = 0; i < this.state.instructions.length; i++) {
      let insname = "ins" + i;
      recipe.instructions.push(this.state[insname]);
    }
    recipe.title = this.state.title;
    recipe.description = this.state.description;
    recipe.family = this.state.familyID ? this.state.familyID : "no family";
    recipe.imageArray = this.state.imageArray;
    recipe.videoURL = this.state.videoURL
      ? this.state.videoURL
      : "https://www.youtube.com/watch?v=JzJsUW4xV7k";
    recipe.category = this.state.category;

    if (
      recipe.title &&
      recipe.description &&
      recipe.category &&
      recipe.instructions.length != 0 &&
      recipe.ingredients.length != 0 &&
      recipe.imageArray.length != 0
    ) {
      this.writeRecipe(recipe);
    } else {
      alert("Make sure to fill out everything!");
    }
  }

  async writeRecipe(recipe) {
    console.log("there she goes");
    let val = await this.props.firebase.writeRecipe(recipe);
    this.setState({ complete: true });
  }

  handleUploadStart = () =>
    this.setState({ isUploading: true, progress: 0, uploadImageOpen: true });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = async (filename) => {
    this.setState(prev => {
      return{
        avatar: filename,
        progress: 100,
        isUploading: false,
        uploadImageOpen: false,
        uploadImageSuccess: true,
        imageNumber: prev.imageNumber + 1
      }  
    });
    //let returnURL = await this.props.firebase.saveURL(filename, this.state.recipeID);
    this.props.firebase.storage
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState(prev => ({
          imageArray: [`${url}`, ...prev.imageArray]
        }));
      });
  };

  handleChange = e => {
    this.setState({
      videoURL: e.target.value
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleOK = () => {
    this.setState({ open: false, completeOpen: true });
    console.log(this.state.videoURL);
  };

  handleCompleteClose = () => {
    this.setState({ completeOpen: false });
  };

  handleImageComplete = () => {
    this.setState({ uploadImageSuccess: false });
  };

  render() {
    if (this.state.complete) {
      return (
        <Redirect
          to={{
            pathname: "/home",
            email: this.state.email,
            familyID: this.state.familyID
          }}
        />
      );
    }
    return (
      <div className="App">
        {/* We will eventually want to move all this logic into a separate component
          so we can access multiple recipes  */}
        <div className="appLogo">
          <Link
            to={{
              pathname: "/home",
              email: this.state.email,
              familyID: this.state.familyID
            }}
          >
            <img className="backImg" src="/back.png" alt="back" />
          </Link>
          <img className="logoImg" src="/logo.png" alt="logo" />
          <img
            className="menuImg"
            src="/menu.png"
            alt="menu"
            onClick={() => this.toggleMenu()}
          />
        </div>

        <div className="header">New Recipe</div>

        <div className="section">
          <div className="sectionHeader">Recipe Name</div>

          <input
            className="inputTitle"
            placeholder="Insert Recipe Name"
            onChange={e => this.setState({ title: e.target.value })}
          />
        </div>

        <div className="section">
          <div className="sectionHeader">Recipe Description</div>

          <input
            className="inputTitle"
            placeholder="Who created this recipe?"
            onChange={e => this.setState({ description: e.target.value })}
          />
        </div>

        <div className="section">
          <div className="sectionHeader">Recipe Category</div>
          <select
            className="inputCategory"
            value={this.state.category}
            onChange={e => this.setState({ category: e.target.value })}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        <div className="section">
          <div className="sectionHeader">Ingredients</div>
          {this.renderIngredients()}
          <button
            className="addIngredient"
            onClick={() => this.addIngredient()}
          >
            <img src="/plus.png" className="addIngredientImg" alt="" />
            add ingredient
          </button>
        </div>

        <div className="section">
          <div className="sectionHeader">Instructions</div>
          {this.renderInstructions()}
          <button
            className="addIngredient"
            onClick={() => this.addInstruction()}
          >
            <img src="/plus.png" className="addIngredientImg" alt="" />
            add instruction
          </button>
        </div>
        <p style={{textAlign: "center"}}>You have uploaded {this.state.imageNumber} photos! </p>

        <button
          className="addIngredient"
          onClick={this.handleClickOpen}
          style={{
            float: "left",
            width: "40%",
            marginLeft: "8%",
            height: "32px"
          }}
        >
          <img src="/plus.png" className="addIngredientImg" alt="" />
          add video link
        </button>

        <br />
        <div
          style={{
            marginTop: "-40px",
            marginBottom: "20px"
          }}
        >
          <MuiThemeProvider theme={theme}>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Paste your Youtube link here:
              </DialogTitle>
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
                <Button onClick={this.handleOK} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={this.state.completeOpen}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Link upload successfully! "}
              </DialogTitle>
              <DialogActions>
                <Button
                  onClick={this.handleCompleteClose}
                  color="primary"
                  autoFocus
                >
                  Great!
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={this.state.uploadImageOpen}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {this.state.isUploading && (
                  <p>Progress: {this.state.progress}</p>
                )}
              </DialogTitle>
            </Dialog>

            <Dialog
              open={this.state.uploadImageSuccess}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Image upload successfully!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You can upload more as you wish!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleImageComplete}
                  color="primary"
                  autoFocus
                >
                  Yay!
                </Button>
              </DialogActions>
            </Dialog>
          </MuiThemeProvider>
          <br />
          <label className="uploadButton">
            &nbsp;&nbsp; +upload image &nbsp;&nbsp;&nbsp;
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
        </div>

        <button
          className="buttonPrimary"
          onClick={() => this.createRecipeObject()}
          style={{ marginLeft: "20%", marginRight: "20%", width: "60%" }}
        >
          Add recipe!
        </button>
        {this.renderMenu()}
      </div>
    );
  }
}

export default withFirebase(NewRecipe);
