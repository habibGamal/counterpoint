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
    verticalParallelCheck(crossAbsDist: number[], location: (catchPosition: number) => number): false | number {
        for (let i = 0; i < crossAbsDist.length; i++) {
            const currentDistance = crossAbsDist[i];
            const nextDistance = crossAbsDist[i + 1];
            if (currentDistance == nextDistance && (currentDistance == 8 || currentDistance == 5)) {
                return location(i + 1);
            }
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
        const crossBlanceh1 = interceptor.meaturements.crossDist(cpNote1, cf);
        const crossBlanceh2 = interceptor.meaturements.crossDist(cpNote2, cf);
        const isCPUpper = cpLocation === 1;
        const cpSucceseiveDistances = interceptor.meaturements.successivesDistances(cpFlatDistances);
        const cfSucceseiveDistances = interceptor.meaturements.successivesDistances(cfFlatDistances);
        const unit = this.getUnit(interceptor);

        console.log("cp",cp);

        return [
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
                    // console.log("cpDistancesNoTones", cpDistancesNoTones);
                    // console.log("cfDistancesNoTones", cfDistancesNoTones);
                    for (let i = 0; i < cfDistancesNoTones.length - 1; i++) {
                        const start = i;
                        const end = i + 2;
                        const bulk = cfDistancesNoTones.slice(start, end).join();
                        if (bulk == "+3,+3" || bulk == "-3,-3") {
                            location.voiceIndex = cfLocation;
                            location.noteIndex = (end - 1) * 16;
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
                            location.noteIndex = (end - 1) * unit;
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
                            location.noteIndex = (end - 1) * 16;
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
                            location.noteIndex = (end - 1) * unit;
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
                    const crossDistances = [crossAbsNote1, crossAbsNote2, crossAbsNote3, crossAbsNote4];
                    // console.log("crossAbsNote1", crossAbsNote1);
                    for (let i = 0; i < crossDistances.length; i++) {
                        const crossDistance = crossDistances[i];
                        const verticalParallelCheck = this.verticalParallelCheck(
                            crossDistance,
                            (catchPosition) => 16 * catchPosition + i * unit
                        );
                        // console.log("verticalParallelCheck", verticalParallelCheck);
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
                    return restrictMaxAllowedHorizontalDistances(interceptor, cpSucceseiveDistances, unit, cpLocation);
                },
            },
            {
                comment: "مسموح بمسافة 6 صغيرة صاعدة على ان تهبط 2 صغيرة",
                rule: () => {
                    return allowed6ButLowerBy2(interceptor, cpSucceseiveDistances, cpFlatDistances, unit, cpLocation);
                },
            },
        ];
    }
}
// IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtiYAqABERgGp7E6HmG3EByFxPmAKGI42NKQCGAZykwAOHwC4fBQ2UM5ACA3bEATF2JDghiYbD4aAMoB7AA4A6NACFpDgARhilUoQn5iABN3KSIAVwBzCMoQ.AlCfABLADsIgFoAFgB2AFZPbzI.AMC00MJI6OJSuISU9OycgBjTBkxAgH-AQIBVoA
// IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtiYAqACERgEp7EByABAYGpOHfF-MQcIZDRvONjSkAhgGc5MADj8AmPwC4IvuN079AxHDQBlAPYAHAHRoAQvKsACMMUqlCM.MQAmjuUQBXAHMgyj98GUJ8AEsAOyCAWgAWAHYAVmdXMg8vbwT.QmDQ4nyIqLjE1LSAGNEGOCoAcQAtoA__
// IgYAwgggzAAAgDGANhyAgaBAcBgAXAJwFMAjAGyJgBIAIRROxAMkZgHJWAKVj-7-gJQ8ACH1GIB4mJykAqKQGpxcAFBoSAQwDOWmAFwpAbCkAcKQfpn6FxDZhXEAPHPK0AZQD2ABwB0aAELaPgAEYEQUJAQaeEQAJsFahACuAOYpFAl4GgR4AJYAdikAtAAsAOwArKHhpFExsUWJBKnpRI1ZOQXF5RUAMfQDKpQeAFxAA___
