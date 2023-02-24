import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { useAppDispatch } from "../hooks";
import { Tab, routerSlice } from "../slices/routerSlice";
import { MenuOutlined } from "@ant-design/icons";
const Navbar = ({ toggleState }: { toggleState: boolean }) => {
  const [activeTab, setActiveTab] = useState<string>("Rules");
  const dispatch = useAppDispatch();
  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
    dispatch(routerSlice.actions.changeTab(tab));
  };
  const isActive = (tab: Tab) => {
    return activeTab === tab;
  };
  const [toggle, setToggle] = useState(toggleState);
  useEffect(() => {
    setToggle(toggleState);
  }, [toggleState]);
  return (
    <>
      <div
        onClick={() => setToggle(!toggle)}
        className="fixed select-none active:scale-95 cursor-pointer transition z-10 top-2 right-8 rounded-xl bg-white shadow-xl w-10 aspect-square grid place-items-center"
      >
        <MenuOutlined />
      </div>
      {toggle == false && (
        <nav className="w-[300px] shrink-0 navigation-gradient h-screen flex flex-col justify-evenly sticky top-0">
          <ul className="flex flex-col gap-2  text-white justify-center">
            {/* <NavItem
              onClick={() => changeTab("Home")}
              active={isActive("Home")}
              icon="home-2"
              text="الرئيسية"
            /> */}
            <NavItem
              onClick={() => changeTab("Rules")}
              active={isActive("Rules")}
              icon="ruler&pen"
              text="قواعد الكونتربوينت"
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
              onClick={() => {
                dispatch(
                  routerSlice.actions.pushTab({
                    tab: "Play",
                    params: {
                      editable: true,
                      key1: "treble",
                      key2: "bass",
                      voice1: "z|z|z|]",
                      voice2: "z|z|z|]",
                      index: undefined,
                    },
                  })
                );
                setActiveTab("Play");
              }}
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
            {/* <NavItem
              onClick={() => changeTab("Home")}
              active={isActive("Home")}
              icon="document-upload"
              text="تحديث التمارين"
            /> */}
            <NavItem
              onClick={() => changeTab("About")}
              active={isActive("About")}
              icon="info-circle"
              text="عنا"
            />
          </ul>
          <div className="rounded-xl bg-[#ffffff73] w-[250px] p-8 mx-auto text-lg font-medium">
            <div className="flex gap-2">
              <img className="w-6  icon-indigoo" src="icons/sms.svg" />
              <span>للتواصل</span>
            </div>
            <span className="text-[#17447F]">youstinavictor@gmail.com</span>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
