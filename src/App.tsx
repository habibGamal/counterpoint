import React, { useEffect } from "react";
import Navbar from "./compontents/Navbar";
import { useAppSelector } from "./hooks";
import Auth from "./Auth";
import { UserAuth } from "./context/AuthContext";
import { routes } from "./Routes";

export default function App() {
    const { routeStack, routeParams } = useAppSelector((state) => state.routerSlice);

    const [currentTabRender, setCurrentTabRender] = React.useState(<></>);
    useEffect(() => {
        const currentTab = routeStack[routeStack.length - 1];
        console.log(currentTab, routeStack);
        const { component: Page } = routes[currentTab];
        setCurrentTabRender(<Page key={Date()} {...routeParams} />);
    }, [routeStack, routeParams]);
    const { canAccess, user, logOut } = UserAuth()!;
    return canAccess? (
        <div className="flex">
            <Navbar toggleState={true} />
            {currentTabRender}
        </div>
    ) : (
        <div className="flex flex-col justify-center gap-4 items-center bg-home-image min-h-screen">
            <div className="grid grid-cols-2 justify-items-center items-center mx-8">
                <div className="mr-16 w-full">
                    <h1 className="text-center mt-4 text-sky-900 text-4xl 2xl:text-5xl font-bold mb-4 2xl:leading-[4.5rem] leading-snug">
                        برنامج إلكتروني قائم على <br />
                        الكنتربوينت المقيد
                        <br />
                        (صوت مقابل صوت)
                    </h1>
                </div>
                <img className="" src="illustrations/home.png" />
            </div>
            <Auth />
        </div>
    );
}
