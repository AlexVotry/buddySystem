import React, {useState} from 'react';
import './map.css';
import Dropdown from '../Dropdown';


const Sidebar = (props) => {
  const [category, setCategory] = useState('');
  const onClick = (e) => {
    props.onClick(e);
    setCategory(e);
  }

  const showCategory = () => {
    if (category) {
      return (
        <div className="section">
          <div className="section-title green">
            {category}
          </div>
        </div>    
      );
    }
  }

  return (
    <div className="sidebar">
      <div className="header">
        <h1>Events On the Map</h1>
        <div className="subtitle">Choose a category and find it on the map</div>
      </div>
      <div className="content">
        <div className="section">
          <Dropdown items={props.categories} title="Categories" onClick={onClick} />
          {showCategory()}
          <div className="section-title">
            Transporation mode
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="pedestrian" id="radioTime" value="car" checked={props.options.mode === 'car' ? true : false} onChange={() => props.updateOptions('car', 'mode')} />
            <label className="form-check-label">
              Car
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="pedestrian" id="radioTime" value="pedestrian" checked={props.options.mode === 'pedestrian' ? true : false} onChange={() => props.updateOptions('pedestrian', 'mode')} />
            <label className="form-check-label">
              Pedestrian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="pedestrian" id="radioTime" value="bicycle" checked={props.options.mode === 'bicycle' ? true : false} onChange={() => props.updateOptions('bicycle', 'mode')} />
            <label className="form-check-label">
              Bicycle
            </label>
          </div>
        </div>
        <div className="section">
          <label className="form-check section-title">
              <input
                className="form-check-input" 
                type="checkbox"
                name="traffic"
                checked={props.options.traffic}
                onChange={() => props.updateOptions(!props.options.traffic, 'traffic')}
                />
              Traffic enabled
            </label>
        </div>

        <div className="section">
          <div className="section-title">
            Time or distance
           </div>

          <div className="form-check">
            <input className="form-check-input" type="radio" name="time" id="radioTime" value="time" checked={props.options.type === 'time' ? true : false} onChange={() => props.updateOptions('time', 'type')} />
              <label className="form-check-label">
                 Time
              </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="distance" id="radioDistance" value="distance" checked={props.options.type === 'distance' ? true : false} onChange={() => props.updateOptions('distance', 'type')} />
              <label className="form-check-label">
                Distance
              </label>
          </div>
        </div>

        <div className="section">
          <div className="section-title">
            Range
          </div>
          <p>
            {
              props.options.type === 'distance' ?
                Math.round(props.options.range * 0.000621371) + ' miles' :
                Math.round(props.options.range / 60) + ' minutes'
            }
          </p>
          <input
            onChange={props.updateRange}
            type="range"
            min={1}
            max={props.max}
            value={props.sliderVal}
            className="slider"
          />
        </div>

      </div>
    </div>
  )
}

export default Sidebar;