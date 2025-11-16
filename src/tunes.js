//TODO: add a button so that it switches between track
export const stranger_tune = `setcps(0.7);

<p1_Radio>p1: n("0 2 4 6 7 6 4 2")
  .scale("<c3:major>/2")
  .s("supersaw")
  .distort(0.7)
  .superimpose((x) => x.detune("<0.5>"))
  .lpenv(perlin.slow(3).range(1, 4))
  .lpf(perlin.slow(2).range(100, 2000))
  .gain(0.3);
p2: "<a1 e2>/8".clip(0.8).struct("x*8").s("supersaw").note();
// Grabbed from Hacker News: https://news.ycombinator.com/item?id=44939874
// @version 1.2`;


export function felix_tune (cpm = 120, muteS1 = false, muteS5 = false, volume = 1) { 
return `setcpm(${cpm});
${muteS1 ? '_' : ''}s1 : n("0 [2 4] <3 5> [~ <4 1>]".add("<0 [0,2,4]>"))
.scale("C5:minor").release(.5)
.sound("gm_xylophone").room(.5).log();


_s2: note("c2 [eb3,g3]".add("<0 <1 -1>>"))
.adsr("[.1 0]:.2:[1 0]").sound("gm_acoustic_bass")
.room(.7)


_s4: s("sbd:2!4").note("e2").duck("2:3")
  .duckdepth(0.8).duckattack(0.2)
  .almostNever(ply("3"))
  .dec(5).gain(0.3).cut(4).lpf(5000)

${muteS5 ? '_' : ''}s5: note("<[c2 c3]*4 [bb1 bb2]*4 [f2 f3]*4 [eb2 eb3]*4>")
.sound("sawtooth").lpf(1000).slow(2)

all(x => x.gain(${volume}))
// all(x => x.log());

`;
} 
