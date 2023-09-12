import { allowed6ButLowerBy2, maxAllowedHorizontalDistances, restrictMaxAllowedHorizontalDistances } from "./Common";
import Interceptor from "./Interceptor";
import { Location, Rule } from "./types";

const allowedEnds = ["-0T0", "+8T0", "-8T0", "-15T0", "+15T0"];
export default class CFRules {
    rules(interceptor: Interceptor): Rule[] {
        const voices = interceptor.getVoices();
        const cfLocation = interceptor.getCFLocation();
        const cf = voices[interceptor.getCFLocation()].map((arr) => arr[0]);
        const cfDistances = interceptor.getVoicesAsDistances()[cfLocation].map(arr=>arr[0]);
        return [
            {
                comment: "غير مسموح بتكرار النغمات ",
                rule: () => {
                    let passed = true;
                    const location = {
                        voiceIndex: cfLocation,
                        noteIndex: 0,
                    };
                    for (let i = 0; i < cfDistances.length; i++) {
                        const distance = cfDistances[i];
                        if (distance === "-0T0") {
                            location.noteIndex = i * 16;
                            passed = false;
                            break;
                        }
                    }
                    return passed ? true : location;
                },
            },
            {
                comment: "لقد تجاوزت المسافات المسموح بها افقيا ",
                rule: () => {
                    const succeseiveDistances = interceptor.meaturements.successivesDistances(cfDistances);
                    return restrictMaxAllowedHorizontalDistances(interceptor,succeseiveDistances,16,cfLocation);
                },
            },
            {
                comment: "مسموح بمسافة 6 صغيرة صاعدة على ان تهبط 2 صغيرة",
                rule: () => {
                    const succeseiveDistances = interceptor.meaturements.successivesDistances(cfDistances);
                    return allowed6ButLowerBy2(interceptor,succeseiveDistances,cfDistances,16,cfLocation);
                },
            },
            {
                comment: "البداية والنهاية يجب ان تكون نغمة المقام",
                rule: () => {
                    const distance = interceptor.meaturements.dist(cf[0], cf[cf.length - 1]);
                    if (allowedEnds.includes(distance)) return true;
                    return {
                        voiceIndex: cfLocation,
                        noteIndex: (cf.length - 1) * 16,
                    };
                },
            },
            {
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
                comment: "تسبق النغمة الاخيرة بثانينها",
                rule: () => {
                    if (["-2T1", "-2T0.5"].includes(cfDistances[cfDistances.length - 1])) return true;
                    return {
                        voiceIndex: cfLocation,
                        noteIndex: (cfDistances.length - 2) * 16,
                    };
                },
            },
        ];
   
    }
}

// IgYAwgggzAAAgDGANhyAgaBAMBgAXAJwFMAjAGyJgFIAERGAWjsQBpmYBqdgOnafoD0PPuzb0uiOACg0JAIYBnBTADo7ADjsAWOwB47ALjsAhOwD47AAQn2AYnYAiZnDQBlAPYAHbmgBCi7kswIgoSAjk8IgATSwVCAFcAc0SKWLw5AjwASwA7RIYAFgB2AFYgkNJwyKiGOIIklKJa9Mzc.OKSgBj6SRhMKIAfgECASiA___