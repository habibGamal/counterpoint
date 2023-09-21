import { allowed6ButLowerBy2, restrictMaxAllowedHorizontalDistances } from "./Common";
import Interceptor from "./Interceptor";
import { Rule } from "./types";

const allowedCrossDistances = ["3T1.5", "3T2", "5T3.5", "6T4", "6T4.5", "8T0", "_"];
export default class Type3Rules {
    rules(interceptor: Interceptor): Rule[] {
        const voices = interceptor.getVoices();
        const cpLocation = interceptor.getCPLocation();
        const cp = voices[cpLocation];
        const cpFlat = cp.flat();
        const cpNoar1 = cp.map((arr) => arr[0]);
        const cpNoar2 = cp.map((arr) => arr[1]);
        const cpNoar3 = cp.map((arr) => arr[2]);
        const cpNoar4 = cp.map((arr) => arr[3]);
        const cf = voices[interceptor.getCFLocation()].map((arr) => arr[0]);
        const cpDistances = interceptor.getVoicesAsDistances()[cpLocation];
        const cpFlatDistances = cpDistances.flat();

        const crossAbsNoar1 = interceptor.meaturements.crossAbsDist(cpNoar1, cf);
        const crossAbsNoar2 = interceptor.meaturements.crossAbsDist(cpNoar2, cf);
        const crossAbsNoar3 = interceptor.meaturements.crossAbsDist(cpNoar3, cf);
        const crossAbsNoar4 = interceptor.meaturements.crossAbsDist(cpNoar4, cf);
        const crossNoar1 = interceptor.meaturements.crossDist(cpNoar1, cf);
        const crossNoar2 = interceptor.meaturements.crossDist(cpNoar2, cf);
        const crossNoar3 = interceptor.meaturements.crossDist(cpNoar3, cf);
        const crossNoar4 = interceptor.meaturements.crossDist(cpNoar4, cf);
        const isCPUpper = cpLocation === 1;
        const isCPLower = cpLocation === 0;
        const succeseiveDistances = interceptor.meaturements.successivesDistances(cpFlatDistances);
        return [
            {
                comment: "البداية يجب ان تكون سكتة نوار",
                rule: () => {
                    const firstNoar = cpNoar1[0];
                    if (firstNoar === "z4") return true;
                    return { voiceIndex: cpLocation, noteIndex: 0 };
                },
            },
            {
                comment: "النوار الثاني في اول مازورة يجب ان يكون يونسون او نغمة الاساس او خامسة",
                rule: () => {
                    if (isCPLower) return true;
                    const crossDistance = crossAbsNoar2[0];
                    if ([8, 5, 0].includes(crossDistance)) return true;
                    return { voiceIndex: cpLocation, noteIndex: 4 };
                },
            },
            {
                comment: "النوار الثاني في اول مازورة يجب ان يكون يونسون او نغمة الاساس",
                rule: () => {
                    if (isCPUpper) return true;
                    const crossDistance = crossAbsNoar2[0];
                    if ([8, 0].includes(crossDistance)) return true;
                    return { voiceIndex: cpLocation, noteIndex: 4 };
                },
            },
            {
                comment: "نغمة مكررة",
                rule: () => {
                    for (let i = 0; i < cpFlat.length; i++) {
                        const currentNoar = cpFlat[i];
                        const nextNoar = cpFlat[i + 1];
                        const distance = interceptor.meaturements.dist(currentNoar, nextNoar);
                        if (distance == "-0T0") return { voiceIndex: cpLocation, noteIndex: (i + 1) * 4 };
                    }
                    return true;
                },
            },
            {
                comment: "النوار الاول يجب ان يكون متوافق",
                rule: () => {
                    for (let i = 0; i < crossNoar1.length -1; i++) {
                        if (!allowedCrossDistances.includes(crossNoar1[i])) {
                            return { voiceIndex: cpLocation, noteIndex: i * 16 };
                        }
                    }
                    return true;
                },
            },
            {
                comment: "النوار الثاني يجب ان يكون متوافق او متنافر ياخذ صورة مرور",
                rule: () => {
                    let stopRuleIn = 0;
                    for (let i = 0; i < cp.length; i++) {
                        const bar = cp[i];
                        if (bar.length == 4) {
                            stopRuleIn++;
                            continue;
                        }
                        break;
                    }
                    console.log(crossNoar2);
                    for (let i = 0; i < stopRuleIn; i++) {
                        const crossAbsDistance = crossAbsNoar2[i];
                        const crossDistance = crossNoar2[i];
                        const locationInCP = i * 4 + 1;
                        if (allowedCrossDistances.includes(crossDistance)) {
                            continue;
                        } else if ([2, 4, 7].includes(crossAbsDistance)) {
                            const previousNote = cpFlat[locationInCP - 1];
                            const nextNote = cpFlat[locationInCP + 1];
                            const distance = cpFlatDistances[locationInCP];
                            const nextDistance = cpFlatDistances[locationInCP + 1];
                            const direction = distance[0];
                            if (
                                (direction == "+" && nextDistance.includes("+2")) ||
                                (direction == "-" && nextDistance.includes("-2"))
                            )
                                continue;
                            if (previousNote === nextNote) continue;
                            console.log(nextDistance);
                            return { voiceIndex: cpLocation, noteIndex: (locationInCP + 1) * 4 };
                        } else {
                            return { voiceIndex: cpLocation, noteIndex: locationInCP * 4 };
                        }
                    }
                    return true;
                },
            },
            {
                comment: "النوار الثالث يجب ان يكون متوافق",
                rule: () => {
                    console.log("crossNoar3",crossNoar3)
                    for (let i = 0; i < crossNoar3.length; i++) {
                        if (!allowedCrossDistances.includes(crossNoar3[i])) {
                            return { voiceIndex: cpLocation, noteIndex: (i * 4 + 2) * 4 };
                        }
                    }
                    return true;
                },
            },
            {
                comment: "النوار الرابع يجب ان يكون متوافق او متنافر ياخذ صورة مرور",
                rule: () => {
                    let stopRuleIn = 0;
                    for (let i = 0; i < cp.length; i++) {
                        const bar = cp[i];
                        if (bar.length == 4) {
                            stopRuleIn++;
                            continue;
                        }
                        break;
                    }
                    for (let i = 0; i < stopRuleIn; i++) {
                        const crossAbsDistance = crossAbsNoar4[i];
                        const crossDistance = crossNoar4[i];
                        const locationInCP = i * 4 + 3;
                        if (allowedCrossDistances.includes(crossDistance)) {
                            continue;
                        } else if ([2, 4, 7].includes(crossAbsDistance)) {
                            const distance = cpFlatDistances[locationInCP];
                            const nextDistance = cpFlatDistances[locationInCP + 1];
                            const direction = distance[0];
                            if (
                                (direction == "+" && nextDistance.includes("+2")) ||
                                (direction == "-" && nextDistance.includes("-2"))
                            )
                                continue;
                            if (
                                (direction == "+" && nextDistance.includes("+3")) ||
                                (direction == "-" && nextDistance.includes("-3"))
                            )
                                continue;
                            return { voiceIndex: cpLocation, noteIndex: (locationInCP + 1) * 4 };
                        } else {
                            return { voiceIndex: cpLocation, noteIndex: locationInCP * 4 };
                        }
                    }
                    return true;
                },
            },
            {
                comment: "مسموح في النوع الثالث نوار فقط",
                rule: () => {
                    console.log(cpFlat);
                    for (let i = 0; i < cpFlat.length - 1; i++) {
                        const note = cpFlat[i];
                        if (note.includes("4")) continue;
                        return { voiceIndex: cpLocation, noteIndex: i * 8 };
                    }
                    return true;
                },
            },
            {
                comment: "النهاية يجب ان تكون نغمة المقام",
                rule: () => {
                    const lastCPNote = cpFlat[cpFlat.length - 1];
                    const distance = interceptor.meaturements.absDist(lastCPNote, cf[cf.length - 1]);
                    if (
                        [8,0].includes(interceptor.meaturements.toBase8(distance)) &&
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
                    return { voiceIndex: cpLocation, noteIndex: (cpFlat.length - 2) * 4 };
                },
            },
        ];
    }
}
// IgYAwgggzAAAgDGANhyAgaBAIBgAXAJwFMAjAGyMTURgHJrEAKBmAKhYGoWBKF5m-gJYAaHnzE12NLjVE0AtCwBk4mr0mcWUxNpjqdqxPrYAERAjQkAhgGcbMADhnEAfGcwAeO4AE7gLjuXjQBNE7maADKAPYADgB0aABCtnHeYEQUJARWeEQAJt42hACuAOalFIV4VgR4AJYAdqXyACwA7ACsaRmk2bl58kUEZRVEg9W1jc3tHQAxNAsAaHkA.2jyQA
