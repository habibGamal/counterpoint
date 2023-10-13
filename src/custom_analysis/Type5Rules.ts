import Interceptor from "./Interceptor";
import { Location, Rule } from "./types";
interface CPSlice {
    type: number;
    slice: string[];
}
const allowedCrossDistances = ["3T1.5", "3T2", "5T3.5", "6T4", "6T4.5", "8T0", "_"];
export default class Type5Rules {
    cpByTypes(cp: string[][]): CPSlice[] {
        const cpSlices: CPSlice[] = [];
        for (let i = 0; i < cp.length; i++) {
            const slice = cp[i];
            let type = 0;
            const firstNoteInSlice = slice[0];
            if (firstNoteInSlice.includes("16")) type = 1;
            else if (firstNoteInSlice.includes("4")) type = 3;
            else if (firstNoteInSlice.includes("8")) {
                const secondNoteInSlice = slice[1];
                const previeusSlice = cp[i - 1];
                if (
                    firstNoteInSlice.includes("-") ||
                    secondNoteInSlice.includes("-") ||
                    previeusSlice?.[1]?.includes("-")
                )
                    type = 4;
                else type = 2;
            }
            cpSlices.push({ type, slice });
        }
        return cpSlices;
    }
    type2Rules(cpSlices: CPSlice[]) {
        for (let i = 0; i < cpSlices.length; i++) {
            const cpSlice = cpSlices[i];
            if (cpSlice.type !== 2) continue;
        }
    }
    rules(interceptor: Interceptor): Rule[] {
        const voices = interceptor.getVoices();
        const cpLocation = interceptor.getCPLocation();
        const cp = voices[cpLocation];
        const cpFlat = cp.flat();
        const cpNotes1 = cp.map((arr) => arr[0]);
        const cpNotes2 = cp.map((arr) => arr[1]);
        const cpNotes3 = cp.map((arr) => arr[2]);
        const cpNotes4 = cp.map((arr) => arr[3]);
        const cf = voices[interceptor.getCFLocation()].map((arr) => arr[0]);
        const cpDistances = interceptor.getVoicesAsDistances()[cpLocation];
        const cpFlatDistances = cpDistances.flat();

        const crossAbsNotes1 = interceptor.meaturements.crossAbsDist(cpNotes1, cf);
        const crossAbsNotes2 = interceptor.meaturements.crossAbsDist(cpNotes2, cf);
        const crossAbsNotes3 = interceptor.meaturements.crossAbsDist(cpNotes3, cf);
        const crossAbsNotes4 = interceptor.meaturements.crossAbsDist(cpNotes4, cf);
        const crossNotes1 = interceptor.meaturements.crossDist(cpNotes1, cf);
        const crossNotes2 = interceptor.meaturements.crossDist(cpNotes2, cf);
        const crossNotes3 = interceptor.meaturements.crossDist(cpNotes3, cf);
        const crossNotes4 = interceptor.meaturements.crossDist(cpNotes4, cf);
        const isCPUpper = cpLocation === 1;
        const isCPLower = cpLocation === 0;
        const succeseiveDistances = interceptor.meaturements.successivesDistances(cpFlatDistances);
        const cpByTypes = this.cpByTypes(cp);
        console.log("cpByTypes", cpByTypes);

        return [
            {
                comment: "البداية يجب ان تكون سكتة بلانش",
                rule: () => {
                    const type = cpByTypes[0].type;
                    if (type === 1) return true;
                    const cpNote = cpNotes1[0];
                    if (["z8", "z4"].includes(cpNote)) return true;
                    return { voiceIndex: cpLocation, noteIndex: 0 };
                },
            },
            {
                comment: "البداية يجب ان تكون نغمة المقام او خامسة المقام او يونسون",
                rule: () => {
                    // cp is upper
                    if (isCPLower) return true;
                    const type = cpByTypes[0].type;
                    const crossAbsDist = type === 1 ? crossAbsNotes1[0] : crossAbsNotes2[0];
                    if ([8, 5, 0].includes(crossAbsDist)) return true;
                    const noteIndex = type === 1 ? 0 : 1;
                    return { voiceIndex: cpLocation, noteIndex: interceptor.voicesLocations[cpLocation][noteIndex] };
                },
            },
            {
                comment: "البداية يجب ان تكون نغمة المقام  او يونسون",
                rule: () => {
                    // cp is lower
                    if (isCPUpper) return true;
                    const type = cpByTypes[0].type;
                    const crossAbsDist = type === 1 ? crossAbsNotes1[0] : crossAbsNotes2[0];
                    if ([8, 0].includes(crossAbsDist)) return true;
                    const noteIndex = type === 1 ? 0 : 1;
                    return { voiceIndex: cpLocation, noteIndex: interceptor.voicesLocations[cpLocation][noteIndex] };
                },
            },
            {
                comment: "يجب ان تكون نغمة المقام",
                rule: () => {
                    const preLastBar = cpByTypes[cpByTypes.length - 2];
                    if (preLastBar.type !== 4) return true;
                    const lastCPNote = cpFlat[cpFlat.length - 1];
                    const thirdLastCPNote = cpFlat[cpFlat.length - 3];
                    const distance = interceptor.meaturements.absDist(lastCPNote, thirdLastCPNote);
                    if ([8, 0].includes(interceptor.meaturements.toBase8(distance))) return true;
                    return {
                        voiceIndex: cpLocation,
                        noteIndex: interceptor.voicesLocations[cpLocation][cpFlat.length - 3],
                    };
                },
            },
            {
                comment: "النغمة الاخيرة تسبق بالحساس",
                rule: () => {
                    const distance = interceptor.meaturements.dist(
                        cpFlat[cpFlat.length - 2],
                        cpFlat[cpFlat.length - 1]
                    );
                    const distanceWithoutTone = interceptor.meaturements.removeToneFormDist(distance);
                    if (distanceWithoutTone === "-2") return true;
                    return {
                        voiceIndex: cpLocation,
                        noteIndex: interceptor.voicesLocations[cpLocation][cpFlat.length - 2],
                    };
                },
            },
            {
                comment: "النهاية يجب ان تكون نغمة المقام",
                rule: () => {
                    const lastCPNote = cpFlat[cpFlat.length - 1];
                    const distance = interceptor.meaturements.absDist(lastCPNote, cf[cf.length - 1]);
                    if (
                        [8, 0].includes(interceptor.meaturements.toBase8(distance)) &&
                        interceptor.meaturements.isRound(lastCPNote)
                    )
                        return true;
                    return { voiceIndex: cpLocation, noteIndex: (cf.length - 1) * 16 };
                },
            },
            // type 2 rules
            {
                comment: "البلانش الاول يجب ان يكون متوافق",
                rule: harmonic(2, 1, cpByTypes, crossNotes1, cpLocation, interceptor),
            },
            {
                comment: "البلانش التانى إما يكون متوافق فيكون له حرية الحركة أو متنافر فيأخذ شكل مرور",
                rule: harmonicOrNonHarmonicPass(
                    2,
                    2,
                    cpByTypes,
                    crossAbsNotes2,
                    crossNotes2,
                    cpFlatDistances,
                    cpLocation,
                    cpFlat,
                    interceptor
                ),
            },
            // type 3 rules
            {
                comment: "النوار الاول يجب ان يكون متوافق",
                rule: harmonic(3, 1, cpByTypes, crossNotes1, cpLocation, interceptor),
            },
            {
                comment: "النوار الثاني يجب ان يكون متوافق او متنافر ياخذ صورة مرور",
                rule: harmonicOrNonHarmonicPass(
                    3,
                    2,
                    cpByTypes,
                    crossAbsNotes2,
                    crossNotes2,
                    cpFlatDistances,
                    cpLocation,
                    cpFlat,
                    interceptor
                ),
            },
            {
                comment: "النوار الثالث يجب ان يكون متوافق",
                rule: harmonic(3, 3, cpByTypes, crossNotes3, cpLocation, interceptor),
            },
            {
                comment: "النوار الرابع يجب ان يكون متوافق او متنافر ياخذ صورة مرور",
                rule: harmonicOrNonHarmonicPass(
                    3,
                    4,
                    cpByTypes,
                    crossAbsNotes4,
                    crossNotes4,
                    cpFlatDistances,
                    cpLocation,
                    cpFlat,
                    interceptor
                ),
            },
            // type 4 rules
            {
                comment: "البلانش الثاني يجب ان يكون متوافق",
                rule: harmonic(4, 2, cpByTypes, crossNotes2, cpLocation, interceptor),
            },
            {
                comment: "البلانش الاول يجب ان يكون متوافق او متنافر يهبط مسافة 2",
                rule: harmonicOrNonHarmonicPass(
                    4,
                    1,
                    cpByTypes,
                    crossAbsNotes1,
                    crossNotes1,
                    cpFlatDistances,
                    cpLocation,
                    cpFlat,
                    interceptor
                ),
            },

            {
                comment: "نغمة مكررة",
                rule: () => {
                    for (let i = 0; i < cpFlat.length; i++) {
                        const currentNoar = cpFlat[i];
                        const nextNoar = cpFlat[i + 1];
                        const hasTie = currentNoar.includes("-");
                        const distance = interceptor.meaturements.dist(currentNoar, nextNoar);
                        if (distance == "-0T0" && !hasTie)
                            return {
                                voiceIndex: cpLocation,
                                noteIndex: interceptor.voicesLocations[cpLocation][i + 1],
                            };
                    }
                    return true;
                },
            },
        ];
    }
}

function harmonic(
    type: number,
    noteNumber: number,
    cpByTypes: CPSlice[],
    crossNotes3: string[],
    cpLocation: number,
    interceptor: Interceptor
): () => true | Location {
    return () => {
        let lastIndex = -1;
        for (let i = 0; i < cpByTypes.length; i++) {
            const cpSlice = cpByTypes[i];
            const locationInCP = lastIndex + noteNumber;
            lastIndex += cpSlice.slice.length;
            if (cpSlice.type !== type) continue;
            if (!allowedCrossDistances.includes(crossNotes3[i])) {
                return {
                    voiceIndex: cpLocation,
                    noteIndex: interceptor.voicesLocations[cpLocation][locationInCP],
                };
            }
        }
        return true;
    };
}

function harmonicOrNonHarmonicPass(
    type: number,
    noteNumber: number,
    cpByTypes: CPSlice[],
    crossAbsNotes: number[],
    crossNotes: string[],
    cpFlatDistances: string[],
    cpLocation: number,
    cpFlat: string[],
    interceptor: Interceptor
): () => true | Location {
    return () => {
        let lastIndex = -1;
        for (let i = 0; i < cpByTypes.length; i++) {
            const cpSlice = cpByTypes[i];
            const locationInCP = lastIndex + noteNumber;
            const startOfScale = locationInCP === 1;
            lastIndex += cpSlice.slice.length;
            if (startOfScale) continue;
            if (cpSlice.type !== type) continue;
            if (type == 2) console.log("crossDistance",crossNotes);
            const crossAbsDistance = crossAbsNotes[i];
            const crossDistance = crossNotes[i];
            if (allowedCrossDistances.includes(crossDistance)) {
                continue;
            } else if ([2, 4, 7].includes(crossAbsDistance)) {
                const previousNote = cpFlat[locationInCP - 1];
                const nextNote = cpFlat[locationInCP + 1];
                const distance = cpFlatDistances[locationInCP];
                const nextDistance = cpFlatDistances[locationInCP + 1];
                const direction = distance[0];
                if (type == 4) {
                    if (nextDistance.includes("-2")) continue;
                    return {
                        voiceIndex: cpLocation,
                        noteIndex: interceptor.voicesLocations[cpLocation][locationInCP + 1],
                    };
                } else {
                    if (
                        (direction == "+" && nextDistance.includes("+2")) ||
                        (direction == "-" && nextDistance.includes("-2"))
                    )
                        continue;
                    if (
                        noteNumber == 4 &&
                        ((direction == "+" && nextDistance.includes("+3")) ||
                            (direction == "-" && nextDistance.includes("-3")))
                    )
                        continue;
                    if (type == 3) {
                        const nextNextDistance = cpFlatDistances[locationInCP + 2];
                        const diverge = nextNextDistance[0] != direction;
                        if (previousNote === nextNote) continue;
                        if (
                            (direction == "+" && nextDistance.includes("+3") && diverge) ||
                            (direction == "-" && nextDistance.includes("-3") && diverge)
                        )
                            continue;
                    }

                    return {
                        voiceIndex: cpLocation,
                        noteIndex: interceptor.voicesLocations[cpLocation][locationInCP + 1],
                    };
                }
            } else {
                return {
                    voiceIndex: cpLocation,
                    noteIndex: interceptor.voicesLocations[cpLocation][locationInCP],
                };
            }
        }
        return true;
    };
}
// IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtiYASABERgFIAIBgMlcQHJPMBiTjAGJM1QWJHDEUmACJBfNA2pLpqpurbqu6gBTqAlOoBUhvdpP1uggNSDdvOwyeJjtq3GxpSAQwDOfjAAuFYwAAShAHihAPihAIShEQzRDCEMADhRoQDYsdlpHmgAygD2AA4AdGgAQv6VYWDElKSEPvjEACZhfkQArgDmA5Q9-D6E-ACWAHYDALQALADsAKyNzWRtHZ1zvYSDw8S7YxMz88srADEMN0FUABUAEUA
