import React from "react";

export default function ({ title, onClick }: { title: string; onClick: () => void }) {
    return (
        <li
            onClick={onClick}
            className="p-2 my-2 border rounded hover:bg-sky-900 hover:text-gray-100 cursor-pointer active:scale-95 transition-transform"
        >
            {title}
        </li>
    );
}
