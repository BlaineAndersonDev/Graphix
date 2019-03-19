import React, { Component } from 'react';
import axios from 'axios';
import {Image} from 'cloudinary-react';

class CreateJoke extends Component {
  constructor(props){
    super(props);
    this.state = {
      newAuthor: '',
      newBody: '',
      newimagePublicId: null,
    };
  }

  // Prevent joke creation if any field is empty.
  handleEmptyFields = (event) => {
    event.preventDefault()
    if (!this.state.newAuthor) { // State "newAuthor" is empty
      alert("The Field 'Author' is empty! Cannot create Joke.")
    }
    else if (!this.state.newBody) { // State "newBody" is empty
      alert("The Field 'Body' is empty! Cannot create Joke.")
    }
    // else if (!this.state.newimagePublicId) { // State "newimagePublicId" is empty
    //   alert("No image attached! Cannot create Joke.")
    // }
    else { // All fields hold values
      this.handleSubmit()
    }
  }

  handleAuthorChange = (event) => {
    this.setState({newAuthor: event.target.value})
  }

  handleBodyChange = (event) => {
    this.setState({newBody: event.target.value})
  }

  handleSubmit = (event) => {
    this.handleCreateJoke(this.state.newAuthor, this.state.newBody, this.state.newimagePublicId)
  }

  handleImageUpload = (event) => {
    // If this.state.newimagePublicId is not null, then delete the image based on the publicId provided as the user has changed the image again.
    if (this.state.newimagePublicId !== null) {
      this.handleImageDelete(this.state.newimagePublicId)
      this.setState({newimagePublicId: null})
    }
    const widget = window.cloudinary.openUploadWidget(
      {
        cloud_name: 'BrawnImages',
        upload_preset: 'tester',
        tags: ['blaine']
      }, (error, result) => {
        if (result && result.event === "success") {
          this.setState({newimagePublicId: result.info.public_id})
          widget.close({quiet: true});
        }
      }
    );
    event.preventDefault()
  };

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

  // Create Function & Refresh Jokes
  handleCreateJoke = (author, body, publicId) => {
    axios.post(`/api/jokes/create`, null, {
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
      // Change states to blank for additional jokes.
      this.setState({
        newAuthor: '',
        newBody: '',
        newimagePublicId: null
      })
      // Refresh Jokes Feed.
      this.props.refreshJokes();
    });
  }

  render() {
    let displayImage = null;
    if (!this.state.newimagePublicId) {
      displayImage = (
        <Image cloudName="BrawnImages" publicId="sample" width="300" height="300" crop="scale"/>
      )
    } else {
      displayImage = (
        <Image cloudName="BrawnImages" publicId={this.state.newimagePublicId} width="300" height="300" crop="scale"/>
      )
    }
    return (
      <div id='createJokeContainer' className='container'>
        <div>{displayImage}</div>
        <form onSubmit={this.handleEmptyFields}>
          <label>
            Author:
            <input type="text" value={this.state.newAuthor} onChange={this.handleAuthorChange} />
          </label>
          <label>
            Body:
            <input type="textArea" value={this.state.newBody} onChange={this.handleBodyChange} />
          </label>
          <button onClick={this.handleImageUpload}> Upload Images </button>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateJoke;
