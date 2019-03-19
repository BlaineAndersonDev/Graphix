import React, { Component } from 'react';
import EditJoke from './EditJoke.js';
import DeleteJoke from './DeleteJoke.js';
import SocialMedia from './SocialMedia.js';
import axios from 'axios';
import {Image} from 'cloudinary-react';
import './stylesheets/Joke.css';
import moment from 'moment';

class Joke extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggleEditMenu: false,
      toggleDeleteMenu: false,
      imageChange: null,
      adminOn: false,
    };
  }

  onEditMenuClick = () => {
    this.setState({toggleEditMenu: true})
  }

  onDeleteMenuClick = () => {
    this.setState({toggleDeleteMenu: true})
  }

  handleCancelEditJoke = () => {
    this.setState({toggleEditMenu: false})
  }

  handleDenyDeleteJoke = () => {
    this.setState({toggleDeleteMenu: false})
  }

  handleImageChange = (imagePublicId) => {
    this.setState({imageChange: imagePublicId})
  }

  handleUpdateJoke = (id, author, body, publicId) => {
    axios.put(`/api/jokes/update/${id}`, null, {
      params: {
        author: author,
        body: body,
        imagePublicId: publicId
      }
    })
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      this.props.refreshJokes();
    });
  }

  handleDeleteJoke = (joke) => {
    const jokeId = joke.id;
    const jokeImagePublicId = joke.imagePublicId;
    axios.delete(`/api/jokes/delete/${jokeId}`, null)
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      this.props.refreshJokes();
    });
    this.handleImageDelete(jokeImagePublicId)
  }

  // Delete image from cloudinary if user changes image mid-creation.
  handleImageDelete = (jokeImagePublicId) => {
    axios.post(`/api/jokes/cloudinaryDelete`, null, {
      params: {
        publicId: jokeImagePublicId
      }
    })
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
    });
  };

  render() {
    let jokeDesc = null;
      if (this.props.joke.body.length > 275) {
        jokeDesc = this.props.joke.body.substr(0, 275) + "..."
      } else {
        jokeDesc = (
          this.props.joke.body
        )
      }

    // UPDATE WITH CHECK FOR ACTUAL USER AVATAR
    let userAvatar = (
      <Image
      cloudName="BrawnImages"
      publicId="seeds/geo_brawn_profile"
      width="75"
      height="75"
      crop="fit"
      className="ijUserAvatar"
      />
    )

    let jokeImage = null;
    if (this.state.imageChange) {
      jokeImage = (
        <Image cloudName="BrawnImages" publicId={this.state.imageChange} width="300" height="400" crop="scale"/>
      )
    } else {
      jokeImage = (
        <Image cloudName="BrawnImages" publicId={this.props.joke.imagePublicId} height="400" width="300" crop="scale"/>
      )
    }

    let editMenu = null;
    if (this.state.toggleEditMenu) {
      editMenu = (
        <EditJoke
          key={this.props.joke.id}
          joke={this.props.joke}
          handleUpdateJoke={this.handleUpdateJoke}
          handleCancelEditJoke={this.handleCancelEditJoke}
          refreshJokes={this.props.refreshJokes}
          handleImageChange={this.handleImageChange}
        />
      )
    } else {
      editMenu = (
        <button onClick={this.onEditMenuClick} className="ijButtonSmall">Edit Joke</button>
      );
    }

    let deleteMenu = null;
    if (this.state.toggleDeleteMenu) {
      deleteMenu = (
        <DeleteJoke
          key={this.props.joke.id}
          joke={this.props.joke}
          handleDeleteJoke={this.handleDeleteJoke}
          handleDenyDeleteJoke={this.handleDenyDeleteJoke}
        />
      )
    } else {
      deleteMenu = (
        <button onClick={this.onDeleteMenuClick} className="ijButtonSmall">Delete Joke</button>
      );
    }

    let adminEditButton = null;
    if (this.state.adminOn) {
      adminEditButton = (
        <div className="ijEdit">
          {editMenu}
        </div>
      )
    } else {
      adminEditButton = null;
    }

    let adminDeleteButton = null;
    if (this.state.adminOn) {
      adminDeleteButton = (
        <div className="ijDelete">
          {deleteMenu}
        </div>
      )
    } else {
      adminDeleteButton = null;
    }

    return (
      <div className="ijContainer">

        <div className="ijLeftBox">
          <div className="ijAvatarTitle">
            <div className="ijAvatar">
              {userAvatar}
            </div>
            <div className="ijTitle">
              {this.props.joke.title}
            </div>
          </div>
          <div className="ijDateAuthor">
            <div className="ijDate">
              {moment(this.props.joke.created_at).format('MMM D YYYY')}
            </div>
            <div className="ijAuthor">
              {this.props.joke.author}
            </div>
          </div>
          <div className="ijDesc">
            {jokeDesc}
          </div>
          <div className="ijEditDelete">
            <div className="ijEdit">
              {adminEditButton}
            </div>
            <div className="ijDelete">
              {adminDeleteButton}
            </div>
          </div>
          <div className="ijReadMoreSocialMedia">
            <div className="ijReadMore">
              <button className="ijButton">READ MORE...</button>
            </div>
            <SocialMedia
              joke={this.props.joke}
            />
          </div>
        </div>

        <div className="ijRightBox">
          <div className="ijImage">{jokeImage}</div>
        </div>

      </div>
    );
  }
}

export default Joke;
