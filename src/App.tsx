import { useEffect, useState } from "react";
import "./App.css";
import { Vex, Formatter, StaveNote, Voice, StaveConnector, EasyScore } from "vexflow";
import { RenderContext, Stave } from "vexflow/build/types/src";
import DrawNotes from "./DrawNotes";
let stave: Stave | null = null;
let context: RenderContext | null = null;
let voice: Voice | null = null;
function App() {
  const { Renderer, Stave, Beam } = Vex.Flow;
  const [currentNote, setCurrentNote] = useState<StaveNote | null>(null)
  // useEffect(() => {
  //   const { Factory, EasyScore, System } = Vex.Flow;

  //   const div = document.getElementById("output") as HTMLDivElement;
  //   // delete old svg
  //   let child = div.lastElementChild;
  //   while (child) {
  //     div.removeChild(child);
  //     child = div.lastElementChild;
  //   }

  //   const f =  new Factory({
  //     renderer: { elementId: 'output', width: 900, height: 500 },
  //   });
  // }, [])
  useEffect(() => {
    const div = document.getElementById("output") as HTMLDivElement;
    new DrawNotes(
      {
        clef: 'treble',
        staves: 7,
      },
      {
        clef: 'bass',
        staves: 7,
        notes: [
          'c4/w',
          'd4/w',
          'e4/w',
          'f4/w',
          'g4/w',
          'a4/w',
          'b4/w',
        ]
      },
      div,

    )
    // delete old svg
    // let child = div.lastElementChild;
    // while (child) {
    //   div.removeChild(child);
    //   child = div.lastElementChild;
    // }

    // const renderer = new Renderer(div, Renderer.Backends.SVG);
    // renderer.resize(720, 800);
    // context = renderer.getContext();
    // context.clear();
    // stave = new Stave(10, 40, 400);

    // // Add a clef and time signature.
    // stave.addClef("treble").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    // stave.setContext(context).draw();
    // Create the notes
    // const notes = [
    //   // new StaveNote({
    //   //   keys: ['e/4'],
    //   //   duration: "w",
    //   // }),

    //   new StaveNote({ keys: ["c/4"], duration: "8" }),
    //   new StaveNote({ keys: ["c/4"], duration: "8" }),
    //   new StaveNote({ keys: ["c/4"], duration: "8" }),
    //   new StaveNote({ keys: ["c/4"], duration: "8" }),
    //   new StaveNote({ keys: ["c/4"], duration: "8" }),
    //   new StaveNote({ keys: ["c/4"], duration: "8" }),
    //   new StaveNote({ keys: ["c/4"], duration: "8" }),
    //   new StaveNote({ keys: ["c/4"], duration: "8" }),
    // ];

    // const staveMeasure1 = new Stave(10, 0, 300);
    // staveMeasure1.addClef("treble").setContext(context).draw();

    // const notesMeasure1 = [new StaveNote({ keys: ["c/4"], duration: "q" }), new StaveNote({ keys: ["d/4"], duration: "q" }), new StaveNote({ keys: ["b/4"], duration: "qr" }), new StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" })];

    // // Helper function to justify and draw a 4/4 voice
    // Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);

    // // Measure 2 - second measure is placed adjacent to first measure.
    // const staveMeasure2 = new Stave(10, 100, 400);
    // // staveMeasure2.addClef("treble").setContext(context).draw();
    // const score = new EasyScore();
    // const notesMeasure2 = [new StaveNote({ keys: ["c/4"], duration: "q" }), new StaveNote({ keys: ["d/4"], duration: "q" }), new StaveNote({ keys: ["b/4"], duration: "qr" }), new StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" })];
    // // draw the stave
    // staveMeasure2.setContext(context).draw();
    // const finalstave = new StaveConnector(staveMeasure1, staveMeasure2)
    // finalstave.setContext(context).draw();
    // // draw the notes on the stave
    // Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2);


  }, []);
  // useEffect(() => {
  //   document.onkeydown = (e) => {
  //     if (currentNote && context && stave && voice) {

  //       const key = currentNote.getKeyLine(0);
  //       if (e.key === 'ArrowUp' && key < 7.5) {
  //         context.clear();
  //         stave.setContext(context).draw();
  //         currentNote.setKeyLine(0, key + .5)
  //         voice.draw(context, stave);
  //         console.log(key);
  //       }

  //       if (e.key === 'ArrowDown' && key > -1.5) {
  //         context.clear();
  //         stave.setContext(context).draw();
  //         currentNote.setKeyLine(0, key - .5)
  //         voice.draw(context, stave);
  //         console.log(currentNote.getKeyLine(0));
  //       }
  //     }
  //   }
    // document.onclick = ()=>{
    //   setCurrentNote(null);
    // }
  //   return () => {
  //     document.onkeydown = null;
  //   }
  // }, [currentNote]);
  const unselectNote = () => {
    console.log('unselect');
    if (currentNote)
      (currentNote.getAttributes().el as HTMLElement).onclick = () => {
        setCurrentNote(currentNote);
      }
    setCurrentNote(null);
  }
  return (
    <div className="container bg">
      <div id='dismissable' style={{ width: '100vw', height: currentNote ? '100vh' : '0px', position: 'absolute', top: 0, left: 0 }} onClick={unselectNote} ></div>
      <h1>Welcome to Tauriii!</h1>
      <div id="output"></div>
    </div>
  );
}

export default App;
