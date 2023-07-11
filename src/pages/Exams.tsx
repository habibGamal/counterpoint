import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Modal from "../compontents/Modal";
import PageTitle from "../compontents/PageTitle";
import { useAppDispatch } from "../hooks";
import { routerSlice } from "../slices/routerSlice";
import { motion } from "framer-motion";
import { cardAnimation } from "../animation/card";
import { data } from "../Data";
import Container from "../compontents/Container";

const Option = ({ title, onClick }: { title: string; onClick: () => void }) => {
    return (
        <li
            onClick={onClick}
            className="p-2 my-2 border rounded hover:bg-sky-900 hover:text-gray-100 cursor-pointer active:scale-95 transition-transform"
        >
            {title}
        </li>
    );
};
const ChooseCantusModal = ({
    state,
    close,
    stage,
}: {
    state: boolean;
    close: () => void;
    stage: string;
}) => {
    const dispatch = useAppDispatch();
    const play = (cantus:string) => {
        // if (data[`type${exersizeType}`][stage][cantus] === undefined) return;
        dispatch(
            routerSlice.actions.pushTab({
                tab: "Play",
                params: {
                    stage,
                    cantus,
                },
            })
        );
    };
    return (
        <Modal state={state} close={close}>
            <div className="p-4 font-sans min-w-[300px]">
                <h4 className="text-center text-2xl mb-4">Cantus firmus</h4>
                <ul className="text-xl text-left">
                    <Option onClick={() => play("soprano")} title="Soprano" />
                    <Option onClick={() => play("bass")} title="Bass" />
                </ul>
            </div>
        </Modal>
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
