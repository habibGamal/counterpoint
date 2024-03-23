import React from "react";
import {  useAppSelector } from "../hooks";
import BackArrow from "./BackArrow";
export default function PageTitle({ title, subTitle, iconSrc }: { title: string; subTitle: string; iconSrc: string }) {
    const { routeStack } = useAppSelector((state) => state.routerSlice);
    return (
        <div className="bg-[#DBF8FD] p-8 flex justify-between pr-20 sticky top-0 z-20">
            <div className="shrink-0">
                <div className="flex gap-2 text-2xl text-sky-900">
                    <img className="w-8  icon-indigoo" src={iconSrc} />
                    <h1 className="font-medium">{title}</h1>
                </div>
                <span className="block mt-1 text-sky-700 font-medium">{subTitle}</span>
            </div>
            {routeStack.length > 1 && (
                <BackArrow />
            )}
        </div>
    );
}
