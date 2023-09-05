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

const [C, D, E, F, G, A, B] = [0, 2, 4, 5, 7, 9, 11];
export default class Interceptor {
    public meaturements = new Measurements();
    private flags = new CustomFlags();
    constructor(private abcString: string, private vsp: number[], private vid: number[], private mode: number) {
        console.log("abcString", abcString);
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

    public getVoices(): string[][] {
        // get what ever after [V: V0]
        const [upperVoice, bottomVoice] = this.abcString.match(/\[V: V\d\].*/g) as [string, string];
        return [
            bottomVoice
                .replace(/\[V: V\d\]/g, "")
                .replace("|]", "")
                .split("|") as string[],
            upperVoice
                .replace(/\[V: V\d\]/g, "")
                .replace("|]", "")
                .split("|") as string[],
        ];
    }

    private turnVoiceToDistances(voice: string[]): string[] {
        return voice.map((note, index) => {
            if (index === 0) {
                return "__";
            }
            return this.meaturements.dist(note, voice[index - 1]);
        });
    }

    public getVoicesAsDistances(): string[][] {
        const [bottomVoice, upperVoice] = this.getVoices();
        return [this.turnVoiceToDistances(bottomVoice), this.turnVoiceToDistances(upperVoice)];
    }

    public getCFLocation(): number {
        const vsp = this.vsp.join("");
        const vid = this.vid.join("");
        if (vsp == "01") return 0;
        if (vsp == "10") return 1;
        if (vid == "1") return 0;
        else return 1;
    }

    public getCPLocation(): number {
        return this.getCFLocation() ? 0 : 1;
    }

    public getFlags() {
        return this.flags.getFlags();
    }

    private pushFlag(className: string, name: string, comment: string, voiceIndex: number, noteIndex: number) {
        this.flags.addFlag(this.flags.createFlag(className, name, comment), voiceIndex, noteIndex);
    }

    public applyRules() {
        new CFRules().rules(this).forEach((rule) => {
            const location = rule.rule();
            if (location !== true) {
                this.pushFlag(rule.className, rule.name, rule.comment, location.voiceIndex, location.noteIndex);
            }
        });
        new Type1Rules().rules(this).forEach((rule) => {
            const location = rule.rule();
            if (location !== true) {
                this.pushFlag(rule.className, rule.name, rule.comment, location.voiceIndex, location.noteIndex);
            }
        });
    }
}
