import abcjs from "../lib/abc/abc";
import { Actions } from "../PlayOLD";
import Accidental from "./Accidentals";
import { DragCalculator } from "./DragCalculator";

export default class Control {
  // this.tune , this.tab , this.setTab, currentElement ,setCurrentElment
  constructor(
    public tune: abcjs.TuneObject | undefined,
    public tab: string,
    public setTab: React.Dispatch<React.SetStateAction<string>>,
    public currentElement: abcjs.AbcElem | null,
    public setCurrentElementFocus: (newElement: abcjs.AbcElem | null) => void,
    public setAction: React.Dispatch<React.SetStateAction<Actions>>
  ) {}
  private fullDestructionTab(): [string, string, string, string] {
    const part1 = this.tab.substring(0, this.currentElement!.startChar);
    const part2 = this.tab.substring(this.currentElement!.endChar);
    const [note, orginalLength] = this.tab
      .slice(this.currentElement!.startChar, this.currentElement!.endChar)
      .split("/");
    return [part1, part2, note, orginalLength];
  }
  private partialDestructionTab(): [string, string, string] {
    const part1 = this.tab.substring(0, this.currentElement!.startChar);
    const part2 = this.tab.substring(this.currentElement!.endChar);
    const note = this.tab.slice(
      this.currentElement!.startChar,
      this.currentElement!.endChar
    );
    return [part1, part2, note];
  }
  public changeNote(char: string) {
    if (this.currentElement === null) return;
    const [part1, part2, note, orginalLength] = this.fullDestructionTab();
    const length = orginalLength ? "/" + orginalLength : "";
    const newNote = note.replace(/A|B|C|D|E|G|G|Z/, char);
    this.setTab(part1 + newNote + length + part2);
  }
  public changeNoteLength(length: number) {
    if (this.currentElement === null) return;
    const [part1, part2, note] = this.fullDestructionTab();
    if (length === 1) {
      this.setTab(part1 + note + part2);
      return;
    }
    this.setTab(part1 + note + "/" + length + part2);
  }
  public deleteNote() {
    if (this.currentElement === null) return;
    const [part1, part2] = this.fullDestructionTab();
    const newTab = part1 + part2;
    if (!newTab.includes("||") && !newTab.includes("]|")) {
      this.setTab(part1 + part2);
    }
  }
  public addNote() {
    if (this.currentElement === null) return;
    const part1 = this.tab.substring(0, this.currentElement.endChar);
    const part2 = this.tab.substring(this.currentElement.endChar);
    const [note, orginalLength] = this.tab
      .slice(this.currentElement.startChar, this.currentElement.endChar)
      .split("/");
    const newNote = orginalLength
      ? part1 + "z/" + orginalLength.replace(")","") + part2
      : part1 + "z" + part2;
    this.setAction("ADD");
    console.log(newNote);
    
    this.setTab(newNote);
  }
  private getNextNonBarElement() {
    let nextElement = this.tune!.getElementFromChar(
      this.currentElement!.endChar
    ) as abcjs.AbcElem;
    if (!nextElement) return;
    if (nextElement.el_type === "bar") {
      nextElement = this.tune!.getElementFromChar(
        nextElement.endChar
      ) as abcjs.AbcElem;
    }
    return nextElement;
  }
  public removeTie() {
    if (this.currentElement === null) return;
    const part1 = this.tab.substring(0, this.currentElement.startChar);
    const note = this.tab.slice(
      this.currentElement.startChar,
      this.currentElement.endChar
    );
    // get next (non-bar) element
    const note2Element = this.getNextNonBarElement();
    if (!note2Element) return;

    // get what between note 1 and note 2
    const betweenNote1Note2 = this.tab.slice(
      this.currentElement.endChar,
      note2Element.startChar
    );
    // get text of note 2
    const note2 = this.tab.slice(note2Element.startChar, note2Element.endChar);
    const part2 = this.tab.substring(note2Element!.endChar);
    const partToBeChanged = note + betweenNote1Note2 + note2;
    // remove first and last char
    const newNote = part1 + partToBeChanged.slice(1,-1) + part2;
    this.setTab(newNote);
  }
  public addTie() {
    if (this.currentElement === null || this.tune === undefined) return;
    const part1 = this.tab.substring(0, this.currentElement.startChar);
    const note = this.tab.slice(
      this.currentElement.startChar,
      this.currentElement.endChar
    );
    // remove tie if it exists
    if (note.includes("(")) {
      this.removeTie();
      return;
    }
    // exit if note 1 is rest
    if (note.includes("z")) return;
    // get next (non-bar) element
    const note2Element = this.getNextNonBarElement();
    if (!note2Element) return;
    // exit if it rest
    if (note2Element.rest) return;
    // get what between note 1 and note 2
    const betweenNote1Note2 = this.tab.slice(
      this.currentElement.endChar,
      note2Element.startChar
    );
    // get text of note 2
    const note2 = this.tab.slice(note2Element.startChar, note2Element.endChar);
    const part2 = this.tab.substring(note2Element!.endChar);
    // if there are any text "text" extract it
    const preText = (note.match(/".*"/g) || [null])[0];
    // add the leading tie
    let noteWithPreTie = "";
    if (preText) noteWithPreTie = note.replace(preText, preText + "(");
    else noteWithPreTie = "(" + note;
    // add the tail tie
    const newNote =
      part1 + noteWithPreTie + betweenNote1Note2 + note2 + ")" + part2;
    this.setTab(newNote);
  }
  public addAccidental(accidental: string) {
    if (this.currentElement === null) return;
    const [part1, part2, note] = this.partialDestructionTab();
    const newNote = part1 + new Accidental(note, accidental).change() + part2;
    this.setTab(newNote);
  }
  // public check() {
  //     const voiceToCheck = index === 0 ? voice1.split('|') : voice2.split('|');
  //     voiceToCheck.pop();
  //     if (this.tune)
  //         new Check(this.tune, index!, voiceToCheck, this.tab)
  // }
  public move(to: number) {
    const [part1, part2, note] = this.partialDestructionTab();
    const dragCalc = new DragCalculator(note, to);
    this.setTab(part1 + dragCalc.move() + part2);
  }

  public selectNext() {
    let newElement = this.tune!.getElementFromChar(
      this.currentElement!.endChar
    ) as abcjs.AbcElem;
    if (newElement.el_type !== "note") {
      newElement = this.tune!.getElementFromChar(
        newElement.endChar
      ) as abcjs.AbcElem;
    }
    this.setCurrentElementFocus(newElement);
  }
  public selectPrev() {
    let newElement = this.tune!.getElementFromChar(
      this.currentElement!.startChar - 1
    ) as abcjs.AbcElem;
    if (newElement.el_type !== "note") {
      newElement = this.tune!.getElementFromChar(
        newElement.startChar - 1
      ) as abcjs.AbcElem;
    }
    this.setCurrentElementFocus(newElement);
  }
  private getNextCharIndexOfSeparator(
    charIndex: number = this.currentElement!.endChar
  ): number {
    if (this.tab.at(charIndex) === "|") return charIndex;
    return this.getNextCharIndexOfSeparator(charIndex + 1);
  }
  private getPrevCharIndexOfSeparator(
    charIndex: number = this.currentElement!.startChar
  ): number {
    if (this.tab.at(charIndex) === "|" || this.tab.at(charIndex) === "]")
      return charIndex;
    return this.getPrevCharIndexOfSeparator(charIndex - 1);
  }
  public addSection() {
    if (this.currentElement === null) return;
    const nextCharIndexOfSeparator = this.getNextCharIndexOfSeparator();
    const part1 = this.tab.substring(0, nextCharIndexOfSeparator);
    const part2 = this.tab.substring(nextCharIndexOfSeparator);
    this.setTab(part1 + "|z" + part2);
  }
  public deleteSection() {
    if (this.currentElement === null) return;
    const charPrevIndexOfSeparator = this.getPrevCharIndexOfSeparator();
    const charNextIndexOfSeparator = this.getNextCharIndexOfSeparator();
    const part1 = this.tab.substring(0, charPrevIndexOfSeparator + 1);
    const part2 = this.tab.substring(charNextIndexOfSeparator + 1);
    this.setTab(part1 + part2);
  }
}
