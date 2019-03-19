import React, { Component } from 'react';

class DeleteJoke extends Component {
  constructor(props){
    super(props);
    this.state = {
      publicId: '',
    };
  }

  handlePublicIdChange = (event) => {
    this.setState({publicId: event.target.value})
  }

  handleSubmit = () => {
    this.props.handleImageDelete(this.state.publicId)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
          PublicId:
          <input
            type="text"
            value={this.state.publicId}
            onChange={this.handlePublicIdChange}
          />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default DeleteJoke;
