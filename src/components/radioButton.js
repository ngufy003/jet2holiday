import React from 'react';

function RadioButtons({ onChange }) {
  return (
    <>
    <div className="input-group mb-3">
      <span className="input-group-text" id="label_cpm">setCPM</span>
      <input type="text" className="form-control" id="label_cpm" placeholder="60" aria-label="cpm" aria-describedby="label_cpm"/>
    </div>
    <div>
      <label htmlFor="speed_range" className="label_fast">speed</label>
      <input type="range" className="form-range" min="1" max="5" step="0.5" id="speed_range"></input>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id="?"/>
      <label className="container" htmlFor="?">
        Default checkbox
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id="?" />
      <label className="form-check-label" htmlFor="?">
        Checked checkbox
      </label>
    </div>

    
    </>
   
  );
}

export default RadioButtons;