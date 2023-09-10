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
    "-6T4",
    "EE",
];

export function restrictMaxAllowedHorizontalDistances(
    interceptor: Interceptor,
    succeseiveDistances: string[][],
    unit: number,
    voiceIndex: number
): true | Location {
    let passed = true;
    const location: Location = {
        voiceIndex: voiceIndex,
        noteIndex: 0,
        end_slur: undefined,
    };
    let startBulkPosition = -unit;
    let endBulkPosition = -unit;
    let lastIndex = 0;
    for (let i = 0; i < succeseiveDistances.length; i++) {
        const bulk = succeseiveDistances[i];
        const sum = interceptor.meaturements.sumWithTones(bulk);
        endBulkPosition += bulk.length * unit;
        startBulkPosition = endBulkPosition - bulk.length * unit;
        lastIndex += bulk.length;
        if (!maxAllowedHorizontalDistances.includes(sum)) {
            console.log(sum);
            location.noteIndex = startBulkPosition;
            location.end_slur = lastIndex - 1;
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
    unit: number,
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
        const violatesDown = interceptor.meaturements.contains(bulk, "-6T4");
        const violationPosition = violatesUp === false ? violatesDown : violatesUp;
        console.log(violationPosition,violatesUp,violatesDown);
        interceptor.meaturements.contains(bulk, "-6T4");
        if (violationPosition !== false) {
            const checkPosition = lastIndex - (bulk.length - violationPosition);
            const nextDistance = distances[checkPosition];
            if (nextDistance !== "-2T0.5") {
                location.noteIndex = checkPosition * unit;
                passed = false;
                break;
            }
        }
    }
    return passed ? true : location;
}
// IgYAwgggzAAAgDGANhyAgaBAmBgAXAJwFMAjAGyMQAhEYASGxAYkZgDJWByVgUlY9oAKXqwCUrYbW60-UiawBUYxawDUABERwAUGhIBDAM6GYAXE2IAOBZgA8G-drXaAdBvPEAbHcOLcNADKAPYADgB0aABCRmEABGBEFCQE-nhEACaxhoQArgDmeRRZePoEeACWAHZ5ALQALADsAKzxiaQpaek12QT5hUTdJWVVtY1NADG0WjA46QA.AGUNQA__
