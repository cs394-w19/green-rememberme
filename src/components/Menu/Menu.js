import React, { Component } from "react";
import "./Menu.css";
import { Link } from 'react-router-dom'

class Menu extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: this.props.email,
      familyID: this.props.familyID
    }
  }

  componentDidMount(){
    console.log(this.state)
  }


  render() {

    return (
      <div>
        <div className='menuContainer'>
          <div className='logoContainer'>
            <img className='logo' src='/logo.png' alt='logo'/>
          </div>
          <Link to={{pathname:'/home',email:this.state.email,familyID:this.state.familyID}}>
            <div className='menuItem'>Home</div>
          </Link>
          <Link to={{pathname:'/newrecipe',email:this.state.email,familyID:this.state.familyID}}>
            <div className='menuItem'>Add Recipe</div>
          </Link>
          <Link to='/'>
            <div className='menuItem'>Sign Out</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Menu;
