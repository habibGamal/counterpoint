const musicChars = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] 
const musicCharsToNumbers = [6, 5, 4, 3, 2, 1, 0]
const MUSIC_CHAR_COUNT = 7;
export class DragCalculator {
    public musicChar: string = '';
    public musicCharNumber: number = 0;
    constructor(public note: string, public step: number,) {
        for (let i = 0; i < musicChars.length; i++) {
            if (this.note.includes(musicChars[i])) {
                this.musicChar = musicChars[i];
                this.musicCharNumber = musicCharsToNumbers[i];
                break;
            }
        }
    }
    private mapNumberToItsChar(n: number) {
        return musicChars[musicCharsToNumbers.indexOf(n)]
    }
    private sanitizer(note: string) {
        const pitches = note.match(/\'|,/g) || [] as string[];
        const difference = pitches?.filter(p => p === ',').length - pitches?.filter(p => p === '\'').length
        let [noteWithoutPiches, length, tie] = note.match(/.*[CDEFGAB]|\)|\/([2468]|16)/g) || [];
        length = length || ''
        tie = tie || '';
        if (difference === 0) return noteWithoutPiches + '' + length + tie
        if (difference > 0) return noteWithoutPiches + ','.repeat(difference) + length + tie;
        if (difference < 0) return noteWithoutPiches + '\''.repeat(-1 * difference) + length + tie;
    }
    move() {
        let up = 0;
        let down = 0;
        let newPosition = this.musicCharNumber + this.step;
        const recusiveCountMovement = () => {
            if (newPosition < 0) {
                newPosition = newPosition + MUSIC_CHAR_COUNT
                up++;
                recusiveCountMovement()
            }
            if (newPosition > 6) {
                newPosition = newPosition - MUSIC_CHAR_COUNT
                down++;
                recusiveCountMovement()
            }
            return;
        }
        recusiveCountMovement();
        const newChar = this.mapNumberToItsChar(newPosition) + ('\'').repeat(up) + (',').repeat(down)
        return this.sanitizer(this.note.replace(this.musicChar, newChar))
    }
}