import React from 'react';
import useCpm from '../hooks/controlCPM';
import useS1 from '../hooks/controlS1';
import { useState } from 'react';
import '../controlButton.css';


function ControlButtons({ initialCpm = 120, onSetCpm, onS1Change}) {
    const { cpm, handleChange } = useCpm(initialCpm, onSetCpm);
    // const [s1Checked, setS1Checked] = useState(false);
    const { s1Checked, handleS1Change } = useS1(false, onS1Change);

    // const handleS1Change = (e) => {
    //     setS1Checked(e.target.checked);
    //     if (onS1Change) {
    //         onS1Change(e.target.checked);
    //     }
    // };

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

            <label className="checkbox-btn ">
                <input id="s1" type="checkbox" checked={s1Checked} onChange={handleS1Change} />
                <span className="checkmark" aria-hidden="true" />
                <span className="label-text ">Mute S1</span>
            </label>

            <label className="checkbox-btn">
                <input id="s2" type="checkbox"  />
                <span className="checkmark" aria-hidden="true" />
                <span className="label-text">Checked checkbox</span>
            </label>

            <div>
                <label htmlFor="speed_range" className="label_fast">Overal Volume</label>
                <input type="range" className="form-range" min="1" max="10" step="0.5" id="volume_range"></input>
            </div>
    </>
    );
}
export default ControlButtons;