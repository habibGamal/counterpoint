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
const allowedStart = [
    "+8T0",
    "+15T0",
    "+22T0",
    //----
    "+5T3.5",
    "+12T3.5",
    "+19T3.5",
];
export default class Type1Rules {
    rules(interceptor: Interceptor): Rule[] {
        const voices = interceptor.getVoices();
        const cpLocation = interceptor.getCPLocation();
        const cp = voices[interceptor.getCPLocation()];
        const cf = voices[interceptor.getCFLocation()];
        const cpDistances = interceptor.getVoicesAsDistances()[cpLocation];
        return [
            {
                className: "Type1Rules start-end same",
                name: "start-end same",
                comment: "البداية والنهاية يجب ان تكون نغمة المقام او خامسة المقام",
                rule: () => {
                    const distance = interceptor.meaturements.dist(cp[0], cf[0]);
                    console.log(distance);
                    return allowedStart.includes(distance) ? true : { voiceIndex: cpLocation, noteIndex: 0 };
                },
            },
        ];
    }
}
