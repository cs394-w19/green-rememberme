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
      familyID: this.props.location.familyID,
      ingredients:[''],
      instructions:[''],
      title:''
    };
  }

  componentDidMount(){
    console.log(this.state)
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
          <span>{i+1}.&nbsp;&nbsp;&nbsp;</span>
          <input className='inputInstruction' onChange={(e)=>this.setState({[varname]:e.target.value})}/>
        </div>
      )
    })
    return ins
  }

  createRecipeObject(){
    let recipe={
      ingredients:[],
      instructions:[],
      imageArray:[],
      videoURL:'',
      title:'',
      comments:[],
      family:''
    }
    var i;
    for (i=0; i < this.state.ingredients.length; i++){
      let ingname = 'ing' + i
      let ingq = 'q' + i
      recipe.ingredients.push({name:this.state[ingname],quantity:this.state[ingq]})
    }
    for (i=0; i < this.state.instructions.length; i++){
      let insname = 'ins' + i
      recipe.instructions.push(this.state[insname])
    }
    recipe.title = this.state.title
    recipe.family = this.state.familyID ? this.state.familyID : 'no family'

    console.log(recipe)
    this.writeRecipe(recipe)
  }

  writeRecipe(recipe){
    console.log('there she goes')
    let val = this.props.firebase.writeRecipe(recipe)
    window.setTimeout(()=>{console.log(val)},2000)
  }



  render() {
    return (
      <div className="App">
        {/* We will eventually want to move all this logic into a separate component
          so we can access multiple recipes  */}
        <div className="appLogo">
          <Link to={{ pathname: "/home", email: this.state.email, familyID: this.state.familyID }}>
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
          <div className="sectionHeader">New Recipe Name</div>
          <input className='inputTitle' onChange={(e)=>this.setState({title:e.target.value})}/>
        </div>



        <div className="section">
          <div className="sectionHeader">Ingredients</div>
          {this.renderIngredients()}
          <button className="addIngredient" onClick={()=>this.addIngredient()}>
            <img src="/plus.png" className="addIngredientImg" alt=""/>
            add ingredient
          </button>
        </div>

        <div className="section">
        <div className="sectionHeader">Instructions</div>
        {this.renderInstructions()}
        <button className="addIngredient" onClick={()=>this.addInstruction()}>
          <img src="/plus.png" className="addIngredientImg" alt=""/>
          add instruction
        </button>
        </div>

        <button className="buttonPrimary" onClick={()=>this.createRecipeObject()}>Add recipe!</button>
        {this.renderMenu()}

      </div>
    );
  }
}

export default withFirebase(NewRecipe);
