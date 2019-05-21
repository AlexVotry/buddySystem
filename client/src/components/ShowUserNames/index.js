import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const ShowUserNames = props => {

  const renderUserNames = () => {
    return props.users.map((user, i) => {
      return (
        <div key={i}>
          <Image cloudName="aleximages" publicId={user.image} style={{marginRight: '10px', borderRadius: '50%'}}>
            <Transformation crop="pad" width="40" height="40" radius="50" />
          </Image>
        {user.userName}
        </div>
      );
    });
  }

  return (
    <div>Going: {renderUserNames()}</div>
  )
}

export default ShowUserNames;
