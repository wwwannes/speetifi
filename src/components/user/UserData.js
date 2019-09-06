import React, {Component} from 'react';

class UserData extends Component{
  constructor(){
    super();

    this.state = {
      userData: []
    }
  }

  componentDidMount(){
    // Get the authenticated user
    this.props.api.getMe()
      .then(
        response => this.setState({userData: response}),
        err => console.log("Error")
      )
  }

  render(){
    return(
      <div className="userdata">
          <img src={this.state.userData.images ? this.state.userData.images[0].url : ""} alt={this.state.userData.display_name}/>
          <span className="username">{this.state.userData.display_name}</span>
      </div>
    )
  }
}

export default UserData;
