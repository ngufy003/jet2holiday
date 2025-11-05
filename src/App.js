import './App.css';
import { useEffect, useRef, useState} from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune, felix_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import ControlButtons from './components/controlButtons';
import PlayButtons from './components/playButtons';
import ProcButtons from './components/procButtons';
import PreprocessTextArea from './components/preprocessTextArea';
import Graph from './components/graph';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};


export default function StrudelDemo() {

    const hasRun = useRef(false);
    const [cpm, setCpm] = useState(120);
    const [getSongText, setSongText] = useState(() => felix_tune(120, false));
    const [muteS1, setMuteS1] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const onPlayClick = () => {
            globalEditor.evaluate()
        }
    const onStopClick = () => {
            globalEditor.stop()
        }
    
    // Handle CPM changes
    const setCPM = (newCpm) => {
        setCpm(newCpm);
    };

    // Handle S1 mute/unmute changes
    const handleS1Change = (checked) => {
        setMuteS1(checked);
    };

    // Handle volume changes 
    const handleVolumeChange = (vol) => {
        setVolume(vol);
    };

    // Update song text whenever CPM, muteS1, or volume changes
    useEffect(() => {
        // Convert volume from 1-10 scale to 0-1 for audio gain
        const normalizedVolume = volume / 5;
        const newText = felix_tune(cpm, muteS1, normalizedVolume);
        setSongText(newText);
        globalEditor?.setCode?.(newText);
    }, [cpm, muteS1, volume]);

       

useEffect(() => {

    
    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = felix_tune;

    }
    globalEditor.setCode(getSongText);
}, [getSongText]);

useEffect(() => {
        const newText = felix_tune(cpm, muteS1, volume);
        setSongText(newText);
        globalEditor?.setCode?.(newText);
    }, [cpm, muteS1, volume]);


return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <PreprocessTextArea defaultValue={getSongText} onChange={(e) => setSongText(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        
                        <nav>
                            <ProcButtons />
                            <br />
                            <PlayButtons onPlay={onPlayClick} onStop={onStopClick} />
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <div className="col-md-4">
                        <ControlButtons initialCpm={120} onSetCpm={setCPM} onS1Change={handleS1Change} onVolumeChange={handleVolumeChange} />
                    </div>
                    <div className="col-md-4 ">
                        <Graph />
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}