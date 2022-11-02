
import abcjs, { TuneBook } from "abcjs";
import { DragCalculator } from "./music_extend/DragCalculator";
import { Actions } from "./Play";
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

        for (let i = 0; i < ev.elements.length; i++) {
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
        for (let i = 0; i < els.length; i++) {
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


let synthControl: abcjs.SynthObjectController;

interface SettingTune {
    tab: string;
    setTab: React.Dispatch<React.SetStateAction<string>>;
    currentElement: abcjs.AbcElem | null;
    setCurrentElement: (newElement: abcjs.AbcElem | null) => void;
    action: Actions;
    setAction: React.Dispatch<React.SetStateAction<Actions>>;
    actionMemory: any;
    setActionMemory: React.Dispatch<any>;
}

export function load(settingTune: SettingTune) {
    if (abcjs.synth.supportsAudio()) {
        synthControl = new abcjs.synth.SynthController();
        synthControl.load("#audio", cursorControl, { displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true });
    } else {
        (document.querySelector("#audio") as HTMLDivElement).innerHTML = "<div class='audio-error'>Audio is not supported in this browser.</div>";
    }
    setTune(false, settingTune);
}

function setTune(userAction: boolean, { tab, setTab, currentElement, setCurrentElement, action, setAction, actionMemory, setActionMemory }: SettingTune) {

    synthControl.disable(true);
    const playTune = (midiPitches: abcjs.MidiPitches) => {
        abcjs.synth.playEvent(midiPitches, [], 1000).then(function (response) {
            // console.log("note played");
        }).catch(function (error) {
            // console.log("error playing note", error);
        });
    }
    const clickListener: abcjs.ClickListener = (abcElem, tuneNumber, classes, analysis, drag) => {
        console.log(drag);
        
        // to make the first stave only able to control
        if (abcElem.abselem.counters.voice == 0)
            setCurrentElement(abcElem);
        // on Drag
        if (drag.step !== 0) {
            const part1 = tab.substring(0, abcElem.startChar);
            const part2 = tab.substring(abcElem.endChar);
            const note = tab.slice(abcElem.startChar, abcElem.endChar)
            const dragCalc = new DragCalculator(note, drag.step);
            setTab(part1 + dragCalc.move() + part2);
            return;
        }

        // render voice on click
        let midiPitches = abcElem.midiPitches;
        if (!midiPitches)
            return;
        playTune(midiPitches);
    }

    const visualObj = abcjs.renderAbc("paper", tab, {
        add_classes: true, dragging: true, clickListener: clickListener,
        staffwidth: window.innerWidth - 300,
        afterParsing: (tune, tuneNumber, abcString) => {
            if (currentElement) {
                setTimeout(() => {
                    let newElement: abcjs.AbcElem;
                    if (action === 'ADD') {
                        newElement = tune.getElementFromChar(currentElement.endChar) as abcjs.AbcElem
                        setCurrentElement(newElement);
                        setAction('');
                    } else {
                        newElement = tune.getElementFromChar(currentElement.startChar) as abcjs.AbcElem
                        setCurrentElement(newElement);
                    }

                    let midiPitches = newElement.midiPitches;
                    if (!midiPitches)
                        return tune;

                    playTune(midiPitches);
                }, 10)
            }
            return tune;
        },
        selectionColor: 'blue',
        dragColor: 'blue',

    }, { scale: 1})[0];

    const midi = abcjs.synth.getMidiFile(tab, { fileName: "i-was-not-insane.midi" });
    const midiButton = document.querySelector(".midi") as HTMLDivElement;
    midiButton.innerHTML = midi;

    const midiBuffer = new abcjs.synth.CreateSynth();

    midiBuffer.init({
        visualObj: visualObj,
        // options:{
        //     soundFontUrl:
        // }
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