export default class Accidental {

    constructor(private note: string, private accident: string) { }

    private sanitizer(): [string | null, string] {
        const noteWithoutPre = this.note.match(/".*"\(|".*"|\(|[CDEFGAB].*/g);
        // check if there is tie
        if (noteWithoutPre?.length === 2)
            return [noteWithoutPre[0], noteWithoutPre[1]];
        return [null, noteWithoutPre![0]];
    }

    change() {
        const [pre, note] = this.sanitizer();
        console.log(this.accident + note);
        
        return (pre ? pre : '') + this.accident + note;
    }

} 