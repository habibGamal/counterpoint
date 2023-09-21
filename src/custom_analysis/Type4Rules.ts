import { allowed6ButLowerBy2, restrictMaxAllowedHorizontalDistances } from "./Common";
import Interceptor from "./Interceptor";
import { Rule } from "./types";

const allowedCrossDistances = ["3T1.5", "3T2", "5T3.5", "6T4", "6T4.5", "8T0", "_"];
export default class Type4Rules {
    rules(interceptor: Interceptor): Rule[] {
        const voices = interceptor.getVoices();
        const cpLocation = interceptor.getCPLocation();
        const cp = voices[cpLocation];
        const cpFlat = cp.flat();
        const cpBlanch1 = cp.map((arr) => arr[0]);
        const cpBlanch2 = cp.map((arr) => arr[1]);
        const cf = voices[interceptor.getCFLocation()].map((arr) => arr[0]);
        const cpDistances = interceptor.getVoicesAsDistances()[cpLocation];
        const cpFlatDistances = cpDistances.flat();

        const crossAbsBlanceh1 = interceptor.meaturements.crossAbsDist(cpBlanch1, cf);
        const crossAbsBlanceh2 = interceptor.meaturements.crossAbsDist(cpBlanch2, cf);
        const crossBlanceh1 = interceptor.meaturements.crossDist(cpBlanch1, cf);
        const crossBlanceh2 = interceptor.meaturements.crossDist(cpBlanch2, cf);
        const isCPUpper = cpLocation === 1;
        const isCPLower = cpLocation === 0;
        const succeseiveDistances = interceptor.meaturements.successivesDistances(cpFlatDistances);
        return [
            {
                comment: "البداية يجب ان تكون سكتة بلانش",
                rule: () => {
                    const firstBlanch = cpBlanch1[0];
                    if (firstBlanch === "z8") return true;
                    return { voiceIndex: cpLocation, noteIndex: 0 };
                },
            },
            {
                comment: "البداية البلانش الثاني مسموح مسافة 5 او 8 او يونسون",
                rule: () => {
                    if (isCPLower) return true;
                    const crossDistance = crossAbsBlanceh2[0];
                    if ([8, 5, 0].includes(crossDistance)) return true;
                    return { voiceIndex: cpLocation, noteIndex: 8 };
                },
            },
            {
                comment: "البداية البلانش الثاني مسموح مسافة 8 او يونسون",
                rule: () => {
                    if (isCPUpper) return true;
                    const crossDistance = crossAbsBlanceh2[0];
                    if ([8, 0].includes(crossDistance)) return true;
                    return { voiceIndex: cpLocation, noteIndex: 8 };
                },
            },
            {
                comment: "نغمة مكررة",
                rule: () => {
                    for (let i = 0; i < cpBlanch1.length; i++) {
                        const blanch1 = cpBlanch1[i];
                        const blanch2 = cpBlanch2[i];
                        const distance = interceptor.meaturements.dist(blanch1, blanch2);
                        if (distance == "-0T0") return { voiceIndex: cpLocation, noteIndex: (i * 2 + 1) * 8 };
                    }
                    return true;
                },
            },
            {
                comment: "البلانش الثاني يجب ان يكون متوافق",
                rule: () => {
                    for (let i = 0; i < crossBlanceh2.length; i++) {
                        if (!allowedCrossDistances.includes(crossBlanceh2[i])) {
                            return { voiceIndex: cpLocation, noteIndex: (i * 2 + 1) * 8 };
                        }
                    }
                    return true;
                },
            },
            {
                comment: "البلانش الاول يجب ان يكون متوافق او متنافر يهبط مسافة 2",
                rule: () => {
                    let stopRuleIn = 0;
                    for (let i = 0; i < cp.length; i++) {
                        const bar = cp[i];
                        if (bar.length == 2) {
                            stopRuleIn++;
                            continue;
                        }
                        break;
                    }
                    for (let i = 1; i < stopRuleIn; i++) {
                        const crossAbsDistance = crossAbsBlanceh1[i];
                        const crossDistance = crossBlanceh1[i];
                        const locationInCP = i * 2;
                        if (allowedCrossDistances.includes(crossDistance)) {
                            continue;
                        } else if ([2, 4, 7].includes(crossAbsDistance)) {
                            const distance = cpFlatDistances[locationInCP];
                            const nextDistance = cpFlatDistances[locationInCP + 1];
                            if (nextDistance.includes("-2")) continue;
                            return { voiceIndex: cpLocation, noteIndex: (locationInCP + 1) * 8 };
                        } else {
                            return { voiceIndex: cpLocation, noteIndex: locationInCP * 8 };
                        }
                    }
                    return true;
                },
            },
            {
                comment: "مسموح في النوع الثاني بلانش فقط",
                rule: () => {
                    for (let i = 0; i < cpFlat.length - 1; i++) {
                        const note = cpFlat[i];
                        const isRest = note.includes("z8");
                        if (i == 0 && isRest) continue;
                        if (note.includes("8") && !isRest) continue;
                        return { voiceIndex: cpLocation, noteIndex: i * 8 };
                    }
                    return true;
                },
            },
            {
                comment: "مسموح بفك الرباط مرة واحدة فقط خلال التمرين",
                rule: () => {
                    let countNonTiedBlanch = 0;
                    for (let i = 0; i < cpBlanch2.length - 2; i++) {
                        const blanch2 = cpBlanch2[i];
                        if (blanch2 === undefined) continue;
                        const blanchHasTie = blanch2.includes("-");
                        if (blanchHasTie) continue;
                        countNonTiedBlanch++;
                        if (countNonTiedBlanch > 1) return { voiceIndex: cpLocation, noteIndex: (i * 2 + 1) * 8 };
                    }
                    return true;
                },
            },
            {
                comment: "يجب ان تكون نغمة المقام",
                rule: () => {
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
            {
                comment: "النغمة الاخيرة تسبق بالحساس",
                rule: () => {
                    const distance = interceptor.meaturements.dist(
                        cpFlat[cpFlat.length - 2],
                        cpFlat[cpFlat.length - 1]
                    );
                    const distanceWithoutTone = interceptor.meaturements.removeToneFormDist(distance);
                    if (distanceWithoutTone === "-2") return true;
                    return { voiceIndex: cpLocation, noteIndex: (cpFlat.length - 2) * 8 };
                },
            },
        ];
    }
}
// IgYAwgggzAAAgDGANhyAgaBAmBgAXAJwFMAjAGyJgBIAIRauxAYkZgApWByVgUlYDJWHen3oBKIVwFT6wxACoZC1gGoACIjgAoNCQCGAZwMwAuBsQB8czAB41s.QAE1q.QCEL63foP4aAMoA9gAOAHRoAEKGoY5gRBQkBHp4RAAmjgaEAK4A5jkUGXh6BHgAlgB2OQC0ACwA7ACssfGkSSmpVZkEuflEnUUlFdX1DQAx9IgA.4ipAN8AxgCFQA__
