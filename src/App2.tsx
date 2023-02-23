import React from "react";
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

export default function App2() {
  const { routeStack, routeParams } = useAppSelector(
    (state) => state.routerSlice
  );
  const renderTab = (routeStack: Tab[]) => {
    const currentTab = routeStack[routeStack.length - 1];
    if (currentTab === "Home") return <Unimplemented />;
    if (currentTab === "Rules") return <Rules />;
    if (currentTab === "ConterpointTypes") return <CounterpointTypes />;
    if (currentTab === "Exersizes") return <Unimplemented />;
    // if (currentTab === "Play") return <Play {...routeParams} />;
    if (currentTab === "Exams") return <Unimplemented />;
    if (currentTab === "About") return <Unimplemented />;
    if (currentTab === "Type1") return <Type1 />;
    if (currentTab === "Type2") return <Type2 />;
    if (currentTab === "Type3") return <Type3 />;
    if (currentTab === "Type4") return <Type4 />;
    if (currentTab === "Type5") return <Type5 />;
  };
  return (
    <div className="flex">
      <Navbar />
      {renderTab(routeStack)}
      {/* <Rules /> */}
    </div>
  );
}
