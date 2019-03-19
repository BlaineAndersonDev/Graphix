import React, { Component } from 'react';
import axios from 'axios';
import './stylesheets/SocialMedia.css';
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class SocialMedia extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      jokes: [],
    };
  }

  async componentDidMount() {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  handleFacebook = () => {
    axios.post(`/api/jokes/cloudinaryDelete`, null, {
      params: {
        publicId: this.props.joke
      }
    })
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
    });
  }

  handleTwitter = () => {

  }

  handlePinterest = () => {

  }

  handleGmail = () => {

  }

// https://github.com/BlaineAndersonDev/SenYours/blob/master/app/views/blog/_social.html.erb

  render() {
    return (
      <div className="ijSocialButtonContainer">
        <button className="ijSocialButton" onClick={this.handleFacebook}>
          <img src="/images/social/facebook.png" alt="Facebook" height="42" width="42">
          </img>
        </button>
        <button className="ijSocialButton" onClick={this.handleTwitter}>
          <img src="/images/social/twitter.png" alt="Twitter" height="42" width="42">
          </img>
        </button>
        <button className="ijSocialButton" onClick={this.handlePinterest}>
          <img src="/images/social/pinterest.png" alt="Pinterest" height="42" width="42">
          </img>
        </button>
        <button className="ijSocialButton" onClick={this.handleGmail}>
          <img src="/images/social/gmail.png" alt="Gmail" height="42" width="42">
          </img>
        </button>
      </div>
    );
  }
}

export default SocialMedia;
