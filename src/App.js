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
    const [isPlaying, setIsPlaying] = useState(false);
    const [cpm, setCpm] = useState(120);
    const [getSongText, setSongText] = useState(() => felix_tune(120, false));
    const [muteS1, setMuteS1] = useState(false);
    const [muteS5, setMuteS5] = useState(false);
    const [muteSS, setMuteSS] = useState(false);
    const [volume, setVolume] = useState(1);
    const [lpf, setLpf] = useState(1000);

    const onPlayClick = () => {
            setIsPlaying(true);
            globalEditor?.evaluate()
        }
    const onStopClick = () => {
            setIsPlaying(false)
            globalEditor?.stop()
        }
    
    // Handle CPM changes
    const setCPM = (newCpm) => {
        setCpm(newCpm);
    };

    // Handle S1 mute/unmute changes
    const handleS1Change = (checked) => {
        setMuteS1(checked);
    };

     // Handle S5 mute/unmute changes
    const handleS5Change = (checked) => {
        setMuteS5(checked);
    };

     // Handle SS mute/unmute changes
    const handleSSChange = (checked) => {
        setMuteSS(checked);
    };

    // Handle volume changes 
    const handleVolumeChange = (vol) => {
        setVolume(vol);
    };

    // Handle lpf changes 
    const handleLpfChange = (lpf) => {
        setLpf(lpf);
    };
    
    // Handles updating the controls instantly while isPlaying is true.
    useEffect(() => {
        const normalizedVolume = volume / 5;
        const newText = felix_tune(cpm, muteS1, muteS5,muteSS, normalizedVolume, lpf);
        // Update the song displayed in PreprocessTextArea
        setSongText(newText);
        if (globalEditor) {
            globalEditor.setCode(newText);
            if (isPlaying) globalEditor.evaluate();
        }
    }, [cpm, muteS1, muteS5,muteSS, volume, lpf,  isPlaying]);
       

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



return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-8" id='textbox' style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                        <PreprocessTextArea defaultValue={getSongText} onChange={(e) => setSongText(e.target.value)} />
                        <div>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                    </div>
                    <div className="col-md-4 backgroundImage ">
                        <nav>
                            <div className="controls-container" >
                                <ProcButtons />
                                <br />
                                <PlayButtons onPlay={onPlayClick} onStop={onStopClick} />
                                <br />
                                <br />
                                <br />
                                <ControlButtons initialCpm={120} onSetCpm={setCPM} onS1Change={handleS1Change} onS5Change={handleS5Change} onSSChange={handleSSChange} onVolumeChange={handleVolumeChange} onLpfChange={handleLpfChange} />
                                <br />
                                <Graph />
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}