import { useEffect, useState } from "react";
import "./App.css";
import abcjs from "./lib/abc/abc";
import "./lib/abc/abcjs-audio.css";
import { load } from "./music_extend/Core";
import note1 from './assets/buttons/1.png';
import note2 from './assets/buttons/2.png';
import note4 from './assets/buttons/4.png';
import note8 from './assets/buttons/8.png';
import note16 from './assets/buttons/16.png';
import b from './assets/buttons/b.png';
import bb from './assets/buttons/bb.png';
import hash from './assets/buttons/hash.png';
import sq from './assets/buttons/sq.png';
import x from './assets/buttons/x.png';
import z from './assets/buttons/z.png';
import tie from './assets/buttons/tie.png';
// import 'abcjs/abcjs-audio.css'
import Accidental from "./music_extend/Accidentals";
import Check from "./music_extend/Check";
import Button from "./compontents/Button";
import ButtonGroup from "./compontents/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPause, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import BtnSeparator from "./compontents/BtnSeparator";
import PageTitle from "./compontents/PageTitle";
export type Actions = '' | 'ADD' | 'TIE'
// cantus up => index =1 ,check voice2
// cantus down => index =0 , check voice1
function Play({ editable, key1, key2, voice1, voice2, index }: { editable: boolean, key1: string, key2: string, voice1: string, voice2: string, index?: number }) {
  const emptyVoice = index === 0 ? (voice1.split('|')).map(n => 'z') : (voice2.split('|')).map(n => 'z');
  emptyVoice.pop()
  const [tab, setTab] = useState(
    `X:1
M:4/4
K:C
V:RH clef=${key1}
V:LH clef=${key2}
L:1
[V: RH]${index === 0 ? emptyVoice.join('|')+'|]':voice1}
L:1
[V: LH]${index === 1 ? emptyVoice.join('|')+'|]':voice2}
        
    `
  );
  const [currentElement, setCurrentElement] = useState<abcjs.AbcElem | null>(null);
  const [action, setAction] = useState<Actions>('');
  const [actionMemory, setActionMemory] = useState<any>();
  const [tune, setTune] = useState<abcjs.TuneObject>();
  const [playing, setPlaying] = useState(false);
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
    load(
      {
        editable,
        tab,
        setTab,
        currentElement,
        setCurrentElement: setCurrentElementFocus,
        action,
        setAction,
        actionMemory,
        setActionMemory,
        tune,
        setTuneObj: setTune,
        index,
      });
  }, [tab]);
  useEffect(() => {
    if (action === 'TIE') {

    }
  }, [action])
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
  const addTie = () => {
    if (currentElement === null) return;
    const part1 = tab.substring(0, currentElement.startChar);
    const part2 = tab.substring(currentElement.endChar);
    const note = tab.slice(currentElement.startChar, currentElement.endChar);
    // setCurrentElement(null);
    const newNote = part1 + '(' + note + part2;
    setAction('TIE')
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
  const check = () => {
    const voiceToCheck = index === 0 ? voice1.split('|') : voice2.split('|');
    voiceToCheck.pop();
    if (tune)
      new Check(tune, index!, voiceToCheck, tab)
  }
  return (
    <>
      <div className="ltr font-sans flex flex-col items-center justify-center min-h-screen">
        {
          editable &&
          <>
            <ButtonGroup>
              <Button onClick={() => deleteNote()} content="delete" />
              <Button onClick={() => addNote()} content="add" />
            </ButtonGroup>
            <div className="flex gap-8 justify-center">
              <ButtonGroup>
                <Button onClick={() => changeNoteLength(1)} content={<img src={note1} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => changeNoteLength(2)} content={<img src={note2} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => changeNoteLength(4)} content={<img src={note4} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => changeNoteLength(8)} content={<img src={note8} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => changeNoteLength(16)} content={<img src={note16} className="w-6 h-8 object-contain" />} />
                <BtnSeparator />
                <Button onClick={() => changeNote('z')} content={<img src={z} className="w-6 h-8 object-contain" />} />
                <BtnSeparator />
                <Button onClick={() => addTie()} content={<img src={tie} className="w-6 h-8 object-contain" />} />
              </ButtonGroup>
              <ButtonGroup>
                <Button onClick={() => addAccidental('_')} content={<img src={b} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => addAccidental('__')} content={<img src={bb} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => addAccidental('=')} content={<img src={sq} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => addAccidental('^')} content={<img src={hash} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => addAccidental('^^')} content={<img src={x} className="w-6 h-8 object-contain" />} />
                <BtnSeparator />
                <Button onClick={() => addAccidental('')} content={<FontAwesomeIcon icon={faTrash} />} />
              </ButtonGroup>
            </div>
            <ButtonGroup className="text-2xl font-bold mx-auto">
              <Button className="w-10 h-10 text-red-600" onClick={() => changeNote('C')} content="C" />
              <Button className="w-10 h-10 text-orange-600" onClick={() => changeNote('D')} content="D" />
              <Button className="w-10 h-10 text-yellow-600" onClick={() => changeNote('E')} content="E" />
              <Button className="w-10 h-10 text-green-600" onClick={() => changeNote('F')} content="F" />
              <Button className="w-10 h-10 text-sky-600" onClick={() => changeNote('G')} content="G" />
              <Button className="w-10 h-10 text-purple-600" onClick={() => changeNote('A')} content="A" />
              <Button className="w-10 h-10 text-pink-600" onClick={() => changeNote('B')} content="B" />
            </ButtonGroup>
          </>
        }
        <textarea className="border hidden border-gray-600" name="" id="editor" cols={90} rows={10} value={tab} onChange={e => setTab(e.target.value)}></textarea>
        {/* <div id="output"></div> */}
        <div className="bg-white mx-auto rounded-xl w-fit pb-1">
          <div id="paper" className=" mx-auto m-8 rounded-xl bg-white h-[500px]" ></div>
        </div>
        <ButtonGroup className="mx-auto my-8">
          {
            editable &&
            <Button className="w-8 h-8" onClick={() => check()} content={<FontAwesomeIcon icon={faCheck} />} />
          }
          <Button className="w-8 h-8" onClick={() => {
            const btn = (document.querySelector('button.abcjs-midi-start.abcjs-btn') as HTMLButtonElement);
            btn.click();
            setPlaying(!playing)

          }} content={<FontAwesomeIcon icon={playing ? faPause : faPlay} />} />
        </ButtonGroup>
        <div className="hidden">
          <div className="midi ">MIDI</div>
          <div id="audio"></div>
          <p className="click-explanation " style={{ display: 'none' }}>Click on a note to play that note.</p>
        </div>
      </div>
    </>
  );
}

export default Play;
