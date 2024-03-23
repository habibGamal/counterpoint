import { ArrowLeft2 } from "iconsax-react";
import React from "react";
import { routerSlice } from "../slices/routerSlice";
import { useAppDispatch } from "../hooks";

export default function BackArrow() {
    const dispatch = useAppDispatch();
    const audio = new Audio("/click_sound.wav");
    const onClick = () => {
        dispatch(routerSlice.actions.pop());
        audio.play();
    };
    return (
        <div className="absolute p-2 bg-white rounded-full left-8 top-8 transition hover:scale-110">
            <ArrowLeft2 className="text-3xl cursor-pointer" size="32" color="#000" onClick={onClick} />
        </div>
    );
}
