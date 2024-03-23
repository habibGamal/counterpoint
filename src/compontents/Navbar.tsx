import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Tab, routerSlice } from "../slices/routerSlice";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import { Add, HambergerMenu, Logout } from "iconsax-react";
import { routes } from "../Routes";

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
    const navRoutes = Object.entries(routes)
        .filter(([name, route]) => route.icon !== undefined)
        .map(([name, route]) => ({ name, ...route }));
    return (
        <>
            <div
                onClick={() => setToggle(!toggle)}
                className="fixed select-none active:scale-95 cursor-pointer transition z-50 top-8 right-4 rounded-xl bg-white shadow-xl w-10 aspect-square grid place-items-center"
            >
                {toggle ? <HambergerMenu color="#000" /> : <Add className="rotate-45" size="32" color="#000" />}
            </div>
            {toggle == false && (
                <>
                    <div onClick={closeNavbar} className="fixed w-full h-full bg-black opacity-70 z-30"></div>
                    <motion.nav
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.3 }}
                        // className="fixed top-0 left-0 w-full h-full z-40"
                        className="w-[350px] shrink-0 overflow-y-auto  navigation-gradient h-screen flex flex-col  fixed top-0 z-40"
                    >
                        <div className="min-h-[870px]">
                            <ul className="flex flex-col gap-2 text-white pt-8 my-16">
                                {navRoutes.map((route) => (
                                    <NavItem
                                        onClick={() => changeTab(route.name as Tab)}
                                        active={isActive(route.name as Tab)}
                                        icon={route.icon!}
                                        text={route.text}
                                    />
                                ))}
                                <NavItem onClick={() => logout()} icon={<Logout />} text="تسجيل خروج" />
                            </ul>
                            <div className="rounded-xl bg-[#ffffff73] w-[250px] py-4 px-8 mx-auto text-lg font-medium">
                                <div className="flex gap-2">
                                    <img className="w-6  icon-indigoo" src="icons/sms.svg" />
                                    <span>للتواصل</span>
                                </div>
                                <span className="text-[#17447F] text-[16px]">youstinavictor00@gmail.com</span>
                            </div>
                        </div>
                    </motion.nav>
                </>
            )}
        </>
    );
};

export default Navbar;
