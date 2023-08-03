import { abcjs, selected, state } from "../abc/abchelper.js";
import { d2midi } from "../notes/noteHelper.js";
import { nd } from "../notes/NotesData.js";
import { settings } from "../state/settings.js";
// import ABCJS from '../../plugin/abcjs-6.0.0/abcjs_basic_6.0.0-beta.26'
import ABCJS from "../../../abc/abc.js";
let play_state = {
    state: "stopped",
};
class CursorControl {
    onReady() {
        // let clickEl = document.querySelector(".click-explanation");
        // clickEl.setAttribute("style", "");
    }
    onStart() {
        let svg = document.querySelector("#abc svg");
        let cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
        cursor.setAttribute("class", "abcjs-cursor");
        cursor.setAttributeNS(null, "x1", "0");
        cursor.setAttributeNS(null, "y1", "0");
        cursor.setAttributeNS(null, "x2", "0");
        cursor.setAttributeNS(null, "y2", "0");
        svg.appendChild(cursor);
    }
    onEvent(ev) {
        if (ev.measureStart && ev.left === null) return; // this was the second part of a tie across a measure line. Just ignore it.

        let lastSelection = document.querySelectorAll("#abc svg .highlight");
        for (let k = 0; k < lastSelection.length; k++) lastSelection[k].classList.remove("highlight");

        for (let i = 0; i < ev.elements.length; i++) {
            let note = ev.elements[i];
            for (let j = 0; j < note.length; j++) {
                note[j].classList.add("highlight");
            }
        }

        let cursor = document.querySelector("#abc svg .abcjs-cursor");
        if (cursor) {
            cursor.setAttribute("x1", `${ev.left - 2}`);
            cursor.setAttribute("x2", `${ev.left - 2}`);
            cursor.setAttribute("y1", ev.top);
            cursor.setAttribute("y2", ev.top + ev.height);
        }
    }
    onFinished() {
        let els = document.querySelectorAll("svg .highlight");
        for (let i = 0; i < els.length; i++) {
            els[i].classList.remove("highlight");
        }
        let cursor = document.querySelector("#abc svg .abcjs-cursor");
        if (cursor) {
            cursor.setAttribute("x1", "0");
            cursor.setAttribute("x2", "0");
            cursor.setAttribute("y1", "0");
            cursor.setAttribute("y2", "0");
        }
    }
}
const cursorControl = new CursorControl();
export const synthControl = new ABCJS.synth.SynthController();
function setPlayIcon(img) {
    if (document.getElementById("playi").src.endsWith(img)) return;
    document.getElementById("playi").src = img;
}

function seekToSelection() {
    if (state.state !== "ready") return;
    if (!selected.element || !selected.element.duration) return;
    const el = nd.abc_charStarts[selected.element.startChar];
    if (!el) return;
    const notes = nd.voices[el.voice].notes;
    const note = notes[el.note];
    const s = note.step;
    const last_s = notes[notes.length - 1].step + notes[notes.length - 1].len;
    play_state.synth.seek(s / last_s);
}

function stop() {
    console.log("stop");
    play_state.state = "stopped";
    setPlayIcon("img/toolbar/play.png");
    synthControl.pause();
}

function play(fromSelection) {
    play_state.synth = new ABCJS.synth.CreateSynth();
    synthControl.load("#audio", cursorControl, {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true,
    });
    synthControl.disable(true);

    let AudioContext =
        window.AudioContext || // Default
        window.webkitAudioContext; // Safari and old versions of Chrome
    let myContext = new AudioContext();
    play_state.synth
        .init({
            audioContext: myContext,
            visualObj: abcjs[0],
            options: {
                onEnded: stop,
                onabort: stop,
                // on
            },
        })
        .then(() => {
            synthControl
                .setTune(abcjs[0], false)
                .then(function (response) {
                    const btn = document.querySelector("button.abcjs-midi-start.abcjs-btn");
                    btn.click();
                    // console.log(synthControl.);
                    // synthControl.play();
                    // setPlayIcon("img/stop.png");
                    // play_state.state = "playing";
                })
                .catch(function (error) {
                    console.warn("Audio problem:", error);
                });
            // play_state.synth
            // .prime(() => {})
            // .then((res) => {
            //     console.log(res);
            //     if (fromSelection) {
            //         seekToSelection();
            //     }
            //     play_state.synth.start();
            //     setPlayIcon("img/stop.png");
            // play_state.state = "playing";
            // });
        });
}

export function togglePlay(fromSelection) {
    if (play_state.state === "playing") {
        stop();
    } else {
        play(fromSelection);
    }
}

export function play_pitch(pitch, velocity) {
    ABCJS.synth
        .playEvent(
            [
                {
                    cmd: "note",
                    pitch: pitch,
                    volume: velocity,
                    start: 0,
                    duration: 1,
                    instrument: 0,
                    gap: 0,
                },
            ],
            [],
            100 // a measure takes this number of milliseconds
        )
        .then(function (response) {})
        .catch(function (error) {
            console.error("Error playing note:", error);
        });
}

export function play_note(v, n) {
    if (!settings.editPlayVelocity) return;
    const d = nd.voices[v].notes[n].d;
    if (!d) return;
    play_pitch(d2midi(d) + nd.get_realAlter(v, n), settings.editPlayVelocity);
}
