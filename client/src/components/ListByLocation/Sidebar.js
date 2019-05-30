import React from 'react';
import './map.css';


const Sidebar = (props) => {

  return (
    <div className="sidebar">
      <div className="header">
        <h1>HERE Isoline Explorer</h1>
        <div className="subtitle">HERE Routing Isolines in action.</div>
      </div>
      <div className="content">
        <div className="section">
          <div className="section-title">
            Transporation mode
               </div>
          {/* <div>
            <lui-radiobutton
              onClick={() => props.updateOptions('pedestrian', 'mode')}
              class="lui-small"
            >
              <input
                type="radio"
                name="mode"
                value="pedestrian"
                checked={props.options.mode === 'pedestrian'}
              />
              Pedestrian
                  </lui-radiobutton>
            <lui-radiobutton
              onClick={() => props.updateOptions('car', 'mode')}
              class="lui-small"
            >
              <input
                type="radio"
                checked={props.options.mode === 'car'}

              />
              Car
                  </lui-radiobutton>
          </div> */}
        </div>
        {/* <div className="section">
          <div className="section-title">
            Traffic enabled
               </div>
          <lui-checkbox
            class="lui-small"
            onClick={() => props.updateOptions(!props.options.traffic, 'traffic')}
          >
            <input
              type="checkbox"
              checked={props.options.traffic}
            />
            Traffic
               </lui-checkbox>
        </div> */}

        {/* <div className="section">
          <div className="section-title">
            Time or distance
               </div>
          <lui-radiobutton-group>
            <lui-radiobutton
              onClick={() => props.updateOptions('distance', 'type')}
              class="lui-small"
            >
              <input
                type="radio"
                checked={props.options.type === 'distance'}
              />

              Distance
                  </lui-radiobutton>
            <lui-radiobutton
              onClick={() => props.updateOptions('time', 'type')}
              class="lui-small"
            >
              <input
                type="radio"
                checked={props.options.type === 'time'}
              />
              Time
                  </lui-radiobutton>
          </lui-radiobutton-group>
        </div> */}
        {/* <div className="section">
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
        </div> */}

      </div>
    </div>
  )
}

export default Sidebar;