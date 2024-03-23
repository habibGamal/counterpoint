import { useEffect, useState } from "react";
import PageTitle from "../compontents/PageTitle";
import { useAppDispatch } from "../hooks";
import { routerSlice } from "../slices/routerSlice";
import Container from "../compontents/Container";
import ModalOptions from "../compontents/ModalOptions";
import { collection, doc, getDoc } from "firebase/firestore";
import firebase from "../firebase";
import { offlineExersizesData } from "../OfflineExersizesData";

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
    // const [data, setData] = useState<any>({});
    const dispatch = useAppDispatch();
    const play = (cantus: string) => {
        if (!(offlineExersizesData as any)[`Type ${exersizeType}`]?.[stage]?.[cantus]) return;
        dispatch(
            routerSlice.actions.pushTab({
                tab: "PlayWithNoControls",
                params: {
                    code: (offlineExersizesData as any)[`Type ${exersizeType}`][stage][cantus],
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
                { onClick: () => play("soprano"), title: "مفتاح صول" },
                { onClick: () => play("Do Alto"), title: "مفتاح دو الطو" },
                { onClick: () => play("tenor"), title: "مفتاح دو تينور" },
                { onClick: () => play("fa"), title: "مفتاح فا" },
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
                title="نماذج استرشادية"
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
            </Container>
        </div>
    );
}
