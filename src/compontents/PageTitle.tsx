import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks";
import { routerSlice } from "../slices/routerSlice";
export default function PageTitle({
  title,
  subTitle,
  iconSrc,
}: {
  title: string;
  subTitle: string;
  iconSrc: string;
}) {
  const { routeStack } = useAppSelector((state) => state.routerSlice);
  const dispatch = useAppDispatch();
  return (
    <div className="bg-[#DBF8FD] p-8 flex justify-between pr-20">
      <div className="shrink-0">
        <div className="flex gap-2 text-2xl text-sky-900">
          <img className="w-8  icon-indigoo" src={iconSrc} />
          <h1 className="font-medium">{title}</h1>
        </div>
        <span className="block mt-1 text-sky-700 font-medium">{subTitle}</span>
      </div>
      {routeStack.length > 1 && (
        <ArrowLeftOutlined
          onClick={() => dispatch(routerSlice.actions.pop())}
          className="text-3xl text-[#0E3069] cursor-pointer transition hover:scale-110"
        />
      )}
    </div>
  );
}
