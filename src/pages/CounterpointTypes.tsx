import React from "react";
import PageTitle from "../compontents/PageTitle";
import Container from "../compontents/Container";
import { useAppDispatch } from "../hooks";
import { routerSlice } from "../slices/routerSlice";

export default function CounterpointTypes() {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full">
      <PageTitle
        title="انواع الكونتربوينت"
        subTitle="انواع الكونتربوينت الموجودة وهي خمس"
        iconSrc="icons/shapes.svg"
      />
      <Container>
        <div className="relative">
          <ul className="bg-sky-900 text-2xl py-4 px-8 my-16 rounded-lg">
            <ListItem
              onClick={() =>
                dispatch(routerSlice.actions.pushTab({ tab: "Type1" }))
              }
              text="النوع الاول"
            />
            <ListItem
              onClick={() =>
                dispatch(routerSlice.actions.pushTab({ tab: "Type2" }))
              }
              text="النوع الثاني"
            />
            <ListItem
              onClick={() =>
                dispatch(routerSlice.actions.pushTab({ tab: "Type3" }))
              }
              text="النوع الثالث"
            />
            <ListItem
              onClick={() =>
                dispatch(routerSlice.actions.pushTab({ tab: "Type4" }))
              }
              text="النوع الرابع"
            />
            <ListItem
              onClick={() =>
                dispatch(routerSlice.actions.pushTab({ tab: "Type5" }))
              }
              text="النوع الخامس"
            />
          </ul>
          <div className="absolute border-2 border-sky-900 bg-[#f7f7f7] w-1/2 2xl:w-2/3 left-0 top-0  rounded-r-full h-full grid place-items-center">
            <img src="illustrations/counterpoint_types.png" />
          </div>
        </div>
      </Container>
    </div>
  );
}
const ListItem = ({
  onClick,
  text,
}: {
  onClick: () => void;
  text: React.ReactNode;
}) => {
  return (
    <li
      onClick={() => onClick()}
      className="bg-white my-8 p-4 rounded-lg transition hover:scale-[1.01] cursor-pointer"
    >
      {text}
    </li>
  );
};
