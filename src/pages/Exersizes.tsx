import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Modal from "../compontents/Modal";
import PageTitle from "../compontents/PageTitle";
import { useAppDispatch } from "../hooks";
import { routerSlice } from "../slices/routerSlice";
import { motion } from "framer-motion";
import { cardAnimation } from "../animation/card";
import Container from "../compontents/Container";
import { data } from "../Data";

const Option = ({ title, onClick }: { title: string; onClick: () => void }) => {
    return (
        <li
            onClick={onClick}
            className="p-2 my-2 border rounded hover:bg-secondary-400 hover:text-gray-100 cursor-pointer active:scale-95 transition-transform"
        >
            {title}
        </li>
    );
};
const ChooseCantusModal = ({
    state,
    close,
    examType,
    stage,
}: {
    state: boolean;
    close: () => void;
    examType: number;
    stage: string;
}) => {
    const dispatch = useAppDispatch();
    const play = (cantus: string) => {
        if (data[`type${examType}`][stage][cantus] === undefined) return;
        dispatch(
            routerSlice.actions.pushTab({
                tab: "PlayOLD",
                params: {
                    editable: false,
                    ...data[`type${examType}`][stage][cantus],
                    index: cantus === "up" ? 1 : 0,
                },
            })
        );
    };
    return (
        <Modal state={state} close={close}>
            <div className="p-4 font-sans min-w-[300px]">
                <h4 className="text-center text-2xl mb-4">Cantus firmus</h4>
                <ul className="text-xl text-left">
                    <Option onClick={() => play("up")} title="Soprano" />
                    <Option onClick={() => play("down")} title="Bass" />
                </ul>
            </div>
        </Modal>
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
            <Modal state={state} close={close}>
                <div className="p-4 font-sans min-w-[300px]">
                    <h4 className="text-center text-2xl mb-4">أختر المقام</h4>
                    <ul className="text-xl">
                        <Option onClick={() => open("dourian")} title="مقام دوريان" />
                        <Option onClick={() => open("phrygian")} title="مقام فريجيان" />
                        <Option onClick={() => open("lydian")} title="مقام ليديان" />
                        <Option onClick={() => open("mixolydian")} title="مقام مكسوليديان" />
                        <Option onClick={() => open("aeolian")} title="مقام الأيوليان" />
                        <Option onClick={() => null} title="مقام اوكريان" />
                        <Option onClick={() => null} title="مقام ايونيان" />
                    </ul>
                </div>
            </Modal>
        </>
    );
};
const Exersize = ({ name, examType }: { name: string; examType: number }) => {
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
export default function Exersizes() {
    return (
        <div className="w-full">
            <PageTitle
                title="تمارين محلولة"
                subTitle="هذه بعض التمارين المحلولة لمساعدتك"
                iconSrc="icons/clipboard-tick.svg"
            />
            <Container>
                <div className="relative">
                    <ul className="bg-sky-900 text-2xl py-4 px-8 my-16 rounded-lg">
                        <Exersize name="تمارين النوع الاول" examType={1} />
                        <Exersize name="تمارين النوع االثاني" examType={2} />
                        <Exersize name="تمارين النوع الثالث" examType={3} />
                        <Exersize name="تمارين النوع الرابع" examType={4} />
                        <Exersize name="تمارين النوع الخامس" examType={5} />
                    </ul>
                    <div className="absolute border-2 border-sky-900 bg-[#f7f7f7] w-1/2 2xl:w-2/3 left-0 top-0  rounded-r-full h-full grid place-items-center">
                        <img src="illustrations/counterpoint_types.png" />
                    </div>
                </div>
                {/* <div className="grid-cols-2 grid gap-8 justify-items-center my-16 max-w-[900px] mx-auto">
        </div> */}
            </Container>
        </div>
    );
}
