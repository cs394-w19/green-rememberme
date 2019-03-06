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
      familyEmails: ['test@test.com', 'test@another.com']
    };
  }

  async componentDidMount(){
    let familyEmails = await this.props.firebase.getFamily(this.state.familyID)
    window.setTimeout(()=>{console.log('FIREBASE RETURNED: ',familyEmails)},2000)
    // this.setState({familyEmails:familyEmails})
    console.log(this.state)
  }

  removeFamilyMember(email){
    console.log('removing member ', email)
  }

  renderEmails(){
    const members = this.state.familyEmails.map((email,i)=>{
      return(
        <div key={i} className='familyMember'>
          {email}
          <div className='removeFamilyMember' onClick={()=>this.removeFamilyMember(email)}>X</div>
        </div>
      )
    })
    return members
  }



  render() {
    return (
      <div className="App">


      <div className="section">
        <div className="sectionHeader">My Family</div>
        {this.renderEmails()}
      </div>


          <button
            className="buttonPrimary"
            onClick={() => this.handleSubmitEmail()}>
            LOGIN
          </button>
        </div>
    );
  }
}

export default withFirebase(MyFamily);
