import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Tab, routerSlice } from "../slices/routerSlice";
import { MenuOutlined } from "@ant-design/icons";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebase";
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
                <MenuOutlined />
            </div>
            {toggle == false && (
                <>
                    <div onClick={closeNavbar} className="fixed w-full h-full bg-black opacity-70 z-30"></div>
                    <nav className="w-[300px] shrink-0 navigation-gradient h-screen flex flex-col justify-evenly fixed top-0 z-40">
                        <ul className="flex flex-col gap-2  text-white justify-center mt-8">
                            <NavItem
                                onClick={() => changeTab("Home")}
                                active={isActive("Home")}
                                icon="home-2"
                                text="الرئيسية"
                            />
                            <NavItem
                                onClick={() => changeTab("Rules")}
                                active={isActive("Rules")}
                                icon="ruler&pen"
                                text="قواعد الكونتربوينت"
                            />
                            <NavItem
                                onClick={() => changeTab("MelodyHorizontalRules")}
                                active={isActive("MelodyHorizontalRules")}
                                icon="ruler"
                                text="قواعد اللحن الثابت"
                            />
                            <NavItem
                                onClick={() => changeTab("ConterpointTypes")}
                                active={isActive("ConterpointTypes")}
                                icon="shapes"
                                text="انواع الكونتربوينت"
                            />
                            <NavItem
                                onClick={() => changeTab("Exersizes")}
                                active={isActive("Exersizes")}
                                icon="clipboard-tick"
                                text="تمارين محلولة"
                            />
                            <NavItem
                                onClick={() => changeTab("Exams")}
                                active={isActive("Exams")}
                                icon="edit"
                                text="اختبر نفسك"
                            />
                            <NavItem
                                onClick={() => changeTab("Play")}
                                active={isActive("Play")}
                                icon="note-add"
                                text="انشاء مقطوعة"
                            />
                            <NavItem
                                onClick={() => changeTab("Questions")}
                                active={isActive("Questions")}
                                icon="document-text"
                                text="اسئلة"
                            />
                            <NavItem
                                onClick={() => changeTab("About")}
                                active={isActive("About")}
                                icon="info-circle"
                                text="عنا"
                            />
                            <NavItem onClick={() => logout()} icon="logout" text="تسجيل خروج" />
                        </ul>
                        <div className="rounded-xl bg-[#ffffff73] w-[250px] p-8 mx-auto text-lg font-medium">
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
