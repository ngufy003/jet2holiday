*   What each of your controls do.
    *   Total of 9 controls:
    *   Preprocess: n/a
    *   Proc & Play: n/a
    *   Play: plays the song presented inside Studel portal
    *   Stop: stops the song presented inside Studel portal
    *   Set CPM: sets the Cycles per Minutes of the whole track. Adjusting the number lower will slow down the song and increasing the number will speed up the song.
    *   LPF: LPF is a slider that will adjust the sound effect to make the sound feel like it is close or far from you. Similar to increasing the volume up and down.
    *   Mute S1: Mute S1 is a toggle that turns on and off sounds track labelled “S1”.
    *   Mute S2: Mute S2 is a toggle that turns on and off sounds track labelled “S2”.
    *   Mute SS: Mute SS is a toggle that turns on and off sounds track labelled “S2” and “S4”.
    *   Master Volume: Master volume is a slider that will adjust the volume of the track.
*   Any quirks or usage guidelines that markers may need to know about.
    *   The D3 graph visualizer goes out of bounds if the CPM is adjusted lower. This occurs because the D3 graph uses data input from the log() function, which measures “duration.” Duration refers to the length of time a tone is emitted. Slowing down the CPM allows more time for the sound to be emitted, while speeding up the CPM reduces the emission time. This results in lower or higher values being recorded in the logs. Currently, to achieve greater resolution in the graph, the y-axis is set to a maximum value of 0.4.
    *   Unable to configure script save and load functionality. A link to your demonstration video.
    *   Link to the video [Web Tech](https://mymailunisaedu-my.sharepoint.com/:f:/g/personal/ngufy003_mymail_unisa_edu_au/IgB8Rneg7HCsTKUbnU6XK_joAZDo32usWiLjub3s4vc9YeM?e=gAM8hZ)
*   Any bonus points you’d like to claim, as well as required evidence.
    *   Limiter on setCPM to prevent code manipulation. The user can either type in values or use the up/down controls to adjust the value. If a number outside the allowed range is entered, it will automatically revert to either the maximum or minimum value.
*   Any song code you’ve used from the Strudel.cc bakery (or any other source).
    *   S1 and S5 are Strudel.cc

s1 : n("0 \[2 4\] <3 5> \[~ <4 1>\]".add("<0 \[0,2,4\]>"))

.scale("C5:minor").release(.5)

.sound("gm\_xylophone").room(.5).log();

s5: note("<\[c2 c3\]\*4 \[bb1 bb2\]\*4 \[f2 f3\]\*4 \[eb2 eb3\]\*4>")

.sound("sawtooth").lpf(${lpf}).slow(2)

*   *   S4 is a beat from artist Switch Angel. They do techno sound tracks

s4: s("sbd:2!4").note("e2").duck("2:3")

  .duckdepth(0.8).duckattack(0.2)

  .almostNever(ply("3"))

  .dec(5).gain(0.3).cut(4).lpf(100)

*   What AI tools you used, and your inputs and outputs (See AI usage guidelines)

| Input: generate comments to function, including parameter, and what it returns |
| --- |
| Output: graph.js, playButtons.js, preprocessTextArea.js, procButtons.js, controlCPM.js, controlLpf.js, controlS1.js, controlS5.js, controlSS.js, controlVolume.js and app.js |
| Input: currently hook function code is located inside the components dedicated file. Refactor the code so that the hook function to be in another file, so that there is a separate file that handles hooks and components. |
| --- |
| Output: AI refactored the files so that the functions handling controlCPM, controlS1, and controlVolume are now located in a folder called hooks.This became the baseline for how I organized and structured my hooks. |
| Input: Add debugging code to graph.js. Because right now, no data is displaying on the d3 graph. |
| --- |
| Output: AI added debugging console.log() statements to each part of the graph.js file.From this, I noticed that LogToNum() is not outputting any console.log() messages.The resulting error was due to it looking for the wrong keyword, which had no value change. |
| Input: what aspect of graph.js code will adjust the resolution of the graph? |
| --- |
| Output: AI suggests targeting const y = d3.scaleLinear().domain([0, maxValue]).range([h, 0]); . This constant controls the y-axis, and lowering the maxValue will increase the graph’s resolution. |
| Input: when I add my background image with “.backgroundImage” the buttons and slides stop working? |
| --- |
| Output: The issue is the z-index: -1 applied to .backgroundImage. This pushes the background behind everything; however, since the background is on the same element as your buttons (the col-md-4 div), it also pushes the buttons behind, making them unclickable. |
| Input: Fix my useEffect() that handles auto updating. Right now not all the inputs are getting changed when the song is playing. |
| --- |
| Output: implementconst newText = felix_tune(cpm, muteS1, muteS5,muteSS, normalizedVolume, lpf);        // Update the song displayed in PreprocessTextArea        setSongText(newText);        if (globalEditor) {            globalEditor.setCode(newText);            if (isPlaying) globalEditor.evaluate();So now the user inputs adjust every time an input is changed with onChange() event. |
