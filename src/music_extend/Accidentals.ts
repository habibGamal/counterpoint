export default class Accidental {

    constructor(private note: string, private accident: string) { }

    private sanitizer(): [string | null, string] {
        const noteWithoutAccident = this.note.match(/\(|[CDEFGAB].*/g);
        // check if there is tie
        if (noteWithoutAccident?.length === 2)
            return [noteWithoutAccident[0], noteWithoutAccident[1]];
        return [null, noteWithoutAccident![0]];
    }

    change() {
        const [tie, note] = this.sanitizer();
        console.log(this.accident + note);
        
        return (tie ? tie : '') + this.accident + note;
    }

} 