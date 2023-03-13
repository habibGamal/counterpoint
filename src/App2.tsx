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
import Exams from "./pages/Exams";
import Play from "./Play";
import Questions from "./pages/Questions";
import Exersizes from "./pages/Exersizes";
import About from "./pages/About";
import Home from "./pages/Home";

export default function App2() {
  const { routeStack, routeParams } = useAppSelector(
    (state) => state.routerSlice
  );
  // const renderTab = (routeStack: Tab[]) => {
  // };
  const [currentTabRender, setCurrentTabRender] = React.useState(
    <Unimplemented />
  );
  useEffect(() => {
    const currentTab = routeStack[routeStack.length - 1];
    console.log(currentTab);
    
    if (currentTab === "Home") setCurrentTabRender(<Home />);
    if (currentTab === "Rules") setCurrentTabRender(<Rules />);
    if (currentTab === "ConterpointTypes")
      setCurrentTabRender(<CounterpointTypes />);
    if (currentTab === "Exersizes") setCurrentTabRender(<Exersizes />);
    if (currentTab === "Play") setCurrentTabRender(<Play key={Date()} {...routeParams} />);
    if (currentTab === "Exams") setCurrentTabRender(<Exams />);
    if (currentTab === "Questions") setCurrentTabRender(<Questions />);
    if (currentTab === "About") setCurrentTabRender(<About />);
    if (currentTab === "Type1") setCurrentTabRender(<Type1 />);
    if (currentTab === "Type2") setCurrentTabRender(<Type2 />);
    if (currentTab === "Type3") setCurrentTabRender(<Type3 />);
    if (currentTab === "Type4") setCurrentTabRender(<Type4 />);
    if (currentTab === "Type5") setCurrentTabRender(<Type5 />);
  }, [routeStack,routeParams]);
  return (
    <div className="flex">
      {routeStack[routeStack.length - 1] === "Play" ? (
        <Navbar toggleState={true} />
      ) : (
        <Navbar toggleState={false} />
      )}
      {currentTabRender}
      {/* <Rules /> */}
    </div>
  );
}
