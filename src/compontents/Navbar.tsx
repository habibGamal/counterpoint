import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Tab, routerSlice } from "../slices/routerSlice";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import {
    Add,
    ClipboardTick,
    DocumentText,
    Edit,
    HambergerMenu,
    Home2,
    InfoCircle,
    Logout,
    NoteAdd,
    Ruler,
    RulerPen,
    Shapes,
} from "iconsax-react";
const Navbar = ({ toggleState }: { toggleState: boolean }) => {
    const activeTab = useAppSelector((state) => state.routerSlice.routeStack[state.routerSlice.routeStack.length - 1]);
    const dispatch = useAppDispatch();
    const changeTab = (tab: Tab) => {
        dispatch(routerSlice.actions.changeTab(tab));
        closeNavbar();
    };
    const isActive = (tab: Tab) => {
        return activeTab === tab;
    };
    const [toggle, setToggle] = useState(toggleState);
    const closeNavbar = () => setToggle(true);
    useEffect(() => {
        setToggle(toggleState);
    }, [toggleState]);
    const { setCanAccess } = UserAuth()!;
    const logout = () => {
        auth.signOut();
        setCanAccess!(false);
    };
    return (
        <>
            <div
                onClick={() => setToggle(!toggle)}
                className="fixed select-none active:scale-95 cursor-pointer transition z-50 top-8 right-4 rounded-xl bg-white shadow-xl w-10 aspect-square grid place-items-center"
            >
                {toggle ? <HambergerMenu color="#000" /> : <Add className="rotate-45" size="32" color="#000"/>}
            </div>
            {toggle == false && (
                <>
                    <div onClick={closeNavbar} className="fixed w-full h-full bg-black opacity-70 z-30"></div>
                    <nav className="w-[350px] shrink-0 navigation-gradient h-screen flex flex-col justify-evenly fixed top-0 z-40">
                        <ul className="flex flex-col gap-2  text-white justify-center mt-16">
                            <NavItem
                                onClick={() => changeTab("Home")}
                                active={isActive("Home")}
                                icon={<Home2 />}
                                text="الرئيسية"
                            />
                            <NavItem
                                onClick={() => changeTab("About")}
                                active={isActive("About")}
                                icon={<InfoCircle />}
                                text="ادارة البرنامج"
                            />
                            {/* <NavItem
                                onClick={() => changeTab("Rules")}
                                active={isActive("Rules")}
                                icon={<RulerPen />}
                                text="قواعد الكنتربوينت"
                            /> */}
                            <NavItem
                                onClick={() => changeTab("MelodyHorizontalRules")}
                                active={isActive("MelodyHorizontalRules")}
                                icon={<Ruler />}
                                text="قواعد اللحن الافقي C.F"
                            />
                            <NavItem
                                onClick={() => changeTab("ConterpointTypes")}
                                active={isActive("ConterpointTypes")}
                                icon={<Shapes />}
                                text="قواعد الكنتربوينت"
                            />
                            <NavItem
                                onClick={() => changeTab("Exersizes")}
                                active={isActive("Exersizes")}
                                icon={<ClipboardTick />}
                                text="نماذج استرشادية"
                            />
                            <NavItem
                                onClick={() => changeTab("Exams")}
                                active={isActive("Exams")}
                                icon={<Edit />}
                                text="اختبر نفسك"
                            />
                            <NavItem
                                onClick={() => changeTab("Play")}
                                active={isActive("Play")}
                                icon={<NoteAdd />}
                                text="انشاء مقطوعة"
                            />
                            <NavItem
                                onClick={() => changeTab("Questions")}
                                active={isActive("Questions")}
                                icon={<DocumentText />}
                                text="اسئلة"
                            />
                            <NavItem onClick={() => logout()} icon={<Logout />} text="تسجيل خروج" />
                        </ul>
                        <div className="rounded-xl bg-[#ffffff73] w-[250px] py-4 px-8 mx-auto text-lg font-medium">
                            <div className="flex gap-2">
                                <img className="w-6  icon-indigoo" src="icons/sms.svg" />
                                <span>للتواصل</span>
                            </div>
                            <span className="text-[#17447F] text-[16px]">youstinavictor00@gmail.com</span>
                        </div>
                    </nav>
                </>
            )}
        </>
    );
};

export default Navbar;
