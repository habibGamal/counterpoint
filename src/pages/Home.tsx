// import { Button } from "antd";
import Button from "../compontents/Button";
import { useAppDispatch } from "../hooks";
import { Tab, routerSlice } from "../slices/routerSlice";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    ClipboardTick,
    DocumentText,
    Edit,
    InfoCircle,
    NoteAdd,
    Ruler,
    RulerPen,
    Shapes,
} from "iconsax-react";

const variants: any = {
    open: { opacity: 1, y: 0, position: "relative", zIndex: 999 },
    closed: { opacity: 0, y: "-100%", position: "absolute" },
};

const NavItem = ({ icon, text, onClick }: { icon: JSX.Element; text: string; onClick: () => void }) => {
    return (
        <li
            onClick={onClick}
            className={`flex gap-4 pr-10 ml-10 p-2 bg-sky-600 2xl:p-4 rounded-lg cursor-pointer hover:scale-105 transition`}
        >
            <span className="icon">{icon}</span>
            <span className="text-xl">{text}</span>
        </li>
    );
};
export default function Home() {
    const dispatch = useAppDispatch();
    const changeTab = (tab: Tab) => dispatch(routerSlice.actions.changeTab(tab));
    const [slide, setSlide] = useState(0);
    const nextSlide = () => {
        setSlide((current) => (current < 2 ? current + 1 : 0));
    };
    const onEnter = (e: KeyboardEvent) => {
        console.log(e.key);
        if (e.key === "Enter") nextSlide();
    };
    useEffect(() => {
        window.addEventListener("keydown", onEnter);
        return () => {
            window.removeEventListener("keydown", onEnter);
        };
    }, []);

    const inShow = (index: number) => {
        return index === slide ? Object.keys(variants)[0] : Object.keys(variants)[1];
    };

    return (
        <div className="flex flex-col justify-center gap-8 items-center bg-home-image w-full min-h-screen">
            <div className="grid grid-cols-2 -mt-24 justify-items-center items-center mx-8">
                <div className="mr-16 w-full">
                    <motion.div variants={variants} animate={inShow(0)}>
                        <h1 className="text-sky-900 text-4xl 2xl:text-7xl font-bold mb-4 2xl:leading-[5.5rem] leading-snug">
                            برنامج إلكتروني قائم على <br />
                            الكنتربوينت المقيد
                            <br />
                            (صوت مقابل صوت)
                        </h1>
                    </motion.div>
                    <motion.div variants={variants} animate={inShow(1)}>
                        <h1 className="text-sky-900 text-4xl 2xl:text-7xl font-bold my-4 2xl:leading-[5.5rem] leading-snug">
                            فكرة البرنامج
                        </h1>
                        <ul>
                            <li className="text-sky-600 text-2xl font-bold">
                                د/ يوستينا فكتور اميل
                                <br />
                                <span className="text-lg text-sky-800">
                                    الباحثة بمرحلة الدكتوراه بقسم التربية الموسيقية بكلية التربية النوعية بجامعة أسيوط
                                    تخصص نظريات وتأليف
                                </span>
                            </li>
                        </ul>
                        <h1 className="text-sky-900 text-4xl 2xl:text-7xl font-bold my-4 2xl:leading-[5.5rem] leading-snug">
                            تحت اشراف
                        </h1>
                        <ul>
                            <li className="text-sky-600 text-2xl font-bold">
                                أ.د/ أبرار مصطفى إبراهيم علي
                                <br />
                                <span className="text-lg text-sky-800">
                                    أستاذ النظريات والتأليف بقسم التربية الموسيقية ووكيل شئون التعليم والطلاب - بكلية
                                    التربية النوعية - جامعة أسيوط
                                </span>
                            </li>
                            <li className="text-sky-600 text-2xl font-bold">
                                أ.م.د/ رويدا صابر أحمد
                                <br />
                                <span className="text-lg text-sky-800">
                                    أستاذ النظريات والتأليف المساعد بقسم التربية الموسيقية كلية التربية النوعية - جامعة
                                    أسيوط
                                </span>
                            </li>
                            <li className="text-sky-600 text-2xl font-bold">
                                د/ سعد حسن محي الدين
                                <br />
                                <span className="text-lg text-sky-800">
                                    مدرس تكنولوجيا التعليم - بقسم تكنولوجيا التعليم كلية التربية النوعية - جامعة أسيوط
                                </span>
                            </li>
                        </ul>
                    </motion.div>
                    <motion.ul
                        className="flex flex-col gap-2  text-white justify-center mt-16"
                        variants={variants}
                        animate={inShow(2)}
                    >
                        <NavItem
                            onClick={() => changeTab("About")}
                            // active={isActive("About")}
                            icon={<InfoCircle />}
                            text="ادارة البرنامج"
                        />
                        <NavItem
                            onClick={() => changeTab("MelodyHorizontalRules")}
                            // active={isActive("MelodyHorizontalRules")}
                            icon={<Ruler />}
                            text="قواعد اللحن الافقي C.F"
                        />
                        <NavItem
                            onClick={() => changeTab("ConterpointTypes")}
                            // active={isActive("ConterpointTypes")}
                            icon={<Shapes />}
                            text="قواعد الكنتربوينت"
                        />
                        <NavItem
                            onClick={() => changeTab("Exersizes")}
                            // active={isActive("Exersizes")}
                            icon={<ClipboardTick />}
                            text="نماذج استرشادية"
                        />
                        <NavItem
                            onClick={() => changeTab("Exams")}
                            // active={isActive("Exams")}
                            icon={<Edit />}
                            text="اختبر نفسك"
                        />
                        <NavItem
                            onClick={() => changeTab("Play")}
                            // active={isActive("Play")}
                            icon={<NoteAdd />}
                            text="انشاء مقطوعة"
                        />
                        <NavItem
                            onClick={() => changeTab("Questions")}
                            // active={isActive("Questions")}
                            icon={<DocumentText />}
                            text="اسئلة"
                        />
                    </motion.ul>
                </div>
                <img className="" src="illustrations/home.png" />
            </div>
            {/* <Button className="flex items-center gap-2" onClick={() => changeTab("ConterpointTypes")}>
                تعرف على قواعد الكنتربوينت
                <img className="w-6  icon-white" src={`icons/arrow-left.svg`} />
            </Button> */}
        </div>
    );
}
