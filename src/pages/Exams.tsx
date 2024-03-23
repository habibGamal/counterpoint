import { useEffect, useState } from "react";
import PageTitle from "../compontents/PageTitle";
import { useAppDispatch } from "../hooks";
import { routerSlice } from "../slices/routerSlice";
import Container from "../compontents/Container";
import ModalOptions from "../compontents/ModalOptions";
import { collection, doc, getDoc } from "firebase/firestore";
import firebase from "../firebase";
import { offlineExamsData } from "../OffineExamsData";

const ChooseCantusModal = ({
    state,
    close,
    examType: exersizeType,
    stage,
}: {
    state: boolean;
    close: () => void;
    examType: number;
    stage: string;
}) => {
    const data = offlineExamsData as any;
    const dispatch = useAppDispatch();
    const play = (cantus: string, location: string) => {
        if (!data[`Type ${exersizeType}`]?.[stage]?.[cantus]) return;
        dispatch(
            routerSlice.actions.pushTab({
                tab: "Play",
                params: {
                    voice: data[`Type ${exersizeType}`][stage][cantus],
                    location,
                    exersizeType,
                },
            })
        );
    };

    return (
        <ModalOptions
            title="Choose Cantus"
            state={state}
            close={close}
            options={[
                { onClick: () => play("bass", "up"), title: "مفتاح صول" },
                { onClick: () => play("Do Alto Up", "up"), title: "مفتاح دو الطو (اعلى)" },
                { onClick: () => play("Do Alto Down", "down"), title: "مفتاح دو الطو (اسفل)" },
                { onClick: () => play("Tenor Up", "up"), title: "مفتاح دو تينور (اعلى)" },
                { onClick: () => play("Tenor Down", "down"), title: "مفتاح دو تينور (اسفل)" },
                { onClick: () => play("soprano", "down"), title: "مفتاح فا" },
            ]}
        />
    );
};
const ChooseStageModal = ({ state, close, examType }: { state: boolean; close: () => void; examType: number }) => {
    const [modalState, setModalState] = useState(false);
    const [stage, setStage] = useState("dourian");
    const open = (stage: string) => {
        close();
        setStage(stage);
        setModalState(true);
    };
    const closeChooseModal = () => setModalState(false);
    return (
        <>
            <ChooseCantusModal state={modalState} close={closeChooseModal} examType={examType} stage={stage} />
            <ModalOptions
                title="أختر المقام"
                state={state}
                close={close}
                options={[
                    { onClick: () => open("dorian"), title: "مقام دوريان" },
                    { onClick: () => open("phrygian"), title: "مقام فريجيان" },
                    { onClick: () => open("lydian"), title: "مقام ليديان" },
                    { onClick: () => open("mixolydian"), title: "مقام مكسوليديان" },
                    { onClick: () => open("aeolian"), title: "مقام الأيوليان" },
                    { onClick: () => open("locrian"), title: "مقام لوكريان" },
                    { onClick: () => open("aionian"), title: "مقام ايونيان" },
                ]}
            />
        </>
    );
};
const Exam = ({ name, examType }: { name: string; examType: number }) => {
    const [modalState, setModalState] = useState(false);
    const open = () => setModalState(true);
    const close = () => setModalState(false);
    return (
        <>
            <ChooseStageModal state={modalState} close={close} examType={examType} />
            <li
                onClick={() => open()}
                className="bg-white my-8 p-4 rounded-lg transition hover:scale-[1.01] cursor-pointer"
            >
                {name}
            </li>
        </>
    );
};
export default function Exams() {
    return (
        <div className="w-full">
            <PageTitle title="اختبر نفسك" subTitle="هذه بعض الاختبارت لتقييم ادائك" iconSrc="icons/edit.svg" />
            <Container>
                <div className="relative">
                    <ul className="bg-sky-900 text-2xl py-4 px-8 my-16 rounded-lg">
                        <Exam name="اختبارات النوع الاول" examType={1} />
                        <Exam name="اختبارات النوع االثاني" examType={2} />
                        <Exam name="اختبارات النوع الثالث" examType={3} />
                        <Exam name="اختبارات النوع الرابع" examType={4} />
                        <Exam name="اختبارات النوع الخامس" examType={5} />
                    </ul>
                    <div className="absolute border-2 border-sky-900 bg-[#f7f7f7] w-1/2 2xl:w-2/3 left-0 top-0  rounded-r-full h-full grid place-items-center">
                        <img src="illustrations/counterpoint_types.png" />
                    </div>
                </div>
            </Container>
        </div>
    );
}
