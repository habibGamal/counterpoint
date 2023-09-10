/** abc example
%barnumbers 1
%printtempo 0
%stretchlast 0
%score {V0 *M| V1}
Q:1/4=140
M:4/4
K:C
L:1/16
V: V0 clef=treble name="Sop."
V: V1 clef=bass name="Bas."
[V: V0]c16|d16|c16|d16|c16|z16|z16|z16|z16|z16|]
[V: V1]z16|z16|z16|z16|z16|z16|z16|z16|z16|z16|]
 */

import CFRules from "./CFRules";
import CustomFlags from "./CustomFlags";
import Measurements from "./Measurements";
import Type1Rules from "./Type1Rules";
import Type2Rules from "./Type2Rules";
import Type4Rules from "./Type4Rules";
import Type3Rules from "./Type4Rules";

const [C, D, E, F, G, A, B] = [0, 2, 4, 5, 7, 9, 11];
export default class Interceptor {
    public meaturements = new Measurements();
    private flags = new CustomFlags();
    constructor(private abcString: string, private vsp: number[], private vid: number[], private mode: number) {
        console.log(this.abcString);
        console.log("this.getVoicesAsDistances()", this.getVoicesAsDistances());
    }

    public getMode(): string {
        switch (this.mode) {
            case 0:
                return "C";
            case 2:
                return "D";
            case 4:
                return "E";
            case 5:
                return "F";
            case 7:
                return "G";
            case 9:
                return "A";
            case 11:
                return "B";
            default:
                return "C";
        }
    }

    public getAbcString(): string {
        return this.abcString;
    }

    public getVoices(): string[][][] {
        // get what ever after [V: V0]
        const [upperVoice, bottomVoice] = this.abcString.match(/\[V: V\d\].*/g) as [string, string];
        return [
            (
                bottomVoice
                    .replace(/\[V: V\d\]/g, "")
                    .replace("|]", "")
                    .split("|") as string[]
            ).map((bar) => bar.match(/(\.\()*(\^|\_)*[A-Ga-gz]+('*,*)+\d+(\)*)+(-)*/g)) as string[][],

            (
                upperVoice
                    .replace(/\[V: V\d\]/g, "")
                    .replace("|]", "")
                    .split("|") as string[]
            ).map((bar) => bar.match(/(\.\()*(\^|\_)*[A-Ga-gz]+('*,*)+\d+(\)*)+(-)*/g)) as string[][],
        ] as string[][][];
    }

    private turnVoiceToDistances(voice: string[][]): string[][] {
        const flatDistances: string[] = [];
        const flatVoice = voice.flat();
        for (let i = 0; i < flatVoice.length; i++) {
            if (i === 0) {
                flatDistances.push("__");
                continue;
            }
            const previousNote = flatVoice[i - 1];
            const currentNote = flatVoice[i];
            const distance = this.meaturements.dist(currentNote, previousNote);
            flatDistances.push(distance);
        }
        let startPointer = 0;
        let endPointer = 0;
        const distances: string[][] = [];
        for (let i = 0; i < voice.length; i++) {
            endPointer = endPointer + voice[i].length;
            startPointer = endPointer - voice[i].length;
            distances.push(flatDistances.slice(startPointer, endPointer));
        }
        return distances;
    }

    public getVoicesAsDistances(): string[][][] {
        const [bottomVoice, upperVoice] = this.getVoices();
        return [this.turnVoiceToDistances(bottomVoice), this.turnVoiceToDistances(upperVoice)];
    }

    public getCFLocation(): number {
        const location = this.vsp.indexOf(0);
        return location === -1 ? 0 : location;
    }

    public getCPLocation(): number {
        return this.getCFLocation() ? 0 : 1;
    }

    public getCPType(): number {
        return this.vsp[this.getCPLocation()];
    }

    public getFlags() {
        return this.flags.getFlags();
    }

    private pushFlag(comment: string, voiceIndex: number, noteIndex: number, end_slur?: number) {
        this.flags.addFlag(this.flags.createFlag(comment, end_slur), voiceIndex, noteIndex);
    }

    public applyRules() {
        const type = this.getCPType();
        const cFRules = new CFRules().rules(this);
        for (const rule of cFRules) {
            const location = rule.rule();
            if (location !== true) {
                this.pushFlag(rule.comment, location.voiceIndex, location.noteIndex, location.end_slur);
                break;
            }
        }
        if (type === 1) {
            const rules = new Type1Rules().rules(this);
            for (const rule of rules) {
                const location = rule.rule();
                if (location !== true) {
                    this.pushFlag(rule.comment, location.voiceIndex, location.noteIndex, location.end_slur);
                    break;
                }
            }
        }
        if (type === 2) {
            const rules = new Type2Rules().rules(this);
            for (const rule of rules) {
                const location = rule.rule();
                if (location !== true) {
                    this.pushFlag(rule.comment, location.voiceIndex, location.noteIndex, location.end_slur);
                    break;
                }
            }
        }
        if (type === 4) {
            const rules = new Type4Rules().rules(this);
            for (const rule of rules) {
                const location = rule.rule();
                if (location !== true) {
                    this.pushFlag(rule.comment, location.voiceIndex, location.noteIndex, location.end_slur);
                    break;
                }
            }
        }
    }
}
