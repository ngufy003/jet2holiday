import './cors-redirect';
import './App.css';
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import ControlButtons from './components/buttons';
import RadioButtons from './components/radioButton';

let globalEditor = null;  



export default function StrudelDemo() {

  const hasRun = useRef(false);

  const ProcessText = () => {

    let replace = ""
    if (document.getElementById('flexRadioDefault2').checked) {
      replace = "_"
    }

    return replace
  };

  const Proc = () => {
    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
    globalEditor.setCode(proc_text_replaced)
  };

  const ProcAndPlay = () => {
    if (globalEditor != null && globalEditor.repl.state.started == true) {
      console.log(globalEditor)
      Proc()
      globalEditor.evaluate();
    }
  };

  const Play = () => globalEditor.evaluate();
  const Stop = () => globalEditor.stop();

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
        Proc()
      })();
      document.getElementById('proc').value = stranger_tune 
    }

  }, []);


  return (
    <div>
      <h2>Strudel Demo</h2>
      <main>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
              <textarea className="form-control" rows="15" id="proc" ></textarea>
            </div>
            <div className="col-md-4">
              <ControlButtons 
                onPlay={Play} 
                onStop={Stop} 
                onProc={Proc} 
                onProcAndPlay={ProcAndPlay} 
                />
              
            </div>
          </div>
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <div id="editor" />
            </div>
            // Radio Buttons Component
            <div className="col-md-4">
              <RadioButtons onChange={ProcessText} 
              />
              
            </div>
          </div>
        </div>

      </main >
    </div >
  );


}

