// #TODO move all button components here from their current locations
import React from 'react'

function ControlButtons({ onPlay, onStop, onProc, onProcAndPlay }) {
  return (
    <nav>
      <button className="btn btn-outline-primary me-2" onClick={onProc}>Preprocess</button>
      <button className="btn btn-outline-primary me-2" onClick={onProcAndPlay}>Proc & Play</button>
      <br />
      <button className="btn btn-outline-primary me-2" onClick={onPlay}>Play</button>
      <button className="btn btn-outline-primary" onClick={onStop}>Stop</button>
    </nav>
  );
}
export default ControlButtons;