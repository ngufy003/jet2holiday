import React from 'react';
import useCpm from '../hooks/controlCPM';
import useS1 from '../hooks/controlS1';
import useS5 from '../hooks/controlS5';
import useSS from '../hooks/controlSS';
import useVolume from '../hooks/controlVolume';
import '../controlButton.css';
import useLpf from '../hooks/controlLpf';


function ControlButtons({ initialCpm = 120, onSetCpm, onS1Change, onS5Change, onSSChange, onVolumeChange, onLpfChange}) {
    const { cpm, handleChange } = useCpm(initialCpm, onSetCpm);
    const { s1Checked, handleS1Change } = useS1(false, onS1Change);
    const { s5Checked, handleS5Change } = useS5(false, onS5Change);
    const { sSChecked, handleSSChange } = useSS(false, onSSChange);
    const { volume, handleVolumeChange, handleSliderMove } = useVolume(1, onVolumeChange);
    const { lpf, handleLpfChange, handleSliderMove2 } = useLpf(1000, onLpfChange);


    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text label-text" id="label_cpm" label-text>setCPM</span>
                {/* TODO: add limitor  */}
                <input type="number" className="form-control" id="label_cpm" placeholder="120" 
                    aria-label="cpm" aria-describedby="label_cpm" 
                    value={cpm} min={20} max={400} 
                    onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="speed_range" className="label_fast">LPF: {lpf} </label>
                <input type="range" className="form-range" min="400" max="1000" step="100" 
                    id="lpf_range" value={lpf} 
                    onMouseUp={handleLpfChange} 
                    onChange={handleSliderMove2} /> 
            </div>

            <label className="checkbox-btn ">
                <input id="s1" type="checkbox" checked={s1Checked} onChange={handleS1Change} />
                <span className="checkmark" aria-hidden="true" />
                <span className="label-text ">Mute S1</span>
            </label>

            <label className="checkbox-btn">
                <input id="s5" type="checkbox" checked={s5Checked} onChange={handleS5Change} />
                <span className="checkmark" aria-hidden="true" />
                <span className="label-text">Mute S5</span>
            </label>

            <label className="checkbox-btn">
                <input id="sS" type="checkbox" checked={sSChecked} onChange={handleSSChange} />
                <span className="checkmark" aria-hidden="true" />
                <span className="label-text">Mute S2 & S4</span>
            </label>

            <div>
                <label htmlFor="volume_range" className="label_fast">Master Volume</label>
                <input type="range" className="form-range" min="0.0" max="1" step="0.1" 
                    id="volume_range" value={volume} 
                    onMouseUp={handleVolumeChange} 
                    onChange={handleSliderMove} />
            </div>
    </>
    );
}
export default ControlButtons;