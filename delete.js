import './cors-redirect';
import './App.css';
import { initStrudel, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import ControlButtons from './components/buttons';
import RadioButtons from './components/radioButton';
import PreprocessTextarea from './components/preprocessTextArea';

let globalEditor = null;  

export default function StrudelDemo() {

  const hasRun = useRef(false);

  const Play = () => globalEditor.evaluate();
  const Stop = () => globalEditor.stop();

  const [getStrudelMusicCode, setStrudelMusciCode ] = useState(stranger_tune) 

  useEffect(() => {

    if (!hasRun.current) {
      hasRun.current = true;
      (async () => {
        await initStrudel();

        globalEditor = new StrudelMirror({
          defaultOutput: webaudioOutput,
          getTime: () => getAudioContext().currentTime,
          transpiler,
          root: document.getElementById('editor'),
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
        // Run this first so that the editor is populated
        // prevent null reference
        globalEditor.setCode(getStrudelMusicCode);
      })();
      document.getElementById('proc').value = stranger_tune 
    }
    else {
        // Update the editor content when getStrudelMusicCode changes
     if (globalEditor) globalEditor.setCode(getStrudelMusicCode);
    }
      
  }, [getStrudelMusicCode]);


  return (
    <div>
      <h2>Strudel Demo</h2>
      <main>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <PreprocessTextarea defaultValue={getStrudelMusicCode} onChange={(e) => setStrudelMusciCode(e.target.value)} />
            </div>
            <div className="col-md-4">
              <ControlButtons 
                onPlay={Play} 
                onStop={Stop} 

                />
              
            </div>
          </div>
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <div id="editor" />
            </div>
            <div className="col-md-4">
              <RadioButtons 
              />
              
            </div>
          </div>
        </div>

      </main >
    </div >
  );


}

