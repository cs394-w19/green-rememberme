import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/";
import "./NewRecipe.css";
import "../App.css";
import Menu from "../components/Menu/Menu";
import { Link, Redirect } from "react-router-dom";

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.location.email,
      ingredients:[''],
      instructions:[''],
      title:''
    };
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
          <Menu toggle={() => this.toggleMenu.bind(this)} />
        </div>
      );
    }
  }

  addIngredient(){
    this.setState((prevState) => ({
      ingredients:[...prevState.ingredients, '']
    }))
  }

  addInstruction(){
    this.setState((prevState) => ({
      instructions:[...prevState.instructions, '']
    }))
  }

  renderIngredients(){
    const ings = this.state.ingredients.map((val, i)=>{
      let varname = "ing" + i
      let varquantity = 'q' + i
      return(
        <div className='inputContainer' key={i}>
          <input className='inputName' onChange={(e)=>this.setState({[varname]:e.target.value})}/>
          <input className='inputQuantity' onChange={(e)=>this.setState({[varquantity]:e.target.value})}/>
        </div>
      )
    })
    return ings
  }

  renderInstructions(){
    const ins = this.state.instructions.map((val, i)=>{
      let varname = "ins" + i
      return(
        <div className='inputContainer' key={i}>
          <input className='inputName' onChange={(e)=>this.setState({[varname]:e.target.value})}/>
        </div>
      )
    })
    return ins
  }

  createRecipeObject(){
    let recipe={
      ingredients:[],
      instructions:[],
      media:[],
      title:'',
      comments:[],
      family:''
    }
    var i;
    for (i=0; i < this.state.ingredients.length; i++){
      let ingname = 'ing' + i
      let ingq = 'q' + i
      recipe.ingredients.push({name:this.state[ingname],size:this.state[ingq]})
    }
    for (i=0; i < this.state.instructions.length; i++){
      let insname = 'ins' + i
      recipe.instructions.push(this.state[insname])
    }
    recipe.title = this.state.title
    recipe.family = this.state.familyID

    console.log(recipe)
  }



  render() {
    return (
      <div className="App">
        {/* We will eventually want to move all this logic into a separate component
          so we can access multiple recipes  */}
        <div className="appLogo">
          <img className="mainLogo" src="/logo.png" alt="logo" />
        </div>

        <div className="header">New Recipe</div>

        <div className="section">
        <div className="sectionHeader">New Recipe Name
          <div className="inputContainer">
            <input className='inputName' onChange={(e)=>this.setState({title:e.target.value})}/>
          </div>
        </div>
        </div>

        <div className="section">
        <div className="sectionHeader">Ingredients</div>
        {this.renderIngredients()}
        <div style={{textAlign:'center'}}>
          <div className="addIngredient" onClick={()=>this.addIngredient()}>
            <img src="/plus.png" className="addIngredientImg" alt=""/>
            add ingredient
          </div>
        </div>
        </div>

        <div className="section">
        <div className="sectionHeader">Instructions</div>
        {this.renderInstructions()}
        <div style={{textAlign:'center'}}>
          <div className="addIngredient" onClick={()=>this.addInstruction()}>
            <img src="/plus.png" className="addIngredientImg" alt=""/>
            add instruction
          </div>
        </div>
        </div>

        <button className="buttonPrimary" onClick={()=>this.createRecipeObject()}>Add recipe!</button>

        <Link to={{ pathname: "/home", email: this.state.email }}>
          <button className="buttonPrimary">back</button>
        </Link>

        {this.renderMenu()}

      </div>
    );
  }
}

export default withFirebase(NewRecipe);
