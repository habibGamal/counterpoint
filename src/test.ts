
import abcjs, { TuneBook } from "abcjs";
class CursorControl {

    onReady() {
        let clickEl = document.querySelector(".click-explanation") as HTMLParagraphElement
        clickEl.setAttribute("style", "");
    };
    onStart() {
        let svg = document.querySelector("#paper svg") as SVGAElement;
        let cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
        cursor.setAttribute("class", "abcjs-cursor");
        cursor.setAttributeNS(null, 'x1', '0');
        cursor.setAttributeNS(null, 'y1', '0');
        cursor.setAttributeNS(null, 'x2', '0');
        cursor.setAttributeNS(null, 'y2', '0');
        svg.appendChild(cursor);

    };
    onEvent(ev) {
        if (ev.measureStart && ev.left === null)
            return; // this was the second part of a tie across a measure line. Just ignore it.

        let lastSelection = document.querySelectorAll("#paper svg .highlight");
        for (let k = 0; k < lastSelection.length; k++)
            lastSelection[k].classList.remove("highlight");

        for (let i = 0; i < ev.elements.length; i++ ) {
            let note = ev.elements[i];
            for (let j = 0; j < note.length; j++) {
                note[j].classList.add("highlight");
            }
        }

        let cursor = document.querySelector("#paper svg .abcjs-cursor");
        if (cursor) {
            cursor.setAttribute("x1", ev.left - 2);
            cursor.setAttribute("x2", ev.left - 2);
            cursor.setAttribute("y1", ev.top);
            cursor.setAttribute("y2", ev.top + ev.height);
        }
    };
    onFinished() {
        let els = document.querySelectorAll("svg .highlight");
        for (let i = 0; i < els.length; i++ ) {
            els[i].classList.remove("highlight");
        }
        let cursor = document.querySelector("#paper svg .abcjs-cursor");
        if (cursor) {
            cursor.setAttribute("x1", '0');
            cursor.setAttribute("x2", '0');
            cursor.setAttribute("y1", '0');
            cursor.setAttribute("y2", '0');
        }
    };
}

let cursorControl = new CursorControl();

let currentTune = 0;

let synthControl: abcjs.SynthObjectController;


export function load({ tab, setTab, currentElement, setCurrentElement }: {
    tab: string;
    setTab: React.Dispatch<React.SetStateAction<string>>;
    currentElement: abcjs.AbcElem | null;
    setCurrentElement: React.Dispatch<React.SetStateAction<abcjs.AbcElem | null>>;
}) {
    if (abcjs.synth.supportsAudio()) {
        synthControl = new abcjs.synth.SynthController();
        synthControl.load("#audio",cursorControl, {displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true});
    } else {
        (document.querySelector("#audio") as HTMLDivElement).innerHTML = "<div class='audio-error'>Audio is not supported in this browser.</div>";
    }
    setTune(false, { tab, setTab, currentElement, setCurrentElement });
}

function setTune(userAction: boolean, { tab, setTab, currentElement, setCurrentElement }: {
    tab: string;
    setTab: React.Dispatch<React.SetStateAction<string>>;
    currentElement: abcjs.AbcElem | null;
    setCurrentElement: React.Dispatch<React.SetStateAction<abcjs.AbcElem | null>>;
}) {
    synthControl.disable(true);
    let visualObj = abcjs.renderAbc("paper", tab, {
        add_classes: true,
        dragging:true,
        clickListener: (abcElem, tuneNumber, classes, analysis, drag) => {
            console.log(abcElem);
            if (abcElem.abselem.counters.voice == 0)
                setCurrentElement(abcElem);
            let midiPitches = abcElem.midiPitches;
            if (!midiPitches)
                return;

            abcjs.synth.playEvent(midiPitches
                // .map(p => {
                //     console.log(p);

                //     return { pitch: 66, volume: 105, duration: 0.125, instrument: '0' }
                // })
                , [], 1000).then(function (response) {
                    console.log("note played");
                }).catch(function (error) {
                    console.log("error playing note", error);
                });

        },
        responsive: "resize"
    })[0];
    let midi = abcjs.synth.getMidiFile(tab, { fileName: "i-was-not-insane.midi" });
    let midiButton = document.querySelector(".midi") as HTMLDivElement;
    midiButton.innerHTML = midi;

    let midiBuffer = new abcjs.synth.CreateSynth();
    midiBuffer.init({
        //audioContext: new AudioContext(),
        visualObj: visualObj,
        // sequence: [],
        // millisecondsPerMeasure: 1000,
        // debugCallback: function(message) { console.log(message) },
        options: {
            // soundFontUrl: "https://paulrosen.github.io/midi-js-soundfonts/FluidR3_GM/" ,
            // sequenceCallback: function(noteMapTracks, callbackContext) { return noteMapTracks; },
            // callbackContext: this,
            // onEnded: function(callbackContext),
            // pan: [ -0.5, 0.5 ]
        }
    }).then(function (response) {
        if (synthControl) {
            synthControl.setTune(visualObj, userAction).then(function (response) {
                console.log("Audio successfully loaded.")
            }).catch(function (error) {
                console.warn("Audio problem:", error);
            });
        }
    }).catch(function (error) {
        console.warn("Audio problem:", error);
    });
}
