import React, { useEffect } from "react";
import Navbar from "./compontents/Navbar";
import Rules from "./pages/Rules";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Tab } from "./slices/routerSlice";
import Unimplemented from "./pages/Unimplemented";
import CounterpointTypes from "./pages/CounterpointTypes";
import Type1 from "./pages/counterpoint_types/Type1";
import Type3 from "./pages/counterpoint_types/Type3";
import Type4 from "./pages/counterpoint_types/Type4";
import Type2 from "./pages/counterpoint_types/Type2";
import Type5 from "./pages/counterpoint_types/Type5";
import Exams from "./pages/Exersizes";
import Questions from "./pages/Questions";
import Exersizes from "./pages/Exams";
import About from "./pages/About";
import Home from "./pages/Home";
import Play from "./Play";
import PlayOLD from "./PlayOLD";
import { Button } from "antd";
import Auth from "./Auth";
import { UserAuth } from "./context/AuthContext";
import MelodyHorizontalRules from "./pages/MelodyHorizontalRules";
import PlayWithNoControls from "./PlayWithNoControls";

export default function App() {
    const { routeStack, routeParams } = useAppSelector((state) => state.routerSlice);

    const [currentTabRender, setCurrentTabRender] = React.useState(<Unimplemented />);
    useEffect(() => {
        const currentTab = routeStack[routeStack.length - 1];
        console.log(currentTab,routeStack);

        if (currentTab === "Home") setCurrentTabRender(<Home />);
        if (currentTab === "Rules") setCurrentTabRender(<Rules />);
        if (currentTab === "ConterpointTypes") setCurrentTabRender(<CounterpointTypes />);
        if (currentTab === "MelodyHorizontalRules") setCurrentTabRender(<MelodyHorizontalRules />);
        if (currentTab === "Exersizes") setCurrentTabRender(<Exams />);
        if (currentTab === "Play") setCurrentTabRender(<Play key={Date()} {...routeParams} />);
        if (currentTab === "PlayWithNoControls") setCurrentTabRender(<PlayWithNoControls key={Date()} {...routeParams} />);
        if (currentTab === "PlayOLD") setCurrentTabRender(<PlayOLD key={Date()} {...routeParams} />);
        if (currentTab === "Exams") setCurrentTabRender(<Exersizes />);
        if (currentTab === "Questions") setCurrentTabRender(<Questions />);
        if (currentTab === "About") setCurrentTabRender(<About />);
        if (currentTab === "Type1") setCurrentTabRender(<Type1 />);
        if (currentTab === "Type2") setCurrentTabRender(<Type2 />);
        if (currentTab === "Type3") setCurrentTabRender(<Type3 />);
        if (currentTab === "Type4") setCurrentTabRender(<Type4 />);
        if (currentTab === "Type5") setCurrentTabRender(<Type5 />);
    }, [routeStack, routeParams]);
    const { canAccess, user, logOut } = UserAuth()!;
    return canAccess || true ? (
        <div className="flex">
            <Navbar toggleState={true} />
            {currentTabRender}
        </div>
    ) : (
        <div className="flex flex-col justify-center gap-8 items-center bg-home-image min-h-screen">
            <div className="grid grid-cols-2 -mt-24 justify-items-center items-center mx-8">
                <div className="mr-16">
                    <h1 className="text-sky-900 text-5xl 2xl:text-8xl font-bold mb-4">تعلُم الكونتربوينت</h1>
                    <p className="text-sky-600 text-3xl font-bold">
                        برنامج تعلم اساسيات الكونتربوينت بالتمارين والاختبارات
                    </p>
                </div>
                <img className="" src="illustrations/home.png" />
            </div>
            <Auth />
        </div>
    );
}
