import { ArrowLeft2 } from "iconsax-react";
import React from "react";
import { routerSlice } from "../slices/routerSlice";
import { useAppDispatch } from "../hooks";

export default function BackArrow() {
    const dispatch = useAppDispatch();
    return (
        <ArrowLeft2
            className="absolute left-8 top-8 text-3xl text-white cursor-pointer transition hover:scale-110"
            size="32"
            color="#000"
            onClick={() => dispatch(routerSlice.actions.pop())}
        />
    );
}
