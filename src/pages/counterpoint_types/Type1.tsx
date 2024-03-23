import React from "react";
import Container from "../../compontents/Container";
import PageTitle from "../../compontents/PageTitle";
import AvatarTitle from "../../compontents/AvatarTitle";
import CardList from "../../compontents/CardList";
import Card from "../../compontents/Card";
import Illustration from "../../compontents/Illustration";
import IllustrationWithSound from "../../compontents/IllustrationWithSound";

export default function Type1() {
    const audio = new Audio("/staves/type1.mp3");
    const toggle = () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    };
    return (
        <div className="w-full">
            <PageTitle title="انواع الكنتربوينت" subTitle="النوع الأول (روند مقابل روند)" iconSrc="icons/shapes.svg" />
            <Container>
                <AvatarTitle title="النوع الأول (نغمة مقابل نغمة)" avatar="illustrations/rules1.png" />
                <Card>
                    يكون لحن الأساسيC.F عبارة عن نغمة مدونة بأي شكل إيقاعي (روند أو بلانش أو نوار .....) ويقابلها في لحن
                    C.P نفس الشكل الإيقاعي مع مراعاة القواعد السابقة في وضع لحن C.P من الناحية الأفقية والرأسية ، هناك
                    بعض القوانين الخاصة للنوع الأول ومنها:
                </Card>
                <div className="grid grid-cols-2 gap-x-8">
                    <CardList
                        list={[
                            "عدم استخدام نغمة الأساس (Unison) إلا في المأزورة الأولى والأخيرة.",
                            "يمكن استخدام الدرجة الخامسة أو الأوكتاف لمرة واحدة فقط داخل التمرين .",
                            "استخدام المسافات الثالثة والسادسة (3، 6) داخل التمرين.",
                        ]}
                    />
                    <CardList
                        list={[
                            "لا يجوز تكرار استخدام مسافة الثالثة أو السادسة أكثر من ثلاث مرات متتالية أو تكرار النغمات.",
                            "تحسب المسافات دائماً من الأسفل إلى الأعلى سواء كان اللحن المعطى في الأسفل أو الأعلى. ",
                        ]}
                    />
                    <IllustrationWithSound
                        src="notes/type1.png"
                        audio={audio}
                        onClick={toggle}
                        desc="مثال يوضح النوع الاول"
                    />
                </div>
            </Container>
        </div>
    );
}
