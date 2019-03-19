import React, { Component } from 'react';
import axios from 'axios';

class EditJoke extends Component {
  constructor(props){
    super(props);
    this.state = {
      newAuthor: '',
      newBody: '',
      newimagePublicId: '',
    };
  }

  componentDidMount() {
    this.setState({newAuthor: this.props.joke.author})
    this.setState({newBody: this.props.joke.body})
    this.setState({newimagePublicId: this.props.joke.imagePublicId})
  }

  handleAuthorChange = (event) => {
    this.setState({newAuthor: event.target.value})
  }

  handleBodyChange = (event) => {
    this.setState({newBody: event.target.value})
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

  handleSubmit = (event) => {
    this.props.handleUpdateJoke(this.props.joke.id, this.state.newAuthor, this.state.newBody, this.state.newimagePublicId)
  }

  handleCancel = (event) => {
    event.preventDefault();
    this.props.handleCancelEditJoke();
  }

  handleImageUpload = (event) => {
    const widget = window.cloudinary.openUploadWidget(
      {
        cloud_name: 'BrawnImages',
        upload_preset: 'tester',
        tags: ['blaine']
      }, (error, result) => {
        if (result && result.event === "success") {
          // If this.state.newimagePublicId is not null, then delete the image based on the publicId provided as the user has changed the image again.
          if (this.state.newimagePublicId !== null) {
            this.handleImageDelete(this.state.newimagePublicId)
          }
          this.setState({newimagePublicId: result.info.public_id})
          this.props.handleImageChange(this.state.newimagePublicId)
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

  render() {
    return (
      <div style={{backgroundColor: "#ffcc66"}}>
        <form onSubmit={this.handleEmptyFields}>
          <label>
            Author:
            <input type="text" value={this.state.newAuthor} onChange={this.handleAuthorChange} />
          </label>
          <label>
            Body:
            <input type="textArea" value={this.state.newBody} onChange={this.handleBodyChange} />
          </label>
          <button onClick={this.handleImageUpload}> Update Image </button>
          <input type="submit" value="Submit" />
          <button onClick={this.handleCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default EditJoke;
