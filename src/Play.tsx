import { useEffect, useState } from "react";
import "./App.css";
import abcjs, { TuneBook } from "abcjs";
import { load } from "./test";
import 'abcjs/abcjs-audio.css'
import Accidental from "./music_extend/Accidentals";
export type Actions = '' | 'ADD'
function Play() {
  const [tab, setTab] = useState(
    `X:1
M:4/4
K:C
V:RH clef=treble
V:LH clef=bass 
L:1
[V: RH]z/2D'/2|C'/2B/2|A/2C'/2|D'/2C'/2|B/2D'/2|C'/2D'/2|E'/2B/2|D'/2A/2|B/2^C'/2|D'|]
L:1
[V: LH]D,|A,|F,|D,|G,|E,|G,|F,|E,|D,|]
    `
  );
  const [currentElement, setCurrentElement] = useState<abcjs.AbcElem | null>(null);
  const [action, setAction] = useState<Actions>('');
  const [actionMemory, setActionMemory] = useState<any>();
  const setCurrentElementFocus = (newElement: abcjs.AbcElem | null) => {
    setCurrentElement((oldElement) => {
      if (oldElement)
        (oldElement.abselem.elemset[0] as SVGAElement).setAttribute('fill', 'black')
      return newElement
    })
    if (newElement)
      (newElement.abselem.elemset[0] as SVGAElement).setAttribute('fill', 'blue')
  }
  useEffect(() => {
    load({ tab, setTab, currentElement, setCurrentElement: setCurrentElementFocus, action, setAction, actionMemory, setActionMemory });
  }, [tab]);

  const changeNote = (char: string) => {
    if (currentElement === null) return;
    const part1 = tab.substring(0, currentElement.startChar);
    const part2 = tab.substring(currentElement.endChar);
    const [note, orginalLength] = tab.slice(currentElement.startChar, currentElement.endChar).split('/');
    const length = orginalLength ? '/' + orginalLength : '';
    // setCurrentElement(null);
    setTab(part1 + char + length + part2)
  }
  const changeNoteLength = (length: number) => {
    if (currentElement === null) return;
    const part1 = tab.substring(0, currentElement.startChar);
    const part2 = tab.substring(currentElement.endChar);
    const [note, orginalLength] = tab.slice(currentElement.startChar, currentElement.endChar).split('/');
    setTab(part1 + note + '/' + length + part2)
  }
  const deleteNote = () => {
    if (currentElement === null) return;
    const part1 = tab.substring(0, currentElement.startChar);
    const part2 = tab.substring(currentElement.endChar);
    const prevMeasureIndex = currentElement.abselem.counters.measure - 1
    const { measures } = abcjs.extractMeasures(part1 + part2)[0];
    console.log(measures, prevMeasureIndex);
    if (prevMeasureIndex === -1) {
      if (measures[0].abc[0] !== '|') {
        setTab(part1 + part2)
      }
      return
    }
    const prevMeasure = measures[prevMeasureIndex].abc;
    if (!prevMeasure.includes('||')) {
      // setCurrentElement(null);
      setTab(part1 + part2)
    }
  }
  const addNote = () => {
    if (currentElement === null) return;
    const part1 = tab.substring(0, currentElement.endChar);
    const part2 = tab.substring(currentElement.endChar);
    const [note, orginalLength] = tab.slice(currentElement.startChar, currentElement.endChar).split('/');
    // setCurrentElement(null);
    const newNote = orginalLength ? part1 + 'z/' + orginalLength + part2 : part1 + 'z' + part2
    setAction('ADD')
    setTab(newNote)
  }
  const addAccidental = (accidental: string) => {
    if (currentElement === null) return;
    const part1 = tab.substring(0, currentElement.startChar);
    const part2 = tab.substring(currentElement.endChar);
    const note = tab.slice(currentElement.startChar, currentElement.endChar);
    const newNote = part1 + (new Accidental(note, accidental)).change() + part2;
    setTab(newNote)
  }
  return (
    <div className="">
      <div className="rounded p-2 bg-gray-200 mt-4 flex gap-4">
        <button onClick={() => deleteNote()} className="rounded p-1 px-2 bg-gray-300">delete</button>
        <button onClick={() => addNote()} className="rounded p-1 px-2 bg-gray-300">add</button>
      </div>
      <div className="rounded p-2 bg-gray-200 mt-4 flex gap-4">
        <button onClick={() => changeNoteLength(1)} className="rounded p-1 px-2 bg-gray-300">Note = 1</button>
        <button onClick={() => changeNoteLength(2)} className="rounded p-1 px-2 bg-gray-300 text-2xl">♩</button>
        <button onClick={() => changeNoteLength(4)} className="rounded p-1 px-2 bg-gray-300">Note = /4</button>
        <button onClick={() => changeNoteLength(8)} className="rounded p-1 px-2 bg-gray-300">Note = /8</button>
        <button onClick={() => changeNoteLength(16)} className="rounded p-1 px-2 bg-gray-300">Note = /16</button>
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
        <button onClick={() => addAccidental('__')} className="rounded p-1 px-2 bg-gray-300">b</button>
        <button onClick={() => addAccidental('_')} className="rounded p-1 px-2 bg-gray-300">bb</button>
        <button onClick={() => addAccidental('=')} className="rounded p-1 px-2 bg-gray-300">[]</button>
        <button onClick={() => addAccidental('^')} className="rounded p-1 px-2 bg-gray-300">#</button>
        <button onClick={() => addAccidental('^^')} className="rounded p-1 px-2 bg-gray-300">x</button>
      </div>
      <textarea className="border border-gray-600" name="" id="editor" cols={90} rows={10} value={tab} onChange={e => setTab(e.target.value)}></textarea>
      {/* <div id="output"></div> */}
      <div className="bg-white mx-auto rounded-xl w-fit pb-1">
        <div id="paper" className=" mx-auto m-8 rounded-xl bg-white h-[500px]" ></div>
      </div>
      <div className="midi">MIDI</div>
      <div id="audio"></div>
      <p className="click-explanation" style={{ display: 'none' }}>Click on a note to play that note.</p>
    </div>
  );
}

export default Play;
