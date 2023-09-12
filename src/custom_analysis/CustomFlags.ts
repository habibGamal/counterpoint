export default class CustomFlags {
    private flags: any[] = [{}, {}];

    addFlag(flag: any, voiceIndex: number, noteIndex: number) {
        const location = this.flags[voiceIndex][noteIndex];
        if (location) {
            location.push(flag);
        } else {
            this.flags[voiceIndex][noteIndex] = [flag];
        }
    }

    getFlags() {
        return this.flags;
    }

    createFlag(comment: string,cpLocation:number, endSlur?: number, startLine?: number, noteIndex?: number) {
        const flagType = endSlur == undefined ? (startLine == undefined ? 521 : 481) : 281;
        return {
            s: noteIndex,
            v: 1,
            fl: flagType, // end_slur == undefined ? 521 : 281,
            fvl: cpLocation,
            fsl: startLine ?? 16,
            end_custom_slur: endSlur,
            accept: 0,
            severity: 100,
            class: "",
            name: "",
            subName: "/wrong alteration",
            comment,
            subComment: "",
            debugSt: "",
            paragraph_num: 27,
        };
    }
}
// abcjs-start-m0-n0 abcjs-end-m1-n0 abcjs-slur abcjs-legato abcjs-dotted abcjs-l0 abcjs-m0 abcjs-mm0 abcjs-v0
