import React from 'react';
import useCpm from '../hooks/controlCPM';
import { useState } from 'react';

// function ControlButtons() {
function ControlButtons({ initialCpm = 120, onSetCpm, onS1Change}) {
    const { cpm, handleChange } = useCpm(initialCpm, onSetCpm);
    const [s1Checked, setS1Checked] = useState(false);

    const handleS1Change = (e) => {
        setS1Checked(e.target.checked);
        if (onS1Change) {
            onS1Change(e.target.checked);
        }
    };

    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="label_cpm">setCPM</span>
                <input type="number" className="form-control" id="label_cpm" placeholder="120" aria-label="cpm" aria-describedby="label_cpm" value={cpm} min={20} max={400} onChange={handleChange} />
                {/* <input type="number" className="form-control" id="label_cpm" placeholder="60" aria-label="cpm" aria-describedby="label_cpm"/> */}
            </div>
            <div>
                <label htmlFor="speed_range" className="label_fast">speed</label>
                <input type="range" className="form-range" min="1" max="5" step="0.5" id="speed_range"></input>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="s1" checked={s1Checked} onChange={handleS1Change}/>
                <label className="form-check-label" htmlFor="s1" >
                    Mute S1
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="s2" />
                <label className="form-check-label" htmlFor="s2">
                    Checked checkbox
                </label>
            </div>
            <div>
                <label htmlFor="speed_range" className="label_fast">Overal Volume</label>
                <input type="range" className="form-range" min="1" max="10" step="0.5" id="volume_range"></input>
            </div>
    </>
    );
}
export default ControlButtons;