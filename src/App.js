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
import { Link } from "react-router-dom";

class App extends Component {
  state = {
    currentRecipe: {
      ingredients: [],
      instructions: [],
      comments: []
    },
    menu: false
  };

  async componentDidMount() {
    console.log(this.props.match.params.recipe);
    console.log(this.state.email);
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
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        {/* We will eventually want to move all this logic into a separate component
          so we can access multiple recipes  */}
        <div className="appLogo">
          <Link to={{ pathname: "/home", email: this.state.email }}>
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
          subtitle={this.state.currentRecipe.subtitle}
          photo={this.state.currentRecipe.grandmaPic}
        />

        {this.renderMenu()}

        <FirebaseContext.Consumer>
          {firebase => (
            <Media 
              firebase = {firebase}
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
        <CommentSection comments={this.state.currentRecipe.comments} />
      </div>
    );
  }
}

export default withFirebase(App);
