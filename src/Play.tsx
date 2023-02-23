import { useEffect, useRef, useState } from "react";
// import "./App.css";
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
import Button from "./compontents/old/Button";
import ButtonGroup from "./compontents/old/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPause, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import BtnSeparator from "./compontents/old/BtnSeparator";
import PageTitle from "./compontents/PageTitle";
import { DragCalculator } from "./music_extend/DragCalculator";
import Control from "./music_extend/Control";
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
V:RH clef=${key1} name=${index === 1 ? 'C.F' : 'C.P'}
V:LH clef=${key2} name=${index === undefined || index === 0 ? 'C.F' : 'C.P'}
L:1
[V: RH]${index === 0 && editable ? emptyVoice.join('|') + '|]' : voice1}
L:1
[V: LH]${index === 1 && editable ? emptyVoice.join('|') + '|]' : voice2}
        
    `
  );
  const [currentElement, setCurrentElement] = useState<abcjs.AbcElem | null>(null);
  const [action, setAction] = useState<Actions>('');
  const [actionMemory, setActionMemory] = useState<any>();
  const [tune, setTune] = useState<abcjs.TuneObject>();
  const [playing, setPlaying] = useState(false);
  const addTextInput = useRef<HTMLInputElement>(null);
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
    const preventScroll = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown"].indexOf(e.code) > -1) {
        e.preventDefault();
      }
    }
    window.addEventListener("keydown", preventScroll, false);
    return () => {
      window.removeEventListener("keydown", preventScroll, false);
    }
  }, []);
  const control = new Control(tune, tab, setTab, currentElement, setCurrentElementFocus, setAction);
  useEffect(() => {
    if (currentElement && document.activeElement !== addTextInput.current) {
      document.onkeydown = (e) => {
        if(document.activeElement === addTextInput.current) return;
        const mapChangeNoteKeys = {
          Digit0: 'z',
          KeyC: 'C',
          KeyD: 'D',
          KeyE: 'E',
          KeyF: 'F',
          KeyG: 'G',
          KeyA: 'A',
          KeyB: 'B',
        }
        if (Object.keys(mapChangeNoteKeys).indexOf(e.code) > -1) {
          control.changeNote(mapChangeNoteKeys[e.code as keyof typeof mapChangeNoteKeys]);
        }
        const mapChangeNoteLengthKeys = {
          Digit1: 1,
          Digit2: 2,
          Digit3: 4,
          Digit4: 8,
          Digit5: 16,
        }
        if (Object.keys(mapChangeNoteLengthKeys).indexOf(e.code) > -1) {
          control.changeNoteLength(mapChangeNoteLengthKeys[e.code as keyof typeof mapChangeNoteLengthKeys]);
        }
        if (e.code === "Delete") {
          control.deleteNote()
        }
        if (e.code === "NumpadAdd") {
          control.addNote()
        }
        if (e.code === "ArrowUp") {
          control.move(-1)
        }
        if (e.code === "ArrowDown") {
          control.move(+1)
        }
        if (e.code === "ArrowRight" && tune) {
          control.selectNext()
        }
        if (e.code === "ArrowLeft" && tune) {
          control.selectPrev()
        }
      }
      setText('')
    }
    return () => {
      document.onkeydown = null;
    }
  }, [currentElement])
  const check = () => {
    const voiceToCheck = index === 0 ? voice1.split('|') : voice2.split('|');
    voiceToCheck.pop();
    if (tune)
      new Check(tune, index!, voiceToCheck, tab)
  }
  const [text, setText] = useState('');
  const addText = () => {
    if (currentElement === null) return;
    const element = currentElement.abselem.elemset[0] as HTMLElement
    (addTextInput.current as HTMLInputElement).focus();
    (addTextInput.current as HTMLInputElement).onblur = () => {
      setCurrentElementFocus(null);
    }
    document.onkeydown = null;
    const note = tab.slice(currentElement.startChar, currentElement.endChar);
    setText((note.match(/".*"/g) || [''])[0].replaceAll('\"', ''))
  }
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentElement === null) return;
    const part1 = tab.substring(0, currentElement.startChar);
    const part2 = tab.substring(currentElement.endChar);
    let note = tab.slice(currentElement.startChar, currentElement.endChar);

    if (note.match(/".*"/g))
      note = note.replace(/".*"/g, `"${e.target.value}"`);
    else
      note = `"${e.target.value}"` + note;
    setText(e.target.value)
    setTab(part1 + note + part2);
  }
  return (
    <>
      <div className="ltr font-sans flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-200px)]">
        {
          editable &&
          <>
            <ButtonGroup>
              <Button onClick={() => control.deleteNote()} content="delete" />
              <Button onClick={() => control.addNote()} content="add" />
              <Button onClick={() => addText()} content="add Text" />
            </ButtonGroup>
            <div className="flex gap-8 justify-center">
              <ButtonGroup>
                <Button onClick={() => control.changeNoteLength(1)} content={<img src={note1} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => control.changeNoteLength(2)} content={<img src={note2} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => control.changeNoteLength(4)} content={<img src={note4} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => control.changeNoteLength(8)} content={<img src={note8} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => control.changeNoteLength(16)} content={<img src={note16} className="w-6 h-8 object-contain" />} />
                <BtnSeparator />
                <Button onClick={() => control.changeNote('z')} content={<img src={z} className="w-6 h-8 object-contain" />} />
                <BtnSeparator />
                <Button onClick={() => control.addTie()} content={<img src={tie} className="w-6 h-8 object-contain" />} />
              </ButtonGroup>
              <ButtonGroup>
                <Button onClick={() => control.addAccidental('_')} content={<img src={b} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => control.addAccidental('__')} content={<img src={bb} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => control.addAccidental('=')} content={<img src={sq} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => control.addAccidental('^')} content={<img src={hash} className="w-6 h-8 object-contain" />} />
                <Button onClick={() => control.addAccidental('^^')} content={<img src={x} className="w-6 h-8 object-contain" />} />
                <BtnSeparator />
                <Button onClick={() => control.addAccidental('')} content={<FontAwesomeIcon icon={faTrash} />} />
              </ButtonGroup>
            </div>
            <ButtonGroup className="text-2xl font-bold mx-auto">
              <Button className="w-10 h-10 text-red-600" onClick={() => control.changeNote('C')} content="C" />
              <Button className="w-10 h-10 text-orange-600" onClick={() => control.changeNote('D')} content="D" />
              <Button className="w-10 h-10 text-yellow-600" onClick={() => control.changeNote('E')} content="E" />
              <Button className="w-10 h-10 text-green-600" onClick={() => control.changeNote('F')} content="F" />
              <Button className="w-10 h-10 text-sky-600" onClick={() => control.changeNote('G')} content="G" />
              <Button className="w-10 h-10 text-purple-600" onClick={() => control.changeNote('A')} content="A" />
              <Button className="w-10 h-10 text-pink-600" onClick={() => control.changeNote('B')} content="B" />
            </ButtonGroup>
          </>
        }
        <textarea className="border border-gray-600" name="" id="editor" cols={90} rows={10} value={tab} onChange={e => setTab(e.target.value)}></textarea>
        {/* <div id="output"></div> */}
        <div className="bg-white mx-auto rounded-xl w-fit pb-1">
          <div id="paper" className=" mx-auto m-8 rounded-xl bg-white h-[500px]" ></div>
        </div>
        <div className="flex gap-8 items-center">
          <div className=" transition-transform z-50 rounded shadow p-2 custom-shadow w-fit font-sans text-black ltr">
            <input ref={addTextInput} type="text" value={text} onChange={(e) => onTextChange(e)} className="rounded px-2 py-1 border border-secondary-400" placeholder="Type here..." />
          </div>
          <ButtonGroup className="mx-auto">
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
        </div>
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
