import React from "react";
import Container from "../../compontents/Container";
import PageTitle from "../../compontents/PageTitle";
import AvatarTitle from "../../compontents/AvatarTitle";
import CardList from "../../compontents/CardList";
import Card from "../../compontents/Card";
import Illustration from "../../compontents/Illustration";
import IllustrationWithSound from "../../compontents/IllustrationWithSound";

export default function Type2() {
    const audio = new Audio("/staves/type2.mp3");
    const toggle = () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    };
    return (
        <div className="w-full">
            <PageTitle
                title="انواع الكنتربوينت"
                subTitle="النوع الثاني (نغمة مقابل نغمتين)"
                iconSrc="icons/shapes.svg"
            />
            <Container>
                <AvatarTitle title="النوع الثاني (نغمة مقابل نغمتين)" avatar="illustrations/rules1.png" />
                <Card>
                    فيكون اللحن الأساسي C.F عبارة عن نغمة ويقابلها في لحن C.P نغمتين والنغمة الواحدة نصف القيمة الزمنية
                    للنغمة التي في لحن C.F، وفى هذه الحالة يصبح لحن C.P يحتوي على ضغطين، الضغط الأول يجب أن يكون
                    متوافقاً مع نغمة لحن C.F، أما الضغط الثاني إما أن يكون متوافقاً فيكون له حرية الحركة أو متنافراً،
                    وعندما يكون متنافراً لابد أن يكون في شكل مرور Passing note ما بين النغمة التي قبله والنغمة التي تليه
                    مقابل لحن C.F، هناك بعض القواعد في الكنتربوينت للنوع الثاني وهي كالتالي:{" "}
                </Card>
                <div className="grid grid-cols-2 gap-x-8">
                    <CardList
                        list={[
                            "في المأزورة الأولى يجب أن يبدأ بسكتة قيمتها بلانش والضغط الثاني فيها يجب ان يكون متوافق.",
                            "يجب أن ينتهي التمرين باستعمال شكل الروند مقابل روند وليس بلانش.",
                            "باقي التمرين يجب أن يكون الضغط الأول من البلانش متوافقاً ويبني على أساس (3، 6، 5، 8). ",
                        ]}
                    />
                    <CardList
                        list={[
                            "البلانش الثاني من كل مازورة يمكن أن يكون على طريقتين هما:",
                            "  اما ان يكون متوافقاً فتكون له حرية الحركة.",
                            "اما ان يكون متنافراً فياخد شكل مرور (Passing Note) على أن تكون متصلة بنغمتين مختلفتين ما قبلها وما بعدها. ويتضح ذلك في الشكل التالي: ",
                        ]}
                    />
                    <IllustrationWithSound
                        src="notes/type2.png"
                        audio={audio}
                        onClick={toggle}
                        desc="مثال يوضح النوع الثاني"
                    />
                </div>
            </Container>
        </div>
    );
}
