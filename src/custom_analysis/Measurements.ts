export default class Measurements {
    private getNoteLength(note: string): number {
        const [noteLength] = note.match(/2|4|8|16/g) as [string];
        return parseInt(noteLength);
    }

    calcNotesLocations(voice: string[][]) {
        const notesLocations: number[] = [];
        for (let i = 0; i < voice.length; i++) {
            const currentBar = voice[i];
            for (let j = 0; j < currentBar.length; j++) {
                if (j == 0) {
                    notesLocations.push(i * 16);
                    continue;
                }
                const currentNote = currentBar[j];
                const currentNoteLength = this.getNoteLength(currentNote);
                const lastLocation = notesLocations[notesLocations.length - 1];
                notesLocations.push(lastLocation + currentNoteLength);
            }
        }
        return notesLocations;
    }

    calcNotesLocations2d(voice: string[][], locations: number[]) {
        const notesLocations2d: number[][] = [];
        let lastIndex = 0;
        for (let i = 0; i < voice.length; i++) {
            const currentBar = voice[i];
            notesLocations2d.push(locations.slice(lastIndex, lastIndex + currentBar.length));
            lastIndex += currentBar.length;
        }
        return notesLocations2d;
    }
    /**
     * treating the charTones as a circle
     * cutting in the direction of the clock
     */
    private charTonesCutOf(start: number, end: number) {
        if (start <= end) return charTones.slice(start, end);
        else return [...charTones.slice(start), ...charTones.slice(0, end)];
    }
    private modifierToValue(modifier: string | undefined) {
        if (modifier == "^") return 0.5;
        else if (modifier == "_") return -0.5;
        else return 0;
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
        let [startModifier] = start.match(/\^|_/g) ?? [];
        let [endModifier] = end.match(/\^|_/g) ?? [];
        const [startChar] = start.match(/[a-g]/g) as [string];
        const [endChar] = end.match(/[a-g]/g) as [string];
        const startIndex = charTones.findIndex((charTone) => charTone.char === startChar);
        const endIndex = charTones.findIndex((charTone) => charTone.char === endChar);
        const tones = this.charTonesCutOf(startIndex, endIndex);
        return (
            -this.modifierToValue(startModifier) +
            tones.reduce((acc, cur) => acc + cur.value, 0) +
            this.modifierToValue(endModifier)
        );
    }

    /**
     * note formate is like "c16", "_d8", "^F4"
     */
    dist(note1: string, note2: string): string {
        if (note1 == undefined || note2 == undefined) return "_";
        const [key1] = (note1.match(/[A-Ga-g]+'*,*/g) as string[]) ?? [];
        const [key2] = (note2.match(/[A-Ga-g]+'*,*/g) as string[]) ?? [];
        const [keyChar1] = (note2.match(/(\^|\_)*[A-Ga-g]/g) as string[]) ?? [];
        const [keyChar2] = (note1.match(/(\^|\_)*[A-Ga-g]/g) as string[]) ?? [];
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

    removeToneFormDist(dist: string): string {
        return dist.replace(/T.*/g, "");
    }

    /**
     * note formate is like "c16", "d8", "F4"
     */
    absDist(note1?: string, note2?: string): number {
        if (note1 == undefined || note2 == undefined) return -1;
        const [key1] = (note1.match(/[A-Ga-g]+'*,*/g) as string[]) ?? [];
        const [key2] = (note2.match(/[A-Ga-g]+'*,*/g) as string[]) ?? [];
        if (!key1 || !key2) return -1;
        const index1 = order.indexOf(key1);
        const index2 = order.indexOf(key2);
        const difference = Math.abs(index1 - index2);
        const isSamePosition = difference === 0;
        const distance = isSamePosition ? difference : difference + 1;
        return distance;
    }

    crossAbsDist(line1: string[], line2: string[]): number[] {
        const distances = [];
        for (let i = 0; i < line1.length; i++) {
            const note1 = line1[i];
            const note2 = line2[i];
            distances.push(this.absDist(note1, note2));
        }
        return distances.map((dist) => this.toBase8(dist));
    }

    crossDist(line1: string[], line2: string[]): string[] {
        const distances = line1.map((note1, i) => {
            if (note1 == undefined || line2[i] == undefined) return "_";
            return this.dist(note1, line2[i]);
        });
        return distances.map((distance) => {
            const trimSign = distance.replace(/[\+\-]/g, "");
            if (distance == "_") return "_";
            const [dist, tone] = trimSign.split("T");
            return `${this.toBase8(parseInt(dist))}T${tone}`;
        });
    }

    /**
     *
     * @param dist 22
     * @returns 22 - 7 - 7 = 8
     */
    toBase8(dist: number): number {
        if (dist <= 8) return dist;
        return this.toBase8(dist - 7);
    }

    noteHasDias(note: string): boolean {
        return note.includes("^");
    }

    noteHasBMoll(note: string): boolean {
        return note.includes("_");
    }

    successivesDistances(distances: string[]): string[][] {
        const succeseiveDistances = [];
        let currentSuccessiveDistances = [];
        for (let i = 0; i < distances.length; i++) {
            const distance = distances[i];
            if (i == 0) {
                currentSuccessiveDistances.push(distance);
                if (distances.length == 1) succeseiveDistances.push(currentSuccessiveDistances);
                continue;
            }
            const currentDirection = currentSuccessiveDistances[0][0];
            const distanceDirection = distance[0];
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
    /**
     *
     * @param distances ['+4T2.5', '+3T1.5']
     * @returns 6
     */
    absSum(distances: string[]): number {
        const numberOfSteps = distances.length - 1;
        const sum = distances
            .map((item) => parseInt(item.replace("-", "")))
            .filter((item) => !isNaN(item))
            .reduce((acc, current) => acc + current, 0);
        return sum - numberOfSteps;
    }

    /**
     *
     * @param removeZeros ['+4T2.5', '+3T1.5']
     * @returns +6T4
     */
    sumWithTones(distances: string[]): string {
        if (distances.includes("_") || distances.includes("__")) return "EE";
        const removeZeros = distances.filter((item) => item !== "-0T0");
        if (removeZeros.length === 0) return "EE";
        const numberOfSteps = removeZeros.length - 1;
        const sum = removeZeros
            .map((item) => parseInt(item.replace("-", "")))
            .filter((item) => !isNaN(item))
            .reduce((acc, current) => acc + current, 0);
        const totalDistance = sum - numberOfSteps;
        const sumOfTones = removeZeros
            .map((item) => parseFloat(item.split("T")[1]))
            .filter((item) => !isNaN(item))
            .reduce((acc, current) => acc + current, 0);
        const sign = removeZeros[0][0];
        return `${sign}${totalDistance}T${sumOfTones}`;
    }

    /**
     *
     * @param d1 '+4T2.5'
     * @param d2 '+3T1.5'
     * @returns (4+2.5) - (3+1.5)
     */
    compareDistances(d1: string, d2: string) {
        const distances = [d1, d2].map((d) => d.replace("-", ""));
        const distToneSplited = distances.map((d) => d.split("T"));
        const [dist1, tone1, dist2, tone2] = distToneSplited.flat().map((n) => parseFloat(n));
        return dist1 + tone1 - (dist2 + tone2);
    }

    /**
     *
     * @param distances ['+4T2.5', '+3T1.5']
     * @param search '+6T4'
     * @returns true if search is in distances
     * false if search is not in distances
     */
    contains(distances: string[], search: string): false | [number, number] {
        let leftPointer = 0;
        let rightPointer = 1;
        let result = false;
        while (rightPointer <= distances.length && leftPointer < rightPointer) {
            const sum = this.sumWithTones(distances.slice(leftPointer, rightPointer));
            if (sum === search) {
                result = true;
                break;
            } else if (this.compareDistances(sum, search) < 0) {
                rightPointer++;
            } else {
                leftPointer++;
            }
        }
        return result ? [leftPointer, rightPointer] : false;
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
