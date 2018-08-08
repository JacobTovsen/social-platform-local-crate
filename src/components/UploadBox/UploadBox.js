import React, { Component } from 'react';
import Uppy from '@uppy/core';
import DragDrop from '@uppy/react/lib/DragDrop';

class UploadBox extends Component {
  uppy = Uppy({
    meta: { type: 'profilePicture' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })
  
  render() {
    this.uppy.on('upload', file => {
      let fileKey = Object.keys(this.uppy.state.files)[0];
      let imageData = this.uppy.state.files[fileKey].data;
      this.props.setImage(imageData);
      this.uppy.state.files = [];
    })

    return (
      <DragDrop
        uppy={this.uppy}
        locale={{
          strings: {
            chooseFile: 'Pick a new avatar'
          }
        }}
        />
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

export default UploadBox;
