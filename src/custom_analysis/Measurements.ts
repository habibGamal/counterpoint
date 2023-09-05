export default class Measurements {
    /**
     * treating the charTones as a circle
     * cutting in the direction of the clock
     */
    private charTonesCutOf(start: number, end: number) {
        if (start <= end) return charTones.slice(start, end);
        else return [...charTones.slice(start), ...charTones.slice(0, end)];
    }

    /**
     * keyChar formate is like "c" , "d", "f" small chars from a to g
     */
    private measureTones(keyChar1: string, keyChar2: string, direction: "+" | "-"): number {
        let start = keyChar1;
        let end = keyChar2;
        if (direction === "-") {
            // swap
            start = keyChar2;
            end = keyChar1;
        }
        const startIndex = charTones.findIndex((charTone) => charTone.char === start);
        const endIndex = charTones.findIndex((charTone) => charTone.char === end);
        const tones = this.charTonesCutOf(startIndex, endIndex);
        // console.log(startIndex, endIndex, tones);
        return tones.reduce((acc, cur) => acc + cur.value, 0);
    }

    /**
     * note formate is like "c16", "d8", "F4"
     */
    dist(note1: string, note2: string): string {
        const [key1] = (note1.match(/[A-Ga-g]+'*,*/g) as string[]) ?? [];
        const [key2] = (note2.match(/[A-Ga-g]+'*,*/g) as string[]) ?? [];
        const [keyChar1] = (note2.match(/[A-Ga-g]/g) as string[]) ?? [];
        const [keyChar2] = (note1.match(/[A-Ga-g]/g) as string[]) ?? [];
        if (!key1 || !key2) return "_";
        const index1 = order.indexOf(key1);
        const index2 = order.indexOf(key2);
        const direction = index1 > index2 ? "+" : "-";
        const difference = Math.abs(index1 - index2);
        const isSamePosition = difference === 0;
        const distance = isSamePosition ? difference : difference + 1;
        const tones = this.measureTones(keyChar1.toLowerCase(), keyChar2.toLowerCase(), direction);
        return (direction + distance).toString() + "T" + tones.toString();
    }

    successivesDistances(distances: string[]): string[][] {
        const succeseiveDistances = [];
        let currentSuccessiveDistances = [];
        for (let i = 0; i < distances.length; i++) {
            const distance = distances[i];
            if (i == 0) {
                currentSuccessiveDistances.push(distance);
                continue;
            }
            const currentDirection = currentSuccessiveDistances[0].includes("+") ? "+" : "-";
            const distanceDirection = distance.includes("+") ? "+" : "-";
            if (currentDirection !== distanceDirection) {
                succeseiveDistances.push(currentSuccessiveDistances);
                currentSuccessiveDistances = [];
            }
            currentSuccessiveDistances.push(distance);
            if (i === distances.length - 1) {
                succeseiveDistances.push(currentSuccessiveDistances);
            }
        }
        return succeseiveDistances;
    }

    absSum(distances: string[]): number {
        const numberOfSteps = distances.length - 1;
        const sum = distances
            .map((item) => parseInt(item.replace("-", "")))
            .filter((item) => !isNaN(item))
            .reduce((acc, current) => acc + current, 0);
        return sum - numberOfSteps;
    }

    isRound(note: string): boolean {
        const [len] = (note.match(/16|8|4|2|1/g) as string[]) ?? [];
        const [rest] = (note.match(/z/g) as string[]) ?? [];
        if (!len || rest) return false;
        return len === "16";
    }
}

const order = [
    "C,,",
    "D,,",
    "E,,",
    "F,,",
    "G,,",
    "A,,",
    "B,,",
    "C,",
    "D,",
    "E,",
    "F,",
    "G,",
    "A,",
    "B,",
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
    "c",
    "d",
    "e",
    "f",
    "g",
    "a",
    "b",
    `c'`,
    `d'`,
    `e'`,
    `f'`,
    `g'`,
    `a'`,
    `b'`,
    `c''`,
    `d''`,
    `e''`,
    `f''`,
    `g''`,
    `a''`,
    `b''`,
];
const charTones = [
    {
        char: "c",
        value: 1,
    },
    {
        char: "d",
        value: 1,
    },
    {
        char: "e",
        value: 0.5,
    },
    {
        char: "f",
        value: 1,
    },
    {
        char: "g",
        value: 1,
    },
    {
        char: "a",
        value: 1,
    },
    {
        char: "b",
        value: 0.5,
    },
];
