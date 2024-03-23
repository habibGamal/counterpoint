import React from "react";
import Container from "../compontents/Container";
import AvatarTitle from "../compontents/AvatarTitle";
import CardList from "../compontents/CardList";
import Card from "../compontents/Card";
import IllustrationWithSound from "../compontents/IllustrationWithSound";
import PageTitle from "../compontents/PageTitle";

const audio = new Audio();
export default function Rules() {
    const [activeAudio, setActiveAudio] = React.useState(0);
    const play = (src: string, index: number) => {
        if (activeAudio === index) {
            if (audio.paused) audio.play();
            else audio.pause();
            return;
        }
        audio.src = src;
        audio.play();
        setActiveAudio(index);
        console.log(index);
    };
    const settingAudio = (index: number) => {
        // console.log(activeAudio, index);
        return activeAudio === index ? audio : undefined;
    };
    return (
        <div className="w-full ">
            <PageTitle
                title="قواعد الكنتربوينت"
                subTitle="قواعد الكنتربوينت التي يجب معرفتها اولا"
                iconSrc="icons/ruler&pen.svg"
            />
            <Container>
                <AvatarTitle
                    title="المقامات التي بنيت عليها قواعد وشروط الكتابة الكنتربوينت"
                    avatar="illustrations/rules1.png"
                />
                <Card>
                    وهي المقامات الكنسية أو الجريجورية التي كانت مستخدمة في ذلك الوقت لبناء الألحان الغنائية وهي :
                </Card>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <IllustrationWithSound
                        src="notes/image001.png"
                        desc="مقام دوريان Dorian ويبدأ من درجة (رى) "
                        audio={settingAudio(1)}
                        onClick={() => play("/staves/Dorian.mpeg", 1)}
                    />
                    <IllustrationWithSound
                        src="notes/image003.png"
                        desc="مقام فريجيان Phrygian ويبدأ من درجة (مي) "
                        audio={settingAudio(2)}
                        onClick={() => play("/staves/Phrygian.mpeg", 2)}
                    />
                    <IllustrationWithSound
                        src="notes/image005.png"
                        desc="مقام ليديان Lydian ويبدأ من درجة (فا) "
                        audio={settingAudio(3)}
                        onClick={() => play("/staves/Lydian.mpeg", 3)}
                    />
                    <IllustrationWithSound
                        src="notes/image007.png"
                        desc="مقام مكسوليديان Mixolydian ويبدأ من درجة (صول) "
                        audio={settingAudio(4)}
                        onClick={() => play("/staves/Mixolydian.mpeg", 4)}
                    />
                </div>
                <Card>
                    هذه المقامات الأربع كانت المقامات الأصلية التي انتقاها (امبروز) أحد أساقفة ميلانو في القرن الرابع
                    الميلادي تقريباً، وظلت الموسيقى الأوربية سواء الدينية أو الدنيوية تبنى على هذه المقامات الأربع التي
                    عرفت بالمقامات الأصلية حتى القرن السادس عشر تقريبا الى أن أضاف (القس جلارينوس) في منتصف القرن السادس
                    عشر الميلادي مقامين هما :
                </Card>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <IllustrationWithSound
                        src="notes/image009.png"
                        desc="مقام الأيوليان Aeolian ويبدأ من درجة (لا) "
                        audio={settingAudio(5)}
                        onClick={() => play("/staves/Aeolian.mpeg", 5)}
                    />
                    <IllustrationWithSound
                        src="notes/image011.png"
                        desc="مقام الأيونيان Ionian ويبدأ من درجة (دو) "
                        audio={settingAudio(6)}
                        onClick={() => play("/staves/Ionian.mpeg", 6)}
                    />
                </div>
                <Card>
                    ويوجد مقام يبدأ من نغمة سي ويسمى (لوكريان) ولكن الكثير من الكتب لا تتطرق لهذا المقام لانهم يعتبرونه
                    عديم الفائدة ويرجع السبب في ذلك هو وجود مسافة خامسة ناقصة بين الدرجة الأولى للسلم والدرجة الخامسة
                    للسلم لهذا السبب يعتبر غير مجدي.
                </Card>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <IllustrationWithSound
                        src="notes/locrian.jpg"
                        desc="مقام اللوكريان"
                        audio={settingAudio(7)}
                        onClick={() => play("/staves/Locian.mp3", 7)}
                    />
                </div>
            </Container>
        </div>
    );
}
7;
