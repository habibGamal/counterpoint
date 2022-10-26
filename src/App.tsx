import { useEffect, useState } from "react";
import "./App.css";
import abcjs, { TuneBook } from "abcjs";
import { load } from "./test";
import 'abcjs/abcjs-audio.css'
function App() {
  const [tab, setTab] = useState(
    `X:1
T:Keys and modes
M:4/4
K:C
V:RH clef=treble
V:LH clef=bass 
L:1
[V: RH]z|z|z|z|z|z|z|z|]
L:1
[V: LH]_F,|^F,|F,|^^F,|(D,|E),|D,|E,|]
    `
  );
  const [currentElement, setCurrentElement] = useState<abcjs.AbcElem | null>(null);
  useEffect(() => {
    // const t = {tab,setTab,currentElement,setCurrentElement}
    load({tab,setTab,currentElement,setCurrentElement});


    // const editor = new abcjs.Editor("editor", {
    //   canvas_id: "paper",
    //   abcjsParams: {
    //     clickListener:
    //       (abcElem, tuneNumber, classes, analysis, drag) => {
    //         // console.log(abcElem.abselem.counters.note);

    //         if (abcElem.abselem.counters.voice == 0)
    //           setCurrentElement(abcElem);
    //       }
    //     ,
    //     responsive: "resize"
    //   },

    // });

  }, [tab]);

  const changeNote = (char: string) => {
    if (currentElement === null) return;
    const part1 = tab.substring(0, currentElement.startChar);
    const part2 = tab.substring(currentElement.endChar);
    const [note, orginalLength] = tab.slice(currentElement.startChar, currentElement.endChar).split('/');
    const length = orginalLength ? '/' + orginalLength : '';
    setCurrentElement(null);
    setTab(part1 + char + length + part2)
  }
  const changeNoteLength = (length: number) => {
    if (currentElement === null) return;
    const part1 = tab.substring(0, currentElement.startChar);
    const part2 = tab.substring(currentElement.endChar);
    const [note, orginalLength] = tab.slice(currentElement.startChar, currentElement.endChar).split('/');
    setCurrentElement(null);
    setTab(part1 + note + '/' + length + part2)
  }
  const deleteNote = () => {
    if (currentElement === null) return;
    const part1 = tab.substring(0, currentElement.startChar);
    const part2 = tab.substring(currentElement.endChar);
    const nextMeasure = currentElement.abselem.counters.measure
    const { measures } = abcjs.extractMeasures(part1 + part2)[0];
    if (measures[nextMeasure].abc[0] !== '|') {
      setCurrentElement(null);
      setTab(part1 + part2)
    }
  }
  const addNote = () => {
    if (currentElement === null) return;
    const part1 = tab.substring(0, currentElement.endChar);
    const part2 = tab.substring(currentElement.endChar);
    setCurrentElement(null);
    setTab(part1 + 'z' + part2)
  }
  return (
    <div className="container bg">
      <div className="rounded p-2 bg-gray-200 mt-4 flex gap-4">
        <button onClick={() => deleteNote()} className="rounded p-1 px-2 bg-gray-300">delete</button>
        <button onClick={() => addNote()} className="rounded p-1 px-2 bg-gray-300">add</button>
      </div>
      <div className="rounded p-2 bg-gray-200 mt-4 flex gap-4">
        <button onClick={() => changeNoteLength(1)} className="rounded p-1 px-2 bg-gray-300">Note = 1</button>
        <button onClick={() => changeNoteLength(2)} className="rounded p-1 px-2 bg-gray-300">Note = /2</button>
        <button onClick={() => changeNoteLength(4)} className="rounded p-1 px-2 bg-gray-300">Note = /4</button>
        <button onClick={() => changeNoteLength(8)} className="rounded p-1 px-2 bg-gray-300">Note = /8</button>
        <button onClick={() => changeNoteLength(16)} className="rounded p-1 px-2 bg-gray-300">Note = /16</button>
      </div>
      <div className="rounded p-2 bg-gray-200 mt-4 flex gap-4">
        <button onClick={() => changeNote('C,,')} className="rounded p-1 px-2 bg-gray-300">C2</button>
        <button onClick={() => changeNote('D,,')} className="rounded p-1 px-2 bg-gray-300">D2</button>
        <button onClick={() => changeNote('E,,')} className="rounded p-1 px-2 bg-gray-300">E2</button>
        <button onClick={() => changeNote('F,,')} className="rounded p-1 px-2 bg-gray-300">F2</button>
        <button onClick={() => changeNote('G,,')} className="rounded p-1 px-2 bg-gray-300">G2</button>
        <button onClick={() => changeNote('A,,')} className="rounded p-1 px-2 bg-gray-300">A2</button>
        <button onClick={() => changeNote('B,,')} className="rounded p-1 px-2 bg-gray-300">B2</button>
      </div>
      <div className="rounded p-2 bg-gray-200 mt-4 flex gap-4">
        <button onClick={() => changeNote('C,')} className="rounded p-1 px-2 bg-gray-300">C3</button>
        <button onClick={() => changeNote('D,')} className="rounded p-1 px-2 bg-gray-300">D3</button>
        <button onClick={() => changeNote('E,')} className="rounded p-1 px-2 bg-gray-300">E3</button>
        <button onClick={() => changeNote('F,')} className="rounded p-1 px-2 bg-gray-300">F3</button>
        <button onClick={() => changeNote('G,')} className="rounded p-1 px-2 bg-gray-300">G3</button>
        <button onClick={() => changeNote('A,')} className="rounded p-1 px-2 bg-gray-300">A3</button>
        <button onClick={() => changeNote('B,')} className="rounded p-1 px-2 bg-gray-300">B3</button>
      </div>
      <div className="rounded p-2 bg-gray-200 mt-4 flex gap-4">
        <button onClick={() => changeNote('C')} className="rounded p-1 px-2 bg-gray-300">C4</button>
        <button onClick={() => changeNote('D')} className="rounded p-1 px-2 bg-gray-300">D4</button>
        <button onClick={() => changeNote('E')} className="rounded p-1 px-2 bg-gray-300">E4</button>
        <button onClick={() => changeNote('F')} className="rounded p-1 px-2 bg-gray-300">F4</button>
        <button onClick={() => changeNote('G')} className="rounded p-1 px-2 bg-gray-300">G4</button>
        <button onClick={() => changeNote('A')} className="rounded p-1 px-2 bg-gray-300">A4</button>
        <button onClick={() => changeNote('B')} className="rounded p-1 px-2 bg-gray-300">B4</button>
      </div>
      <div className="rounded p-2 bg-gray-200 mt-4 flex gap-4">
        <button onClick={() => changeNote('C\'')} className="rounded p-1 px-2 bg-gray-300">C5</button>
        <button onClick={() => changeNote('D\'')} className="rounded p-1 px-2 bg-gray-300">D5</button>
        <button onClick={() => changeNote('E\'')} className="rounded p-1 px-2 bg-gray-300">E5</button>
        <button onClick={() => changeNote('F\'')} className="rounded p-1 px-2 bg-gray-300">F5</button>
        <button onClick={() => changeNote('G\'')} className="rounded p-1 px-2 bg-gray-300">G5</button>
        <button onClick={() => changeNote('A\'')} className="rounded p-1 px-2 bg-gray-300">A5</button>
        <button onClick={() => changeNote('B\'')} className="rounded p-1 px-2 bg-gray-300">B5</button>
      </div>
      <div className="rounded p-2 bg-gray-200 mt-4 flex gap-4">
        <button onClick={() => changeNote('C\'\'')} className="rounded p-1 px-2 bg-gray-300">C6</button>
        <button onClick={() => changeNote('D\'\'')} className="rounded p-1 px-2 bg-gray-300">D6</button>
        <button onClick={() => changeNote('E\'\'')} className="rounded p-1 px-2 bg-gray-300">E6</button>
        <button onClick={() => changeNote('F\'\'')} className="rounded p-1 px-2 bg-gray-300">F6</button>
        <button onClick={() => changeNote('G\'\'')} className="rounded p-1 px-2 bg-gray-300">G6</button>
        <button onClick={() => changeNote('A\'\'')} className="rounded p-1 px-2 bg-gray-300">A6</button>
        <button onClick={() => changeNote('B\'\'')} className="rounded p-1 px-2 bg-gray-300">B6</button>
      </div>
      <textarea className="border border-gray-600" name="" id="editor" cols={90} rows={10} value={tab} onChange={e => setTab(e.target.value)}></textarea>
      {/* <div id="output"></div> */}
      <div id="paper"></div>
      <div className="midi">MIDI</div>
      <div id="audio"></div>
      <p className="click-explanation" style={{display:'none'}}>Click on a note to play that note.</p>
    </div>
  );
}

export default App;
