import React, {useEffect} from 'react';
import axios from 'axios';

const ListByLocation = () => {
  const fetchMap = async () => {
    const geocode = await axios.get('/api/geocode');
    console.log('geo:', geocode.data);
  }

  useEffect(() => {
    fetchMap();
  })


  return (
    <div>List by Location</div>
  )
}

export default ListByLocation;