import React, { useEffect, useState } from "react";
import PageTitle from "../compontents/PageTitle";
import Container from "../compontents/Container";
import firebase from "../firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { DocumentUpload } from "iconsax-react";
const clefs = {
    bass: "",
    "Do Alto Up": "",
    "Do Alto Down": "",
    "Tenor Up": "",
    "Tenor Down": "",
    soprano: "",
};
const modes = {
    dorian: { ...clefs },
    phrygian: { ...clefs },
    lydian: { ...clefs },
    mixolydian: { ...clefs },
    aeolian: { ...clefs },
    locrian: { ...clefs },
    aionian: { ...clefs },
};
const data = {
    "Type 1": { ...modes },
    "Type 2": { ...modes },
    "Type 3": { ...modes },
    "Type 4": { ...modes },
    "Type 5": { ...modes },
};
export default function UploadExams() {
    const [inputs, setInputs] = useState(data);
    const collectionRef = collection(firebase, "exams");
    const docRef = doc(collectionRef, "d2");
    const store = async () => {
        await setDoc(docRef, inputs);
    };
    const importData = async () => {
        const doc = await getDoc(docRef);
        if (!doc.exists()) return;
        const cloudData = doc.data() as any;
        setInputs((state) => {
            const newState: any = {};
            Object.entries(state).forEach(([type, modes]) => {
                newState[type] = {};
                Object.entries(modes).forEach(([mode, clefs]) => {
                    newState[type][mode] = {};
                    Object.entries(clefs).forEach(([clef, value]) => {
                        newState[type][mode][clef] = cloudData?.[type]?.[mode]?.[clef] ?? "";
                    });
                });
            });
            return newState;
        });
    };
    useEffect(() => {
        importData();
    }, []);
    return (
        <div className="w-full">
            <PageTitle title="اضافة اختبارات" subTitle="" iconSrc="icons/clipboard-tick.svg" />
            <Container>
                <button
                    className="bg-sky-500 active:bg-sky-600 text-white p-4 rounded-full fixed bottom-4 left-4"
                    onClick={store}
                >
                    <DocumentUpload />
                </button>
                <form className="ltr" onSubmit={(e) => e.preventDefault()}>
                    {Object.entries(inputs).map(([type, modes], index) => {
                        return (
                            <div key={`${index}`} className="border border-sky-500 rounded-xl my-4 p-4">
                                <h2>{type}</h2>
                                {Object.entries(modes).map(([mode, clefs]) => {
                                    return (
                                        <div
                                            key={`${index}-${mode}`}
                                            className="my-4 bg-stone-100 shadow p-4 rounded-xl"
                                        >
                                            <h3 className="capitalize">{mode}</h3>
                                            {Object.entries(clefs).map(([clef, value]) => {
                                                return (
                                                    <div key={`${index}-${mode}-${clef}`} className="m-4">
                                                        <h4 className="capitalize">{clef}</h4>
                                                        <input
                                                            key={`${index}-${mode}-${clef}`}
                                                            id={`${index}-${mode}-${clef}`}
                                                            className="border border-sky-500 rounded-lg p-2 w-full"
                                                            value={value}
                                                            onChange={(e) => {
                                                                setInputs((state) => {
                                                                    return {
                                                                        ...state,
                                                                        [type]: {
                                                                            ...modes,
                                                                            [mode]: {
                                                                                ...clefs,
                                                                                [clef]: e.target.value,
                                                                            },
                                                                        },
                                                                    };
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </form>
            </Container>
        </div>
    );
}
