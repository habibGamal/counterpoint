import { allowed6ButLowerBy2, maxAllowedHorizontalDistances, restrictMaxAllowedHorizontalDistances } from "./Common";
import Interceptor from "./Interceptor";
import { Rule } from "./types";
const allowedCrossDistances = ["3T1.5", "3T2", "5T3.5", "6T4", "6T4.5", "8T0", "_"];
export default class Type1Rules {
    rules(interceptor: Interceptor): Rule[] {
        const voices = interceptor.getVoices();
        const cpLocation = interceptor.getCPLocation();
        const cp = voices[cpLocation].map((arr) => arr[0]);
        const cf = voices[interceptor.getCFLocation()].map((arr) => arr[0]);
        const cpDistances = interceptor.getVoicesAsDistances()[cpLocation].map((arr) => arr[0]);

        const crossAbsDistances = interceptor.meaturements.crossAbsDist(cp, cf);
        const crossDistances = interceptor.meaturements.crossDist(cp, cf);
        const isCPUpper = cpLocation === 1;
        const isCPLower = cpLocation === 0;
        return [
            {
                comment: "البداية يجب ان تكون نغمة المقام او خامسة المقام او يونسون",
                rule: () => {
                    // cp is upper
                    if (isCPLower) return true;
                    const distance = interceptor.meaturements.absDist(cp[0], cf[0]);
                    if ([8, 5, 0].includes(interceptor.meaturements.toBase8(distance))) return true;
                    return { voiceIndex: cpLocation, noteIndex: 0 };
                },
            },
            {
                comment: "البداية يجب ان تكون نغمة المقام  او يونسون",
                rule: () => {
                    // cp is lower
                    if (isCPUpper) return true;
                    const distance = interceptor.meaturements.absDist(cp[0], cf[0]);
                    if ([8, 0].includes(interceptor.meaturements.toBase8(distance))) return true;
                    return { voiceIndex: cpLocation, noteIndex: 0 };
                },
            },
            {
                comment: "راجع المسافات المسموحة في النوع الاول",
                rule: () => {
                    const distances = interceptor.meaturements.crossDist(cp, cf);
                    console.log(distances);
                    
                    for (let i = 1; i < distances.length - 1; i++) {
                        const distance = distances[i];
                        if (!allowedCrossDistances.includes(distance)) {
                            return { voiceIndex: cpLocation, noteIndex: i * 16 };
                        }
                    }
                    return true;
                },
            },
            {
                comment: "ممنوع استخدام اكثر من 3 ثالثات او 3 سادسات متتالية",
                rule: () => {
                    let successivesRepeats = 1;
                    for (let i = 1; i < crossAbsDistances.length - 1; i++) {
                        const currentDistance = crossAbsDistances[i];
                        const previousDistance = crossAbsDistances[i - 1];
                        currentDistance === previousDistance ? successivesRepeats++ : (successivesRepeats = 1);
                        if (successivesRepeats > 3) {
                            return { voiceIndex: cpLocation, noteIndex: i * 16 };
                        }
                    }
                    return true;
                },
            },
            {
                comment: "المسافات 5 او 8 مسموحة مرة واحدة فقط خلال التمرين",
                rule: () => {
                    console.log(crossAbsDistances);
                    let fifths = 0;
                    let eights = 0;
                    for (let i = 1; i < crossAbsDistances.length - 1; i++) {
                        const distance = crossAbsDistances[i];
                        if (distance === 5) fifths++;
                        if (distance === 8) eights++;
                        if (fifths + eights > 1) {
                            return { voiceIndex: cpLocation, noteIndex: i * 16 };
                        }
                    }
                    return true;
                },
            },
            {
                comment: "في النوع الاول جميع النغمات يجب ان تكون روند",
                rule: () => {
                    let passed = true;
                    const location = {
                        voiceIndex: cpLocation,
                        noteIndex: 0,
                    };
                    for (let i = 0; i < cp.length; i++) {
                        if (!interceptor.meaturements.isRound(cp[i])) {
                            location.noteIndex = i * 16;
                            passed = false;
                            break;
                        }
                    }
                    return passed ? true : location;
                },
            },
            {
                comment: "النهاية يجب ان تكون نغمة المقام",
                rule: () => {
                    const lastCPNote = cp[cp.length - 1];
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
                comment: "نغمة مكررة",
                rule: () => {
                    for (let i = 0; i < cp.length; i++) {
                        const currentRound = cp[i];
                        const nextRound = cp[i + 1];
                        const distance = interceptor.meaturements.dist(currentRound, nextRound);
                        if (distance == "-0T0") return { voiceIndex: cpLocation, noteIndex: interceptor.voicesLocations[cpLocation][i] };
                    }
                    return true;
                },
            },
            {
                comment: "النغمة الاخيرة تسبق بالحساس",
                rule: () => {
                    const distance = interceptor.meaturements.dist(cp[cp.length - 2], cp[cp.length - 1]);
                    const distanceWithoutTone = interceptor.meaturements.removeToneFormDist(distance);
                    if (distanceWithoutTone === "-2") return true;
                    return { voiceIndex: cpLocation, noteIndex: (cp.length - 2) * 16 };
                },
            },
        ];
    }
}
// IgYAwgggzAAAgDGANhyAgaBAcBgAXAJwFMAjAGyJgBIAERGAYjsVvoDJnHOAKTgOh6cAVJwDUzOACg0JAIYBneTAC4nAHicA-J1X0AhFvWcAOEfq74aAMoB7AA580AIQV8ABGCIUSBWXiIAJm7yhACuAObhFMF4sgR4AJYAduEAtAAsAOwArB5epL7-AakhBBFRRCWx8clpWdkAMfTNOAEA38YAkUA__
