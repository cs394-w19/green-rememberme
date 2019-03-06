import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/";
import "./MyFamily.css";
import "../App.css";
import Menu from "../components/Menu/Menu";
import { Link, Redirect } from "react-router-dom";

class MyFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.location.email,
      familyID: this.props.location.familyID,
      familyEmails: [],
      menu: false,
      complete:false
    };
  }

  async componentDidMount(){
    let familyEmails = await this.props.firebase.getFamily(this.state.familyID)
    window.setTimeout(()=>{console.log('FIREBASE RETURNED: ',familyEmails)},2000)
    if (familyEmails === -1){
      familyEmails = []
    }
    this.setState({familyEmails:familyEmails})
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

  removeFamilyMember(email){
    console.log('removing member ', email)
    let arr = this.state.familyEmails
    arr = arr.filter(e => e !== email);
    this.setState({familyEmails:arr})
  }

  renderEmails(){
    const members = this.state.familyEmails.map((email,i)=>{
      let me = ' (me)'
      if (email === this.state.email){
        return(
          <div key={i} className='familyMember'>
            {email} {me}
          </div>
        )
      }
      return(
        <div key={i} className='familyMember'>
          {email}
          <div className='removeFamilyMember' onClick={()=>this.removeFamilyMember(email)}>X</div>
        </div>
      )
    })
    return members
  }

  async updateFamily(){
    let response = await this.props.firebase.updateFamily(this.state.familyID, this.state.familyEmails)
    this.setState({complete:true})
  }



  render() {
    if (this.state.complete){
      return(<Redirect to={{pathname:'/home',email:this.state.email,familyID:this.state.familyID}}/>)
    }
    return (
      <div className="App">

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


      <div className="section">
        <div className="sectionHeader">My Family</div>
        {this.renderEmails()}
      </div>


          <button
            className="buttonPrimary"
            onClick={() => this.updateFamily()}>
            SAVE
          </button>
          {this.renderMenu()}
        </div>
    );
  }
}

export default withFirebase(MyFamily);
