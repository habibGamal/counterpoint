import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
const IllustrationWithSound = ({
    src,
    desc,
    audio,
}: {
    src: string;
    desc: string;
    audio: HTMLAudioElement;
}) => {
    const toggle = () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    };
    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
        const e = () => {
            setCurrentTime(audio.currentTime);
        };
        audio.addEventListener("timeupdate", e);
        return () => {
            audio.removeEventListener("timeupdate", e);
            audio.pause();
        };
    }, []);
    
    return (
        <div className="relative rounded-xl my-4 text-xl shadow-lg bg-[#DBF8FD] border border-sky-900 text-sky-900 font-medium overflow-hidden">
            <img className="w-full  border-b-2 border-sky-900" src={src} />
            <div
                className="bg-sky-900 h-1 w-0 transition-[width]"
                style={{
                    width: `${(currentTime / 16) * 100}%`,
                }}
            ></div>
            <p className="p-4 flex items-center gap-4">
                <div
                    onClick={toggle}
                    className="hover:scale-105 transition top-4 right-4 text-4xl text-white  bg-sky-900 p-1 rounded-full  cursor-pointer"
                >
                    {audio.paused ? (
                        <PlayCircleOutlined />
                    ) : (
                        <PauseCircleOutlined />
                    )}
                </div>
                {desc}
            </p>
        </div>
    );
};

export default IllustrationWithSound;
