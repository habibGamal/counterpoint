import { useState } from "react";
import Modal from "../compontents/Modal";
import PageTitle from "../compontents/PageTitle";
import { useAppDispatch } from "../hooks";
import { routerSlice } from "../slices/routerSlice";
import Container from "../compontents/Container";
import ModalOptions from "../compontents/ModalOptions";

const ChooseCantusModal = ({ state, close, stage }: { state: boolean; close: () => void; stage: string }) => {
    const dispatch = useAppDispatch();
    const play = (type: string, cantus: string) => {
        dispatch(
            routerSlice.actions.pushTab({
                tab: "Play",
                params: {
                    stage,
                    type,
                    cantus,
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
                { onClick: () => play("sop_bass", "up"), title: "Soprano" },
                { onClick: () => play("sop_bass", "down"), title: "Bass" },
                { onClick: () => play("doalto", "up"), title: "Alto - Up" },
                { onClick: () => play("doalto", "down"), title: "Alto - Down" },
                { onClick: () => play("tenor", "up"), title: "Tenor - Up" },
                { onClick: () => play("tenor", "down"), title: "Tenor - Down" },
            ]}
        />
    );
};
const Exam = ({ name, stage }: { name: string; stage: string }) => {
    const [modalState, setModalState] = useState(false);
    const open = () => setModalState(true);
    const closeChooseModal = () => setModalState(false);
    return (
        <>
            <ChooseCantusModal state={modalState} close={closeChooseModal} stage={stage} />
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
        <div className="w-full bg-home-image">
            <PageTitle title="اختبر نفسك" subTitle="هذه بعض الاختبارت لتقييم ادائك" iconSrc="icons/edit.svg" />
            <Container>
                <div className="relative">
                    <ul className="bg-sky-900 text-2xl py-4 px-8 my-16 rounded-lg">
                        <Exam name="مقام دوريان" stage="dorian" />
                        <Exam name="مقام فريجيان" stage="frigian" />
                        <Exam name="مقام ليديان" stage="lydian" />
                        <Exam name="مقام مكسوليديان" stage="maxolidian" />
                        <Exam name="مقام الأيوليان" stage="iolian" />
                        <Exam name="مقام لوكريان" stage="locrian" />
                        <Exam name="مقام ايونيان" stage="ionian" />
                    </ul>
                    <div className="absolute border-2 border-sky-900 bg-[#f7f7f7] w-1/2 2xl:w-2/3 left-0 top-0  rounded-r-full h-full grid place-items-center">
                        <img src="illustrations/counterpoint_types.png" />
                    </div>
                </div>
            </Container>
        </div>
    );
}
