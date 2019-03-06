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


      <div className="section">
        <div className="sectionHeader">My Family</div>
        {this.renderEmails()}
      </div>


          <button
            className="buttonPrimary"
            onClick={() => this.updateFamily()}>
            SAVE
          </button>
        </div>
    );
  }
}

export default withFirebase(MyFamily);
