import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Ingredients from "./components/Ingredients/Ingredients";
import Instructions from "./components/Instructions/Instructions";
import Media from "./components/Media/Media";
import Comment from "./components/Comment/Comment";
import Menu from "./components/Menu/Menu";
import AccordionList from "./components/AccordionList/AccordionList";
import photo from "./static/grandma.png";
import { withFirebase } from "./components/Firebase/";
import { Link } from "react-router-dom";

class App extends Component {
  state = {
    currentRecipe: {
      ingredients: [],
      instructions: []
    },
    menu: false
  };

  async componentDidMount() {
    console.log(this.props.match.params.recipe);
    console.log(this.state.email);
    try {
      const response = await this.props.firebase.readRecipe(
        "k1r81WuFVK1i5zMiGJ1B"
      );
      const recipe = response.recipe;
      this.setState({
        currentRecipe: recipe
      });

      console.log(response.recipe);
    } catch (e) {
      console.log(e);
    }
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

  async componentWillMount() {
    try {
      // this.props.firebase.writeFirebase(
      //   "Michael Guo",
      //   this.state.currentRecipe
      // );
      // const response = await this.props.firebase.readRecipe(
      //   "k1r81WuFVK1i5zMiGJ1B"
      // );
      // console.log(await this.props.firebase.readRecipies());
    } catch (e) {
      console.log(e);
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

        <Media />
        {/* <a href="javascript:;" className="file">
          <p>Upload&nbsp;&nbsp;Photo</p>
          <input accept="image/jpeg, image/png, video/*" disabled={false} type="file" multiple={true} autoComplete="off">
          </input>
        </a> */}

        <AccordionList name="Ingredients">
          <Ingredients ingredientList={this.state.currentRecipe.ingredients} />
        </AccordionList>
        <AccordionList name="Instructions">
          <Instructions
            instructionsList={this.state.currentRecipe.instructions}
          />
        </AccordionList>
        <Comment />
      </div>
    );
  }
}

export default withFirebase(App);
