import React from "react";
import Modal from "./Modal";
import Option from "./Option";
type Props = {
    title: string;
    state: boolean;
    close: () => void;
    options: {
        onClick: () => void;
        title: string;
    }[];
};
export default function ModalOptions({ title, state, close, options }: Props) {
    return (
        <Modal state={state} close={close}>
            <div className="p-4  min-w-[300px]">
                <h4 className="text-center text-2xl mb-4">{title}</h4>
                <ul className="text-xl text-center">
                    {options.map((option, i) => (
                        <Option key={i} onClick={option.onClick} title={option.title} />
                    ))}
                </ul>
            </div>
        </Modal>
    );
}
