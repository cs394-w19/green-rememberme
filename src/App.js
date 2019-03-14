import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Ingredients from "./components/Ingredients/Ingredients";
import Instructions from "./components/Instructions/Instructions";
import Media from "./components/Media/Media";
import Comment from "./components/Comment/Comment";
import CommentSection from "./components/CommentSection/CommentSection";
import Menu from "./components/Menu/Menu";
import AccordionList from "./components/AccordionList/AccordionList";
import photo from "./static/grandma.png";
import { withFirebase } from "./components/Firebase/";
import { FirebaseContext } from "./components/Firebase";
import { Link, Redirect } from "react-router-dom";

class App extends Component {
  state = {
    currentRecipe: {
      ingredients: [],
      instructions: [],
      comments: [],
      imageArray: [],
      videoURL: ""
    },
    menu: false,
    familyID: this.props.location.familyID,
    email: this.props.location.email,
    deleteStage: 1
  };

  async componentDidMount() {
    console.log(this.props.match.params.recipe);
    console.log(this.state);
    console.log(this.props.location.email);
    const recipeRef = await this.props.firebase.getDBRef(
      this.props.match.params.recipe
    );

    recipeRef.onSnapshot(
      async () => {
        const doc = await this.props.firebase.readRecipe(
          this.props.match.params.recipe
        );
        this.setState({ currentRecipe: doc.recipe });
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
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

  renderDelete() {
    if (this.state.deleteStage === 1) {
      return (
        <div
          className="delete"
          onClick={() => this.setState({ deleteStage: 2 })}
        >
          delete receipe
        </div>
      );
    }
    if (this.state.deleteStage === 2) {
      if (this.props.match.params.recipe === "9LkMdpsBJ0mrLdmKmb8n") {
        alert(
          "Sorry MPD2 team,\n\nWe cannot... no, we WILL not delete Banana Babies. You did this to yourself.\n\nLove,\n-394 fam:)"
        );
        return;
      }
      return (
        <div className="delete" onClick={() => this.deleteRecipe()}>
          seriously, delete this recipe
        </div>
      );
    }
  }

  deleteRecipe() {
    this.props.firebase.deleteRecipe(this.props.match.params.recipe);
  }

  render() {
    if (!this.state.currentRecipe) {
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
        <Header
          title={this.state.currentRecipe.title}
          description={this.state.currentRecipe.description}
          subtitle={this.state.currentRecipe.subtitle}
          photo={this.state.currentRecipe.grandmaPic}
        />

        {this.renderMenu()}

        <FirebaseContext.Consumer>
          {firebase => (
            <Media
              firebase={firebase}
              recipeID={this.props.match.params.recipe}
            />
          )}
        </FirebaseContext.Consumer>

        <AccordionList name="Ingredients">
          <FirebaseContext.Consumer>
            {firebase => (
              <Ingredients
                ingredientList={this.state.currentRecipe.ingredients}
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer>
        </AccordionList>
        <AccordionList name="Instructions">
          <Instructions
            instructionsList={this.state.currentRecipe.instructions}
          />
        </AccordionList>
        <FirebaseContext.Consumer>
          {firebase => (
            <CommentSection
              firebase={firebase}
              comments={this.state.currentRecipe.comments}
              recipeID={this.props.match.params.recipe}
              email={this.props.location.email}
            />
          )}
        </FirebaseContext.Consumer>
        {this.renderDelete()}
      </div>
    );
  }
}

export default withFirebase(App);
