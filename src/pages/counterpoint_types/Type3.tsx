import React from "react";
import Container from "../../compontents/Container";
import PageTitle from "../../compontents/PageTitle";
import AvatarTitle from "../../compontents/AvatarTitle";
import CardList from "../../compontents/CardList";
import Card from "../../compontents/Card";
import Illustration from "../../compontents/Illustration";
import IllustrationWithSound from "../../compontents/IllustrationWithSound";

export default function Type3() {
    const audio = new Audio("/staves/type3.mp3");
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
                subTitle="النوع الثالث (نغمة مقابل 4 نغمات)"
                iconSrc="icons/shapes.svg"
            />
            <Container>
                <AvatarTitle title="النوع الثالث (نغمة مقابل 4 نغمات)" avatar="illustrations/rules1.png" />
                <Card>
                    يكون اللحن الأساسي C.F نغمة يقابلها أربع نغمات، والنغمة الواحدة تمثل ربع القيمة الزمنية للنغمة التي
                    في لحن C.F، وعلى سبيل المثال (روند في لحن C.F يقابلها (4) نوار في لحن C.P أو بلانش يقابلها (4) كروش)
                </Card>
                <div className="grid grid-cols-2 gap-x-8">
                    <Card>
                        فينتج عن ذلك وجود أربع ضغوط إيقاعية، الضغط الأول لابد أن يكون متوافق Consonances أما الضغط
                        الثاني فيكون أما متوافق فيكون له حرية الحركة أو متنافر وإذا جاء متنافرا Dissonances فيكون في شكل
                        مرور Passing note أو تغيير Changing not ، والضغط الثالث لابد أن يكون متوافقاً، أما الضغط الرابع
                        فإما يكون متوافقاً فيكون له حرية الحركة أو يكون متنافراً يكون في شكل مرور Passing note بين
                        النغمة التي قبله والتي تليه مقابل لحن C.F
                    </Card>
                    <CardList
                        list={[
                            " تبدأ المازورة الأولى سكتة نوار ثم ثلاثة نوار مقابل روند.",
                            "النوار الأول في المأزورة الأولى يجب أن تكون أساس المقام أو خامستة أو أويونسون اذا كان أعلى اللحن الأساسي، أما اذا كان أسفله فيكون أساس المقام أو ينسون.",
                            "النوار الأول في كل مازوره يجب أن يكون متوافق.",
                            "النوار الثاني أما يكون متوافق فتكون له حرية الحركة، أو متنافر فيأخذ شكل مرور أو تغيير.",
                            "النوار الثالث في كل مازورة يجب أن يكون متوافق",
                        ]}
                    />
                    <CardList
                        list={[
                            "النوار الرابع أما يكون متوافق فنكون له حرية الحركة أو متنافر فيأخذ شكل مرور.",
                            "يمكن أسخدام نوته الكامبياتا C.N وهي أن ياتى النوار الأول متوافق والنوار الثانى متنافر بقفزة في نفس الاتجاه ويذهب الى النوار الثالث ويكون متوافق ثم ياتى النوار الرابع بحركة عكسية. ",
                            "المازورة الأخيرة يجب أن تكون روند مقابل روند على أن تكون نفس النغمة أو أوكتاف. ",
                        ]}
                    />
                    <CardList
                        list={[
                            "يجب أن يفرق بين الأوكتافين أو الخامسات على الأقل 4 نوار، ما إذا كانت الخامسات فقط ناتجة عن نوتة مرورية أو تغيير يمكن أن يفرق بينهما نوار واحد أو اثنين أو ثلاثة.",
                            "ويتضح ذلك في الشكل التالي:",
                        ]}
                    />
                    <IllustrationWithSound
                        src="notes/type3.png"
                        audio={audio}
                        onClick={toggle}
                        desc="مثال يوضح النوع الثالث"
                    />
                </div>
            </Container>
        </div>
    );
}
