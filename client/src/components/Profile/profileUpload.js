// import React from 'react';
// import UploadImage from './UploadImage';


// export default ({ input, label, meta: { error, touched } }) => {
//   return (
//     <div>
//       <label>{label}</label>
//       <button onClick={uploadWidget} className="upload-button">
//         Add a picture of Yourself
//       </button>

//       <input {...input} type="text" style={{ marginBottom: '5px' }} value={imageId} />
//       <div className="red-text" style={{ marginBottom: '20px' }}>
//         {touched && error}
//       </div>
//     </div>
//   )
// }

// let imageId = '';

// const uploadWidget = () => {

//   window.cloudinary.openUploadWidget({ cloud_name: 'aleximages', upload_preset: 'buddy-upload', tags: ['uploaded-image'] },
//     (error, result) => {

//       if (result.event === 'success') {
//         imageId = result.info.public_id;
//         // console.log(result.info.public_id, result.info.signature);
//         // this.setState({ imageId: result.info.public_id });
//         // this.props.storeImage(result.info.public_id, result.info.signature);
//       }
//     });
// }
