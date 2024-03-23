import { allowed6ButLowerBy2, restrictMaxAllowedHorizontalDistances } from "./Common";
import Interceptor from "./Interceptor";
import { Location, Rule } from "./types";

const allowedCrossDistances = ["3T1.5", "3T2", "5T3.5", "6T4", "6T4.5", "8T0", "_"];
const horizontalParallel = ["-8T0", "+8T0", "-5T3.5", "+5T3.5", "-4T2.5", "+4T2.5"];
export default class GeneralRules {
    getUnit(interceptor: Interceptor): number {
        switch (interceptor.getCPType()) {
            case 1:
                return 16;
            case 2:
                return 8;
            case 3:
                return 4;
            case 4:
                return 8;
            default:
                return 16;
        }
    }
    parallelCheck(interceptor: Interceptor, bulk: string[]): false | [string, number, number] {
        for (const parallelDistance of horizontalParallel) {
            const hasParallelDistance = interceptor.meaturements.contains(bulk, parallelDistance);
            if (hasParallelDistance == false) continue;
            return [parallelDistance, ...hasParallelDistance];
        }
        return false;
    }
    // verticalParallelCheck(crossAbsDist: number[], location: (catchPosition: number) => number): false | number {
    //     for (let i = 0; i < crossAbsDist.length; i++) {
    //         const currentDistance = crossAbsDist[i];
    //         const nextDistance = crossAbsDist[i + 1];
    //         if (currentDistance == nextDistance && (currentDistance == 8 || currentDistance == 5)) {
    //             return location(i + 1);
    //         }
    //     }
    //     return false;
    // }
    verticalParallelCheck(crossAbsDist: number[], location: (catchPosition: number) => number): false | number {
        let occurenceOf8 = 0;
        let occurenceOf5 = 0;
        for (let i = 1; i < crossAbsDist.length - 1; i++) {
            const currentDistance = crossAbsDist[i];
            if (currentDistance == 8) occurenceOf8++;
            if (currentDistance == 5) occurenceOf5++;
            if (occurenceOf5 > 1 || occurenceOf8 > 1) return location(i);
        }
        return false;
    }
    rules(interceptor: Interceptor): Rule[] {
        const voices = interceptor.getVoices();
        const cfLocation = interceptor.getCFLocation();
        const cpLocation = interceptor.getCPLocation();
        const cp = voices[cpLocation];
        const cpFlat = cp.flat();
        const cpNote1 = cp.map((arr) => arr[0]);
        const cpNote2 = cp.map((arr) => arr[1]);
        const cpNote3 = cp.map((arr) => arr[2]);
        const cpNote4 = cp.map((arr) => arr[3]);
        const cf = voices[cfLocation].map((arr) => arr[0]);
        const voiceDistances = interceptor.getVoicesAsDistances();
        const cpDistances = voiceDistances[cpLocation];
        const cfDistances = voiceDistances[cfLocation];
        const cpFlatDistances = cpDistances.flat();
        const cfFlatDistances = cfDistances.flat();

        const crossAbsNote1 = interceptor.meaturements.crossAbsDist(cpNote1, cf);
        const crossAbsNote2 = interceptor.meaturements.crossAbsDist(cpNote2, cf);
        const crossAbsNote3 = interceptor.meaturements.crossAbsDist(cpNote3, cf);
        const crossAbsNote4 = interceptor.meaturements.crossAbsDist(cpNote4, cf);
        const isCPUpper = cpLocation === 1;
        const cpSucceseiveDistances = interceptor.meaturements.successivesDistances(cpFlatDistances);
        const cfSucceseiveDistances = interceptor.meaturements.successivesDistances(cfFlatDistances);
        const unit = this.getUnit(interceptor);

        console.log("cp", cp);

        return [
            {
                comment: "النغمة يجب ان تكون (سي♭)",
                rule: () => {
                    let passed = true;
                    const location: Location = {
                        voiceIndex: cpLocation,
                        noteIndex: 0,
                    };
                    if (!["D", "F"].includes(interceptor.getMode())) return true;
                    const bNotes = cpFlat.map((note) => {
                        if (note.includes("b") || note.includes("B"))
                            return interceptor.meaturements.noteHasBMoll(note);
                        return true;
                    });
                    const bNotesE = cp.map((arr) => {
                        let barHasBMoll = false;
                        arr.forEach((note) => {
                            if (
                                (note.includes("b") || note.includes("B")) &&
                                interceptor.meaturements.noteHasBMoll(note)
                            )
                                barHasBMoll = true;
                        });
                        if (barHasBMoll) return arr.map((note) => true);
                        return arr.map((note) => {
                            if (note.includes("b") || note.includes("B"))
                                return interceptor.meaturements.noteHasBMoll(note);
                            return true;
                        });
                    });
                    const noteIndex = bNotesE.flat().indexOf(false);
                    if (noteIndex !== -1) {
                        location.noteIndex = interceptor.voicesLocations[cpLocation][noteIndex];
                        passed = false;
                    }
                    return passed ? true : location;
                },
            },
            {
                comment: "يستخدم (فا#) اذا سبقت الحساس",
                rule: () => {
                    let passed = true;
                    const location: Location = {
                        voiceIndex: cpLocation,
                        noteIndex: 0,
                    };
                    if (interceptor.getMode() !== "A") return true;
                    const thirdLastNote = cpFlat[cp.length - 3];
                    if (
                        (thirdLastNote.includes("F") || thirdLastNote.includes("f")) &&
                        !interceptor.meaturements.noteHasDias(thirdLastNote)
                    ) {
                        location.noteIndex = interceptor.voicesLocations[cpLocation][cp.length - 3];
                        passed = false;
                    }
                    return passed ? true : location;
                },
            },
            {
                comment: "يجب رفع الحساس في هذا المقام ",
                rule: () => {
                    let passed = true;
                    const location: Location = {
                        voiceIndex: cpLocation,
                        noteIndex: 0,
                    };
                    if (!["D", "G", "A",
                    //  "B", "E"
                    ].includes(interceptor.getMode())) return true;
                    const cpPreLastNote = cpFlat[cpFlat.length - 2];
                    console.log("cpFlat", cpFlat);
                    if (!interceptor.meaturements.noteHasDias(cpPreLastNote)) {
                        location.noteIndex = interceptor.voicesLocations[cpLocation][cpFlat.length - 2];
                        passed = false;
                    }
                    return passed ? true : location;
                },
            },
            {
                comment: "اربيج",
                rule: () => {
                    let passed = true;
                    const location: Location = {
                        voiceIndex: cpLocation,
                        noteIndex: 0,
                    };
                    const cpDistancesNoTones = cpFlatDistances.map((distance) => distance.replace(/T.*/g, ""));
                    const cfDistancesNoTones = cfFlatDistances.map((distance) => distance.replace(/T.*/g, ""));
                    for (let i = 0; i < cfDistancesNoTones.length - 1; i++) {
                        const start = i;
                        const end = i + 2;
                        const bulk = cfDistancesNoTones.slice(start, end).join();
                        if (bulk == "+3,+3" || bulk == "-3,-3") {
                            location.voiceIndex = cfLocation;
                            location.noteIndex = interceptor.voicesLocations[cfLocation][end - 1];
                            passed = false;
                            return location;
                        }
                    }
                    for (let i = 0; i < cpDistancesNoTones.length - 1; i++) {
                        const start = i;
                        const end = i + 2;
                        const bulk = cpDistancesNoTones.slice(start, end).join();
                        if (bulk == "+3,+3" || bulk == "-3,-3") {
                            location.voiceIndex = cpLocation;
                            location.noteIndex = interceptor.voicesLocations[cpLocation][end - 1];
                            passed = false;
                            return location;
                        }
                    }
                    return passed ? true : location;
                },
            },
            {
                comment: "تتابعات",
                rule: () => {
                    let passed = true;
                    const location: Location = {
                        voiceIndex: cpLocation,
                        noteIndex: 0,
                    };
                    const cpDistancesNoTones = cpFlatDistances.map((distance) => distance.replace(/T.*/g, ""));
                    const cfDistancesNoTones = cfFlatDistances.map((distance) => distance.replace(/T.*/g, ""));
                    for (let i = 0; i < cfDistancesNoTones.length - 4; i++) {
                        const start = i;
                        const end = i + 5;
                        const bulk = cfDistancesNoTones.slice(start, end).join();
                        if (bulk == "+2,+2,-2,+2,+2") {
                            location.voiceIndex = cfLocation;
                            location.noteIndex = interceptor.voicesLocations[cfLocation][end - 1];
                            passed = false;
                            return location;
                        }
                    }
                    for (let i = 0; i < cpDistancesNoTones.length - 4; i++) {
                        const start = i;
                        const end = i + 5;
                        const bulk = cpDistancesNoTones.slice(start, end).join();
                        if (bulk == "+2,+2,-2,+2,+2") {
                            location.voiceIndex = cpLocation;
                            location.noteIndex = interceptor.voicesLocations[cpLocation][end - 1];
                            passed = false;
                            return location;
                        }
                    }
                    return passed ? true : location;
                },
            },
            {
                comment: "توازي رأسي",
                rule: () => {
                    let passed = true;
                    const location: Location = {
                        voiceIndex: cpLocation,
                        noteIndex: 0,
                    };
                    const crossDistances = [crossAbsNote1.slice(1), crossAbsNote2, crossAbsNote3, crossAbsNote4];
                    console.log("crossDistances", crossDistances);
                    for (let i = 0; i < crossDistances.length; i++) {
                        const crossDistance = crossDistances[i];
                        const verticalParallelCheck = this.verticalParallelCheck(
                            crossDistance,
                            (catchPosition) => interceptor.voicesLocations2d[cpLocation][catchPosition][i]
                        );
                        if (verticalParallelCheck !== false) {
                            location.noteIndex = verticalParallelCheck;
                            passed = false;
                            return location;
                        }
                    }
                    return passed ? true : location;
                },
            },
            {
                comment: "توازي افقي",
                rule: () => {
                    let passed = true;
                    const location: Location = {
                        voiceIndex: cfLocation,
                        noteIndex: 0,
                    };
                    // console.log(cfSucceseiveDistances, cpSucceseiveDistances);
                    let lastIndex = 0;
                    for (let i = 0; i < cfSucceseiveDistances.length; i++) {
                        const bulk = cfSucceseiveDistances[i];
                        const parallelCheck = this.parallelCheck(interceptor, bulk);
                        if (parallelCheck == false) {
                            lastIndex += bulk.length;
                            continue;
                        }
                        const [parallelDistance, leftPointer, rightPointer] = parallelCheck;
                        const start = lastIndex + leftPointer - 1;
                        const end = lastIndex + rightPointer - 1;
                        lastIndex += bulk.length;
                        const direction = parallelDistance[0];
                        const removeLastElements = cpDistances[end].length - 1;
                        const corrospondCPDistances = cpDistances
                            .slice(start, end + 1)
                            .flat()
                            .slice(1, removeLastElements === 0 ? undefined : -removeLastElements)
                            .filter((item) => item !== "__" && item !== "-0T0");
                        const corrospondCP = cp
                            .slice(start, end + 1)
                            .flat()
                            .slice(0, removeLastElements === 0 ? undefined : -removeLastElements);
                        const distance = interceptor.meaturements.dist(
                            corrospondCP[corrospondCP.length - 1],
                            corrospondCP[0]
                        );
                        const sameDirection = corrospondCPDistances.every((item) => item[0] === direction);
                        // console.log("corrospondCPDistances", corrospondCPDistances);
                        // console.log("corrospondCP", corrospondCP);
                        // console.log("sameDirection", sameDirection);
                        // console.log("distance", distance);
                        // console.log("------------------------------");
                        if (distance == parallelDistance && sameDirection) {
                            location.startLine = start * 16;
                            location.noteIndex = end * 16;
                            passed = false;
                        }
                    }
                    return passed ? true : location;
                },
            },
            {
                comment: "لقد تجاوزت المسافات المسموح بها افقيا ",
                rule: () => {
                    return restrictMaxAllowedHorizontalDistances(interceptor, cpSucceseiveDistances, cpLocation);
                },
            },
            {
                comment: "مسموح بمسافة 6 صغيرة صاعدة على ان تهبط 2 صغيرة",
                rule: () => {
                    return allowed6ButLowerBy2(interceptor, cpSucceseiveDistances, cpFlatDistances, cpLocation, cpFlat);
                },
            },
            {
                comment: "تخطيت النطاق الصوتي",
                rule: () => {
                    const crossNoteWithSign1 = interceptor.meaturements.crossDistWithSign(cpNote1, cf);
                    const crossNoteWithSign2 = interceptor.meaturements.crossDistWithSign(cpNote2, cf);
                    const crossNoteWithSign3 = interceptor.meaturements.crossDistWithSign(cpNote3, cf);
                    const crossNoteWithSign4 = interceptor.meaturements.crossDistWithSign(cpNote4, cf);
                    const buildInTop = (item: string) => item.includes("-") && !item.includes("-0");
                    const buildInBottom = (item: string) => item.includes("+");
                    const validator = isCPUpper ? buildInTop : buildInBottom;
                    const note1 = crossNoteWithSign1.findIndex(validator);
                    if (note1 !== -1)
                        return {
                            voiceIndex: cpLocation,
                            noteIndex: interceptor.voicesLocations[cpLocation][note1],
                        };

                    const note2 = crossNoteWithSign2.findIndex(validator);
                    if (note2 !== -1)
                        return {
                            voiceIndex: cpLocation,
                            noteIndex: interceptor.voicesLocations[cpLocation][note2 + 1],
                        };

                    const note3 = crossNoteWithSign3.findIndex(validator);
                    if (note3 !== -1)
                        return {
                            voiceIndex: cpLocation,
                            noteIndex: interceptor.voicesLocations[cpLocation][note3 + 2],
                        };

                    const note4 = crossNoteWithSign4.findIndex(validator);
                    if (note4 !== -1)
                        return {
                            voiceIndex: cpLocation,
                            noteIndex: interceptor.voicesLocations[cpLocation][note4 + 3],
                        };
                    return true;
                },
            },
        ];
    }
}
// IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtiYAqABERgGp7E6HmG3EByFxPmAKGI42NKQCGAZykwAOHwC4fBQ2UM5ACA3bEATF2JDghiYbD4aAMoB7AA4A6NACFpDgARhilUoQn5iABN3KSIAVwBzCMoQ.AlCfABLADsIgFoAFgB2AFZPbzI.AMC00MJI6OJSuISU9OycgBjTBkxAgH-AQIBVoA
// IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtiYAqACERgEp7EByABAYGpOHfF-MQcIZDRvONjSkAhgGc5MADj8AmPwC4IvuN079AxHDQBlAPYAHAHRoAQvKsACMMUqlCM.MQAmjuUQBXAHMgyj98GUJ8AEsAOyCAWgAWAHYAVmdXMg8vbwT.QmDQ4nyIqLjE1LSAGNEGOCoAcQAtoA__
// IgYAwgggzAAAgDGANhyAgaBAcBgAXAJwFMAjAGyJgBIAIRROxAMkZgHJWAKVj-7-gJQ8ACH1GIB4mJykAqKQGpxcAFBoSAQwDOWmAFwpAbCkAcKQfpn6FxDZhXEAPHPK0AZQD2ABwB0aAELaPgAEYEQUJAQaeEQAJsFahACuAOYpFAl4GgR4AJYAdikAtAAsAOwArKHhpFExsUWJBKnpRI1ZOQXF5RUAMfQDKpQeAFxAA___
