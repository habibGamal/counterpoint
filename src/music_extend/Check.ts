import abcjs from "../lib/abc/abc";

export default class Check {
    private voices: abcjs.VoiceItem[] | undefined;
    private incorrectNotes: abcjs.VoiceItem[] = []
    constructor(public tune: abcjs.TuneObject, public correctAns: string[], public tab: string) {
        this.voices = tune.lines[0].staff?.[0].voices?.[0].filter(voice => voice.el_type === 'note');
        console.log(this.voices);
        this.validate()
        this.markWrongNotes()
    }
    validate() {
        this.correctAns.forEach((correctNote, i) => {
            const voice = this.voices![i]
            if (this.tab.substring(voice.startChar, voice.endChar) !== correctNote)
                this.incorrectNotes.push(voice);
        })
    }
    markWrongNotes() {
        this.incorrectNotes.forEach(note => {
            (note.abselem.elemset[0] as SVGAElement).setAttribute('fill', 'red')
        });
    }
}