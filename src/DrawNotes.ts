interface Note {
    clef: string,
    staves: number,
    notes?: string[],
}

import { Vex, Formatter, StaveNote, Voice, StaveConnector } from "vexflow";
import { RenderContext, Stave as StaveType, StemmableNote } from "vexflow/build/types/src";
const { Renderer, Stave, Beam, EasyScore, Factory } = Vex.Flow;
export default class DrawNotes {
    public context: RenderContext;
    private stavesOfFirstNote: StaveType[] = [];
    private notesOfFirstNote: StaveNote[][] = [];
    public currentNote: StaveNote | null = null;
    public currentStave: StaveNote[] | null = null;
    constructor(public firstNote: Note, public secondNote: Note, public div: HTMLDivElement) {
        // delete old svg
        let child = div.lastElementChild;
        while (child) {
            div.removeChild(child);
            child = div.lastElementChild;
        }
        // create context
        // const renderer = new Renderer(div, Renderer.Backends.SVG);
        // renderer.resize(720, 800);
        const factory = new Factory({ renderer: { elementId: div.id, width: 800, height: 600 } });
        this.context = factory.getContext();
        const score = factory.EasyScore();
        const formatter = factory.Formatter();
        // build first note
        for (let i = 0; i < firstNote.staves; i++) {
            this.stavesOfFirstNote.push(
                new Stave(this.stavesOfFirstNote[i - 1] ? this.stavesOfFirstNote[i - 1].getWidth() + this.stavesOfFirstNote[i - 1].getX() : 10, 0, 100)
            )
        }
        // set clef
        this.stavesOfFirstNote[0].addClef(firstNote.clef);
        // start with rests
        for (let i = 0; i < firstNote.staves; i++) {
            this.notesOfFirstNote.push(
                // score.notes('b4/w/r', { stem: 'down' })
                [new StaveNote({ keys: ["b/4"], duration: "wr" })]
            )
        }
        // draw staves and rests of the first note
        this.draw();
        // add listiners
        this.notesOfFirstNoteEvent();
    }
    // changeStaveNote(){
    //     this.currentStave?.fill(new StaveNote({ keys: ["b/4"], duration: "w" }))
    // }
    notesOfFirstNoteEvent() {
        this.notesOfFirstNote.forEach(notes => {
            notes.forEach(note => {
                (note.getAttributes().el as HTMLElement).onclick = (e) => {
                    note.setStyle({fillStyle:'blue'});
                    this.redraw();
                    this.currentNote = note;
                    this.currentStave = notes;
                    this.moveNote();
                    this.documentResetEvents();
                }
            });
        });
    }
    moveNote() {
        document.onkeydown = (e) => {
            if (this.currentNote) {
                const key = this.currentNote.getKeyLine(0);
                if (e.key === 'ArrowUp' && key < 7.5) {
                    this.currentNote.setKeyLine(0, key + .5)
                    this.redraw();
                    console.log(this.currentNote);
                    // this.currentNote.setDuration('1');
                }

                if (e.key === 'ArrowDown' && key > -1.5) {
                    this.currentNote.setKeyLine(0, key - .5)
                    this.redraw();
                    console.log(key);
                }
            }
        }
    }
    documentResetEvents(){
        const dismiss = document.getElementById('dismissable') as HTMLDivElement;
        dismiss.style.height = '100vh';
        dismiss.onclick = ()=>{
            this.currentNote?.setStyle({fillStyle:'black'});
            this.currentNote = null;
            this.redraw();
            this.moveNote();
            this.notesOfFirstNoteEvent();
            dismiss.style.height = '0px';
        }
    }
    draw() {
        this.stavesOfFirstNote.forEach((stave, i) => {
            stave.setContext(this.context).draw()
            Formatter.FormatAndDraw(this.context, stave, this.notesOfFirstNote[i]);
        });
    }

    redraw() {
        this.context.clear();
        this.draw();
    }

}

