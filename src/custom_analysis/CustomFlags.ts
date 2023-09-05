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

    createFlag(className: string, name: string,comment: string) {
        return {
            s: 128,
            v: 1,
            fl: 521,
            fvl: 1,
            fsl: 128,
            accept: 0,
            severity: 100,
            class: className,
            name,
            subName: "/wrong alteration",
            comment,
            subComment: "",
            debugSt: "",
            paragraph_num: 27,
        };
    }
}
