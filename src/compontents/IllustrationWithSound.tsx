import { PauseCircle, PlayCircle } from "iconsax-react";
import { useEffect, useState } from "react";
const IllustrationWithSound = ({
    src,
    desc,
    audio,
    onClick,
}: {
    src: string;
    desc: string;
    audio?: HTMLAudioElement;
    onClick: () => void;
}) => {
    // const toggle = () => {
    //     if (audio.paused) {
    //         audio.play();
    //     } else {
    //         audio.pause();
    //     }
    // };
    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
        if (audio == undefined) return;
        const e = () => {
            setCurrentTime(audio.currentTime);
        };
        audio.addEventListener("timeupdate", e);
        return () => {
            audio.removeEventListener("timeupdate", e);
            // audio.pause();
        };
    }, [audio]);

    return (
        <div className="relative rounded-xl my-4 text-xl shadow-lg bg-[#DBF8FD] border border-sky-900 text-sky-900 font-medium overflow-hidden">
            <img className="w-full  border-b-2 border-sky-900" src={src} />
            <div
                className="bg-sky-900 h-1 w-0 float-left transition-[width]"
                style={
                    audio?.duration !== undefined
                        ? {
                              width: `${(currentTime / audio?.duration) * 100}%`,
                          }
                        : {}
                }
            ></div>
            <div className="clear-left"></div>
            <p className="p-4 flex items-center gap-4">
                <div
                    onClick={onClick}
                    className="hover:scale-105 transition top-4 right-4 text-4xl text-white  bg-sky-900 p-1 rounded-full  cursor-pointer"
                >
                    {audio == undefined || audio.paused ? (
                        <PlayCircle size="32" color="#fff" />
                    ) : (
                        <PauseCircle size="32" color="#fff" />
                    )}
                </div>
                {desc}
            </p>
        </div>
    );
};

export default IllustrationWithSound;
