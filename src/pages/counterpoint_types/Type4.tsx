import React from "react";
import Container from "../../compontents/Container";
import PageTitle from "../../compontents/PageTitle";
import AvatarTitle from "../../compontents/AvatarTitle";
import CardList from "../../compontents/CardList";
import Card from "../../compontents/Card";
import Illustration from "../../compontents/Illustration";
import IllustrationWithSound from "../../compontents/IllustrationWithSound";

export default function Type4() {
    const audio = new Audio("/staves/type4.mp3");
    const toggle = () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    };
    return (
        <div className="w-full">
            <PageTitle title="انواع الكنتربوينت" subTitle="النوع الرابع (السنكوب)" iconSrc="icons/shapes.svg" />
            <Container>
                <AvatarTitle title="النوع الرابع (السنكوب)" avatar="illustrations/rules1.png" />
                <Card>
                    نغمة مقابل نغمتين وبناء هذا النوع مثل بناء النوع الثاني على نغمة اللحن الأساسي C.F تقابلها نغمتين من
                    لحن C.P ولكن باستخدام الرباط الزمني حيث تقع نغمة لحن C.P نصفها الأول على الضغط الضعيف المقابل لنغمة
                    اللحن الأساسي C.F، والنصف الأخر على الضغط القوى مقابل النغمة التالية في اللحن الأساسي C.F، وهذا ما
                    يسمى الضغط المؤخر Syncopation، وعندما تكون النغمة المربوطة متنافرة لابد أن تهبط درجة إلى أسفل وإذا
                    كانت متوافقة فيتحرك لحن C.P بحرية إلى نغمة متوافقة مع نغمة اللحن الأساسي C.F{" "}
                </Card>
                <div className="grid grid-cols-2 gap-x-8">
                    <CardList
                        list={[
                            "البداية تكون سكتة بلانش، ثم نغمة بلانش مربوطة مع المازورة التي تليها ويجب أن تكون متوافقة.",
                            "المازورة الأخيرة يجب أن تكون روند مقابل روند ويسبقها نغمة بلانش غير مربوطة.",
                            "نغمة البلانش الأولى في كل مازورة يمكن أن تكون على شكلين:",
                            "  تكون النغمة متوافقة وتكون لها حرية الحركة.",
                        ]}
                    />
                    <CardList
                        list={[
                            " تكون النغمة متنافرة وبالتالي تهبط مسافة 2 لأسفل.",
                            "يمنع استخدام مسافة الخامسة والأكتاف على البلانش الثاني ومسموحة فقط على البلانش الأول.",
                            "هناك بعض الاستثناءات يمكن إتباعها فيجوز في بعض الحالات كسر الرباط لمرة واحدة فقط في التمرين فيمكن استعمال نغمتا بلانش مختلفتا وبدون ربط على أن تكونا نغمات متوافقة، ويتضح ذلك في الشكل التالي:",
                        ]}
                    />
                    <IllustrationWithSound
                        src="notes/type4.png"
                        audio={audio}
                        onClick={toggle}
                        desc="مثال يوضح النوع الرابع"
                    />
                </div>
            </Container>
        </div>
    );
}
