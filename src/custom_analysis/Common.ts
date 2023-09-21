import Interceptor from "./Interceptor";
import { Location } from "./types";

export const maxAllowedHorizontalDistances = [
    "-2T0.5",
    "-2T1",
    "-3T1.5",
    "-3T2",
    "-4T2.5",
    "-5T3.5",
    "-8T6",
    "+2T0.5",
    "+2T1",
    "+3T1.5",
    "+3T2",
    "+4T2.5",
    "+5T3.5",
    "+8T6",
    //----
    "+6T4",
    "EE",
];

export function restrictMaxAllowedHorizontalDistances(
    interceptor: Interceptor,
    succeseiveDistances: string[][],
    voiceIndex: number
): true | Location {
    let passed = true;
    const location: Location = {
        voiceIndex: voiceIndex,
        noteIndex: 0,
    };
    let startBulkPosition = -1;
    let endBulkPosition = -1;
    let lastIndex = 0;
    for (let i = 0; i < succeseiveDistances.length; i++) {
        const bulk = succeseiveDistances[i];
        const sum = interceptor.meaturements.sumWithTones(bulk);
        endBulkPosition += bulk.length;
        startBulkPosition = endBulkPosition - bulk.length;
        lastIndex += bulk.length;
        if (!maxAllowedHorizontalDistances.includes(sum)) {
            console.log(sum);
            location.noteIndex = interceptor.voicesLocations[voiceIndex][startBulkPosition];
            location.endSlur = lastIndex - 1;
            passed = false;
            break;
        }
    }
    return passed ? true : location;
}

export function allowed6ButLowerBy2(
    interceptor: Interceptor,
    succeseiveDistances: string[][],
    distances: string[],
    voiceIndex: number
): true | Location {
    console.log(succeseiveDistances);
    let passed = true;
    const location: Location = {
        voiceIndex,
        noteIndex: 0,
    };
    let lastIndex = 0;
    for (let i = 0; i < succeseiveDistances.length; i++) {
        const bulk = succeseiveDistances[i];
        lastIndex += bulk.length;

        const violatesUp = interceptor.meaturements.contains(bulk, "+6T4");
        // const violatesDown = interceptor.meaturements.contains(bulk, "-6T4");
        // const violationPosition = violatesUp === false ? violatesDown : violatesUp;

        if (violatesUp !== false) {
            const [_, rightPointer] = violatesUp;
            const checkPosition = lastIndex - (bulk.length - rightPointer);
            const nextDistance = distances[checkPosition];
            const isLastNote = checkPosition == distances.length;
            if (nextDistance !== "-2T0.5" && !isLastNote) {
                location.noteIndex = interceptor.voicesLocations[voiceIndex][checkPosition] ;
                passed = false;
                break;
            }
        }
    }
    return passed ? true : location;
}
// IgYAwgggzAAAgDGANhyAgaBAMBgAXAJwFMAjAGyJgCoAERGAajsQBpmYBadp-r-2-m37sApOwDk7AJTsB8GGhIBDAM4qYAHHYBsdlvoAsHewC4x-vsQA8U-yP0zF5nDQBlAPYAHAHRoAQqreAARgRBQkBEp4RAAmQSqEAK4A5skU8XhKBHgAlgB2yRwALADsAKwhYaSR0TEcCQQpaUT1mdn5haVlADH0fTgxAP9WAPRAA___
