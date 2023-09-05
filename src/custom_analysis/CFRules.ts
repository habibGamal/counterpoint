import Interceptor from "./Interceptor";
import { Rule } from "./types";

const allowedDistances = [
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
];
export default class CFRules {
    rules(interceptor: Interceptor): Rule[] {
        const voices = interceptor.getVoices();
        const cfLocation = interceptor.getCFLocation();
        const cf = voices[interceptor.getCFLocation()];
        const cfDistances = interceptor.getVoicesAsDistances()[cfLocation];
        return [
            {
                className: "CFRule start-end same",
                name: "start-end same",
                comment: "البداية والنهاية يجب ان تكون نغمة المقام",
                rule: () => {
                    const distance = interceptor.meaturements.dist(cf[0], cf[cf.length - 1]);
                    if (distance == "-0T0") return true;
                    return {
                        voiceIndex: cfLocation,
                        noteIndex: 0,
                    };
                },
            },
            {
                className: "CFRule all notes should be round",
                name: "all notes should be round",
                comment: "في C.F جميع النغمات يجب ان تكون روند",
                rule: () => {
                    let passed = true;
                    const location = {
                        voiceIndex: cfLocation,
                        noteIndex: 0,
                    };
                    for (let i = 0; i < cf.length; i++) {
                        if (!interceptor.meaturements.isRound(cf[i])) {
                            location.noteIndex = i * 16;
                            passed = false;
                            break;
                        }
                    }
                    return passed ? true : location;
                },
            },
            {
                className: "CFRule last note should be -2T1",
                name: "last note should be -2T1",
                comment: "تسبق النغمة الاخيرة بثانينها",
                rule: () => {
                    if (["-2T1", "-2T0.5"].includes(cfDistances[cfDistances.length - 1])) return true;
                    return {
                        voiceIndex: cfLocation,
                        noteIndex: (cfDistances.length - 2) * 16,
                    };
                },
            },
            {
                className: "CFRule not allowed distance",
                name: "not allowed distance",
                comment: "راجع المسافات المسموح بها",
                rule: () => {
                    let passed = true;
                    const location = {
                        voiceIndex: cfLocation,
                        noteIndex: 0,
                    };
                    for (let i = 1; i < cfDistances.length - 1; i++) {
                        if (!allowedDistances.includes(cfDistances[i])) {
                            location.noteIndex = i * 16;
                            passed = false;
                            break;
                        }
                    }
                    return passed ? true : location;
                },
            },
            {
                className: "CFRule +6T4 should be followed by -2T1",
                name: "+6T4 should be followed by -2T1",
                comment: "مسموح بمسافة 6 صغيرة على ان تهبط 2 صغيرة",
                rule: () => {
                    let passed = true;
                    const location = {
                        voiceIndex: cfLocation,
                        noteIndex: 0,
                    };
                    for (let i = 1; i < cfDistances.length - 1; i++) {
                        const nextDistance = cfDistances[i + 1];
                        if (cfDistances[i] === "+6T4") {
                            if (nextDistance == "-2T0.5") continue;
                            location.noteIndex = i * 16;
                            passed = false;
                            break;
                        }
                    }
                    return passed ? true : location;
                },
            },
            {
                className: "CFRule not allowed distance over the whole line",
                name: "not allowed distance over the whole line",
                comment: "لقد تجاوزت المسافات المسموح بها ",
                rule: () => {
                    let passed = true;
                    const location = {
                        voiceIndex: cfLocation,
                        noteIndex: 0,
                    };
                    const succeseiveDistances = interceptor.meaturements.successivesDistances(cfDistances);
                    let currentNoteIndex = -1;
                    for (let i = 0; i < succeseiveDistances.length; i++) {
                        const bulk = succeseiveDistances[i];
                        const sum = interceptor.meaturements.absSum(bulk);
                        if (sum > 8) {
                            location.noteIndex = currentNoteIndex;
                            passed = false;
                            break;
                        }
                        currentNoteIndex += bulk.length * 16;
                    }
                    console.log(succeseiveDistances);
                    return passed ? true : location;
                },
            },
        ];
    }
}

// IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtjEAERGumWup-5hlx9xObNUgQwDOgmABwWAPBYBiFgCIWAEhksABCwC4LcdzQBlAPYAHAHRoAQkJOqwxSqUL98xACarBRAK4Bzb5Xf4.IT4AJYAdt4AtAAsAOwArDZ2ZI7OLpEehD5-xBmBweFRcfEAMQzwMACgLgDvigBsQA
// IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtjEAERGumWup-5hlx9xObNUgQwDOgmABwWAPBYBcFgAIWAfHlKZLcdzQBlAPYAHAHRoAQkINywxSqUL98xACZzBRAK4Bzd5Wf5-hfACWAHbuALQALADsAKwWVmS29g6hLoQeXsQpvv7BYVHRADEM8DC4DgDvAOQAqkA__
