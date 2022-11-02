import { useAppDispatch } from "../hooks";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faShapes, faCircleInfo, faChalkboardUser, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import hero_image from '../assets/hero_image.png'
import { routerSlice } from "../slices/routerSlice";

function TabBtn({ name, icon, onClick }: { name: string, icon: IconProp, onClick: () => void }) {
    return (
        <div onClick={onClick} className="p-4 rounded shadow text-primary-50 flex flex-col gap-4 items-center w-[300px] hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
            <FontAwesomeIcon size='4x' icon={icon} />
            <span className="text-3xl font-bold">{name}</span>
        </div>
    );
}
export default function Home() {
    const dispatch = useAppDispatch();
    return (
        <>
            <div className="flex justify-evenly items-center mt-16 mb-8">
                <div>
                    <h1 className="text-primary-100 text-8xl font-bold mb-4">تعلُم الكونتربوينت</h1>
                    <p className="text-primary-200 text-4xl font-bold">
                        برنامج تعلم اساسيات الكونتربوينت
                        بالتمارين والاختبارات
                    </p>
                </div>
                <img className="w-[500px]" src={hero_image} />
            </div>
            <div className="grid grid-cols-5 gap-4 m-16">
                <TabBtn onClick={() => dispatch(routerSlice.actions.changeTab('Rules'))} name='قواعد' icon={faListCheck} />
                <TabBtn onClick={() => dispatch(routerSlice.actions.changeTab('ConterpointTypes'))} name='انواع الكونتربوينت' icon={faShapes} />
                <TabBtn onClick={() => null} name='تمارين' icon={faChalkboardUser} />
                <TabBtn onClick={() => null} name='اختبر نفسك' icon={faClipboardCheck} />
                <TabBtn onClick={() => null} name='عنا' icon={faCircleInfo} />
            </div>
        </>
    );
}