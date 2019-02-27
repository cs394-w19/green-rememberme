import React, { Component } from "react";
import "./Menu.css";
import { Link } from 'react-router-dom'

class Menu extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: this.props.email
    }
    console.log(props)
  }

  componentDidMount(){
    console.log(this.state.email)
  }


  render() {

    return (
      <div>
        <div className='menuContainer'>
          <div className='logoContainer'>
            <img className='logo' src='/logo.png' alt='logo'/>
          </div>
          <Link to={{pathname:'/home',email:this.state.email}}>
            <div className='menuItem'>Home</div>
          </Link>
          <div className='menuItem'>Add Recipe</div>
          <Link to='/'>
            <div className='menuItem'>Sign Out</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Menu;
