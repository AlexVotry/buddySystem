import React from 'react';
import { connect } from 'react-redux';
import { storeImage } from '../../actions';

class UploadImage extends React.Component {
  state = { imageId: '', signature: ''};

  uploadWidget = () => {
    
    window.cloudinary.openUploadWidget({ cloud_name: 'aleximages', upload_preset: 'buddy-upload', tags: ['uploaded-image'] },
      (error, result) => {

        if (result.event === 'success') {
          console.log(result.info.public_id, result.info.signature);
          this.setState({ imageId: result.info.public_id});
          this.props.storeImage(result.info.public_id, result.info.signature);
        }
        
      });
  }

  render() {
    return (
      <div className="upload">
        <button onClick={this.uploadWidget} className="upload-button">
          Add a picture of Yourself
        </button>
      </div>
    );
  }
}

export default connect(null, {storeImage})(UploadImage);