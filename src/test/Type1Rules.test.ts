import Interceptor from "../custom_analysis/Interceptor";
import Type1Rules from "../custom_analysis/Type1Rules";

type TestData = {
    debug: string;
    abcString: string;
    vsp: number[];
    vid: number[];
    mode: number;
    clefs: string[];
    results: {
        location: {
            voiceIndex: number;
            noteIndex: number;
            startLine?: number | undefined;
            endSlur?: number | undefined;
        };
        comment: string;
    }[];
};
const testsData: TestData[] = [
    {
        debug: "IgYAwgggzAAAgDGANhyAgaBAcBgAXAJwFMAjAGyJgFIAERGAYjsQBJmYAydp-r-gcnYAKdgCp2AamZwAUGhIBDAM5KYAXHYA8dgHx2G-gEJdW9gBxT9A.DQBlAPYAHAHRoAQsucACMEQokCBTwiABMvJUIAVwBzaIpwvAUCPABLADtogFoAFgB2AFYfP1JA4JDMiIIYuKIKxOT0rLz8gBj6dpgiZwBrAGOgA",
        abcString:
            '%%barnumbers 1\n%%printtempo 0\n%%stretchlast 0\n%%score {V0 *M| V1}\nQ:1/4=140\nM:4/4\nK:C\nL:1/16\nV: V0 clef=treble name="Sop.\\n(C.P)"\nV: V1 clef=bass name="Bas.\\n(C.F)"\n[V: V0]E16|C16|D16|F16|.(C16|F16|G16|A16|"^⚑"c16|d16)|]\n[V: V1]D,16|E,16|F,16|D,16|.(A,16|F,16|E,16|C,16)|E,16|D,16|]\n',
        vsp: [0, 1],
        vid: [1, 0],
        mode: 2,
        clefs: ["treble", "bass"],
        results: [
            {
                location: {
                    voiceIndex: 1,
                    noteIndex: 0,
                },
                comment: "البداية يجب ان تكون نغمة المقام او خامسة المقام او يونسون",
            },
        ],
    },
    {
        debug: "IgYAwgggzAAAgDGANhyAgaBAMBgAXAJwFMAjAGyJgGoAERGAWjsQBpnr2A6dp-gei492berURwAUGhIBDAM5yYAHHYBCdgAJ2AfHYA8NTs2H6AYnYASZnDQBlAPYAHTmgBC8zhrBEKJAjLwiABMNOUIAVwBzSIpQvBkCPABLADtIhgAWAHYAVi8fUn9AoIYwgiiYolL4xNT07JyAGPpxRCJOMlMgA___",
        abcString:
            '%%barnumbers 1\n%%printtempo 0\n%%stretchlast 0\n%%score {V0 *M| V1}\nQ:1/4=140\nM:4/4\nK:C\nL:1/16\nV: V0 clef=treble name="Sop.\\n(C.F)"\nV: V1 clef=bass name="Bas.\\n(C.P)"\n[V: V0]d16|f16|e16|d16|g16|f16|a16|g16|f16|e16|d16|]\n[V: V1]C,16|A,16|G,16|F,16|E,16|A,16|.(F,16|G,16|A,16|"^⚑"C16|D16)|]\n',
        vsp: [1, 0],
        vid: [1, 0],
        mode: 2,
        clefs: ["treble", "bass"],
        results: [
            {
                location: {
                    voiceIndex: 0,
                    noteIndex: 0,
                },
                comment: "البداية يجب ان تكون نغمة المقام  او يونسون",
            },
        ],
    },
    {
        debug: "IgYAwgggzAAAgDGANhyAgaBAMBgAXAJwFMAjAGyJgGoAERGAWjsQBpnr2A6dp-gei492berURwAUGhIBDAM5yYAXHYBCdivoB8dgDw17HfQAEB-gGJ2AEmZw0AZQD2AB05oAQvM7GwRCiQIZPCIAE2M5QgBXAHNoinC8GQI8AEsAO2iGABYAdgBWHz9SQOCQhgiCGLiicsTk9MzcvIAY-nEYTCJOMgALIA__",
        abcString:
            '%%barnumbers 1\n%%printtempo 0\n%%stretchlast 0\n%%score {V0 *M| V1}\nQ:1/4=140\nM:4/4\nK:C\nL:1/16\nV: V0 clef=treble name="Sop.\\n(C.F)"\nV: V1 clef=bass name="Bas.\\n(C.P)"\n[V: V0]d16|f16|e16|d16|g16|f16|a16|g16|f16|e16|d16|]\n[V: V1]D,16|A,16|D,16|F,16|E,16|A,16|.(F,16|"^⚑"G,16|A,16|"^⚑"C16|D16)|]\n',
        vsp: [1, 0],
        vid: [1, 0],
        mode: 2,
        clefs: ["treble", "bass"],
        results: [
            {
                location: {
                    voiceIndex: 0,
                    noteIndex: 32,
                },
                comment: "راجع المسافات المسموحة في النوع الاول",
            },
        ],
    },
    {
        debug: "IgYAwgggzAAAgDGANhyAgaBAMBgAXAJwFMAjAGyJgGoAERGAWjsQBpnr2A6dp-gei492berURwAUGhIBDAM5yYAXHYBCdgBx2AInYA8divoB8dgAI17AMTsAJMzhoAygHsADpzQAheZzNgiChICGTwiABMzOUIAVwBzOIoovBkCPABLADs4hgAWAHYAVn9A0hCw8IZognjEoiqUtKycgsKAGPpxGABQIk4yAEugA",
        abcString:
            '%%barnumbers 1\n%%printtempo 0\n%%stretchlast 0\n%%score {V0 *M| V1}\nQ:1/4=140\nM:4/4\nK:C\nL:1/16\nV: V0 clef=treble name="Sop.\\n(C.F)"\nV: V1 clef=bass name="Bas.\\n(C.P)"\n[V: V0]d16|f16|e16|d16|g16|f16|a16|g16|f16|e16|d16|]\n[V: V1]D,16|.(A,16|C,16)|"^⚑"B,16|"^⚑"E,16|"^⚑"D,16|F,16|G,16|A,16|"^⚑"C16|"^⚑"D16|]\n',
        vsp: [1, 0],
        vid: [1, 0],
        mode: 2,
        clefs: ["treble", "bass"],
        results: [
            {
                location: {
                    voiceIndex: 0,
                    noteIndex: 80,
                },
                comment: "ممنوع استخدام اكثر من 3 ثالثات او 3 سادسات متتالية",
            },
        ],
    },
    {
        debug: "IgYAwgggzAAAgDGANhyAgaBAMBgAXAJwFMAjAGyJgGoAERGAWjsQBpnr2A6dp-gei492berURwAUGhIBDAM5yYAXHYBCdgBx2AAnYA8divoB8HWvYBidgBJmcNAGUA9gAdOaAELzO2sEQokBDJ4RAAm2nKEAK4A5jEUEXgyBHgAlgB2MQwALADsAKy-.qRBIaEMkQSx8UQVSSkZWXn5ADH04jAgRJwAtgAoQA___",
        abcString:
            '%%barnumbers 1\n%%printtempo 0\n%%stretchlast 0\n%%score {V0 *M| V1}\nQ:1/4=140\nM:4/4\nK:C\nL:1/16\nV: V0 clef=treble name="Sop.\\n(C.F)"\nV: V1 clef=bass name="Bas.\\n(C.P)"\n[V: V0]d16|f16|e16|d16|g16|f16|a16|g16|f16|e16|d16|]\n[V: V1]D,16|.(A,16|C,16)|G,16|E,16|D,16|F,16|G,16|A,16|"^⚑"C16|D16|]\n',
        vsp: [1, 0],
        vid: [1, 0],
        mode: 2,
        clefs: ["treble", "bass"],
        results: [
            {
                location: {
                    voiceIndex: 0,
                    noteIndex: 112,
                },
                comment: "المسافات 5 او 8 مسموحة مرة واحدة فقط خلال التمرين",
            },
        ],
    },
    {
        debug: "IgYAwgggzAAAgDGANhyAgaBAMBgAXAJwFMAjAGyJgGoAERGAWjsQBpnr2A6dp-gei492berURw4aEgEMAzrJgBcdgEJ2AHHYACABD0YexADx2ALHYB8difprENAMTsAJM0kBlAPYAHTmgBCcpxaYEQUJATSeEQAJlqyhACuAObJFPF40gR4AJYAdskMACwA7ACsIWGkkdExDAkEKWlE9ZnZ-YWlZQAx-vC4RJwAtgBNQA___",
        abcString:
            '%%barnumbers 1\n%%printtempo 0\n%%stretchlast 0\n%%score {V0 *M| V1}\nQ:1/4=140\nM:4/4\nK:C\nL:1/16\nV: V0 clef=treble name="Sop.\\n(C.F)"\nV: V1 clef=bass name="Bas.\\n(C.P)"\n[V: V0]d16|f16|e16|d16|g16|f16|a16|g16|f16|e16|d16|]\n[V: V1]D,16|.(A,16|C,16)|"^⚑"G,8z8|E,16|"^⚑"A,,16|F,16|E,16|A,16|^C16|D16|]\n',
        vsp: [1, 0],
        vid: [1, 0],
        mode: 2,
        clefs: ["treble", "bass"],
        results: [
            {
                location: {
                    voiceIndex: 0,
                    noteIndex: 48,
                },
                comment: "في النوع الاول جميع النغمات يجب ان تكون روند",
            },
        ],
    },
    {
        debug: "IgYAwgggzAAAgDGANhyAgaBAMBgAXAJwFMAjAGyJgGoAERGAWjsQBpnr2A6dp-gei492Acna1EcOGhIBDAM5yYAXHYBCdgBx2AAnYA8dgCx2AfH1r2AInYBiZlIDKAewAOnNACF5nbWCIUSAhk8IgATbTlCAFcAcxiKCLwZAjwASwA7GIYAFgB2AFZff1IgkNCGSIJY-KIKpJSMrLz8gBj6doBIIk50gESgA",
        abcString:
            '%%barnumbers 1\n%%printtempo 0\n%%stretchlast 0\n%%score {V0 *M| V1}\nQ:1/4=140\nM:4/4\nK:C\nL:1/16\nV: V0 clef=treble name="Sop.\\n(C.F)"\nV: V1 clef=bass name="Bas.\\n(C.P)"\n[V: V0]d16|f16|e16|d16|g16|f16|a16|g16|f16|"^⚑"G16|d16|]\n[V: V1]D,16|.(A,16|C,16)|G,16|E,16|A,,16|F,16|E,16|A,16|"^⚑"B,16|"^⚑"C16|]\n',
        vsp: [1, 0],
        vid: [1, 0],
        mode: 2,
        clefs: ["treble", "bass"],
        results: [
            {
                location: {
                    voiceIndex: 0,
                    noteIndex: 160,
                },
                comment: "النهاية يجب ان تكون نغمة المقام",
            },
        ],
    },
    {
        debug: "IgYAwgggzAAAgDGANhyAgaBAMBgAXAJwFMAjAGyJgGoAERGAWjsQBpnr2B6dp-7-gHQ92berURw4aEgEMAznJgBcdgEJ2AAnYB8HWr30t9dfQDE7ACTMpAZQD2ABwFoAQvIEawRCiQIy8RAAmGnKEAK4A5hEUIXgyBHgAlgB2EQwALADsAKye3qR-AYEMoQSR0UQlcQkpaVnZADH0zWhEAnYAKEA",
        abcString:
            '%%barnumbers 1\n%%printtempo 0\n%%stretchlast 0\n%%score {V0 *M| V1}\nQ:1/4=140\nM:4/4\nK:C\nL:1/16\nV: V0 clef=treble name="Sop.\\n(C.F)"\nV: V1 clef=bass name="Bas.\\n(C.P)"\n[V: V0]d16|f16|e16|d16|a16|f16|a16|g16|f16|e16|d16|]\n[V: V1]D,16|A,16|G,16|"^⚑"F,16|"^⚑"F,16|A,16|.(F,16|G,16|A,16|"^⚑"C16|D16)|]\n',
        vsp: [1, 0],
        vid: [1, 0],
        mode: 2,
        clefs: ["treble", "bass"],
        results: [
            {
                location: {
                    voiceIndex: 0,
                    noteIndex: 48,
                },
                comment: "نغمة مكررة",
            },
        ],
    },
    {
        debug: "IgYAwgggzAAAgDGANhyAgaBAMBgAXAJwFMAjAGyJgGoAERGAWjsQBpnr2A6dp-gei492teiPgAoNCQCGAZ1kwAuOwCE7AATsA-OwB4q7RoP0AROwAkzOGgDKAewAOnNACE5ndWCIUSBaXiIAE3VZQgBXAHMIihC8aQI8AEsAOwiGABYAdgBWT29SPwDAhlCCSOiiEriElLSs7IAY-maASCJOZIBpoA__",
        abcString:
            '%%barnumbers 1\n%%printtempo 0\n%%stretchlast 0\n%%score {V0 *M| V1}\nQ:1/4=140\nM:4/4\nK:C\nL:1/16\nV: V0 clef=treble name="Sop.\\n(C.F)"\nV: V1 clef=bass name="Bas.\\n(C.P)"\n[V: V0]d16|f16|e16|d16|g16|f16|.(a16|g16|f16|"^⚑"d16)|d16|]\n[V: V1]D,16|A,16|G,16|F,16|E,16|A,16|.(F,16|G,16|A,16|"^⚑"B,16|D16)|]\n',
        vsp: [1, 0],
        vid: [1, 0],
        mode: 2,
        clefs: ["treble", "bass"],
        results: [
            {
                location: {
                    voiceIndex: 0,
                    noteIndex: 144,
                },
                comment: "النغمة الاخيرة تسبق بالحساس",
            },
        ],
    },
];

test("Type 1 Rules", () => {
    for (const testPiece of testsData) {
        const interceptor = new Interceptor(
            testPiece.abcString,
            testPiece.vsp,
            testPiece.vid,
            testPiece.mode,
            testPiece.clefs as [string, string]
        );
        const rules = new Type1Rules().rules(interceptor);
        const results = [];
        for (const rule of rules) {
            const location = rule.rule();
            if (location !== true) {
                results.push({ location, comment: rule.comment });
            }
        }
        expect(results.length).toBe(1);
        expect(results[0].comment).toBe(testPiece.results[0].comment);
        expect(results[0].location.noteIndex).toBe(testPiece.results[0].location.noteIndex);
        expect(results[0].location.voiceIndex).toBe(testPiece.results[0].location.voiceIndex);
        expect(results[0].location.startLine).toBe(testPiece.results[0].location.startLine);
        expect(results[0].location.endSlur).toBe(testPiece.results[0].location.endSlur);
    }
});
