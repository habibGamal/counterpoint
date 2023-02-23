import { useState } from "react";
import NavItem from "./NavItem";
import { useAppDispatch } from "../hooks";
import  { Tab,routerSlice } from "../slices/routerSlice";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string>("Rules");
  const dispatch = useAppDispatch();
  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
    dispatch(routerSlice.actions.changeTab(tab))
  }
  const isActive = (tab: Tab) => {
    return activeTab === tab;
  };
  return (
    <nav className="w-[300px] shrink-0 navigation-gradient h-screen flex flex-col justify-evenly sticky top-0">
      <ul className="flex flex-col gap-2  text-white justify-center">
        <NavItem onClick={()=>changeTab("Home")} active={isActive("Home")} icon="home-2" text="الرئيسية" />
        <NavItem onClick={()=>changeTab("Rules")} active={isActive("Rules")} icon="ruler&pen" text="قواعد الكونتربوينت" />
        <NavItem onClick={()=>changeTab("ConterpointTypes")} active={isActive("ConterpointTypes")} icon="shapes" text="انواع الكونتربوينت" />
        <NavItem onClick={()=>changeTab("Exersizes")} active={isActive("Exersizes")} icon="clipboard-tick" text="تمارين محلولة" />
        <NavItem onClick={()=>changeTab("Exams")} active={isActive("Exams")} icon="edit" text="اختبر نفسك" />
        <NavItem onClick={()=>changeTab("Home")} active={isActive("Home")} icon="note-add" text="انشاء مقطوعة" />
        <NavItem onClick={()=>changeTab("Home")} active={isActive("Home")} icon="document-text" text="اسئلة" />
        <NavItem onClick={()=>changeTab("Home")} active={isActive("Home")} icon="document-upload" text="تحديث التمارين" />
        <NavItem onClick={()=>changeTab("Home")} active={isActive("Home")} icon="info-circle" text="عنا" />
      </ul>
      <div className="rounded-xl bg-[#ffffff73] w-[250px] p-8 mx-auto text-lg font-medium">
        <div className="flex gap-2">
          <img className="w-6  icon-indigoo" src="icons/sms.svg" />
          <span>للتواصل</span>
        </div>
        <span className="text-[#17447F]">youstinavictor@gmail.com</span>
      </div>
    </nav>
  );
};

export default Navbar;
