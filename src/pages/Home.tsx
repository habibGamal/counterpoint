import { useAppDispatch } from "../hooks";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faShapes, faCircleInfo, faChalkboardUser, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import hero_image from '../assets/hero_image.png'
import { routerSlice } from "../slices/routerSlice";
import { ReactNode } from "react";

function TabBtn({ name, icon, onClick }: { name: ReactNode, icon: IconProp, onClick: () => void }) {
    return (
        <div onClick={onClick} className="p-4 rounded shadow text-primary-50 flex flex-col gap-4 justify-center items-center  hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
            <FontAwesomeIcon size='3x' icon={icon} />
            <span className="md:text-2xl text-3xl font-bold text-center">{name}</span>
        </div>
    );
}
export default function Home() {
    const dispatch = useAppDispatch();
    return (
        <div className="grid xl:grid-rows-[60%50%] grid-rows-2 h-[calc(100vh-100px)] items-center">
            <div className="grid grid-cols-2 justify-items-center items-center mt-16 mx-8">
                <div>
                    <h1 className="text-primary-100 text-6xl xl:text-8xl font-bold mb-4">تعلُم الكونتربوينت</h1>
                    <p className="text-primary-200 text-4xl font-bold">
                        برنامج تعلم اساسيات الكونتربوينت
                        بالتمارين والاختبارات
                    </p>
                </div>
                <img className="max-w-[300px] xl:max-w-[500px]" src={hero_image} />
            </div>
            <div className="grid grid-cols-5 gap-4 m-16">
                <TabBtn onClick={() => dispatch(routerSlice.actions.pushTab({tab:'Rules'}))} name={
                    <>
                        قواعد االلحن الاساسية
                        <br />
                        (C.F)
                    </>
                } icon={faListCheck} />
                <TabBtn onClick={() => dispatch(routerSlice.actions.pushTab({tab:'ConterpointTypes'}))} name='انواع الكونتربوينت' icon={faShapes} />
                <TabBtn onClick={() => dispatch(routerSlice.actions.pushTab({tab:'Exersizes'}))} name='تمارين محلولة' icon={faChalkboardUser} />
                <TabBtn onClick={() =>  dispatch(routerSlice.actions.pushTab({tab:'Exams'}))} name='اختبر نفسك' icon={faClipboardCheck} />
                <TabBtn onClick={() => dispatch(routerSlice.actions.pushTab({tab:'About'}))} name='عنا' icon={faCircleInfo} />
            </div>
        </div>
    );
}