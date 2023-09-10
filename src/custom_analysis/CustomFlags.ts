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

    createFlag(comment: string, end_slur?: number) {
        return {
            s: 128,
            v: 1,
            fl: end_slur == undefined ? 521 : 281,
            fvl: 1,
            fsl: 128,
            end_custom_slur: end_slur,
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
