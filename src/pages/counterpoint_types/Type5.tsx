import React from "react";
import Container from "../../compontents/Container";
import PageTitle from "../../compontents/PageTitle";
import AvatarTitle from "../../compontents/AvatarTitle";
import CardList from "../../compontents/CardList";
import Card from "../../compontents/Card";
import Illustration from "../../compontents/Illustration";
import IllustrationWithSound from "../../compontents/IllustrationWithSound";

export default function Type5() {
    const audio = new Audio("/staves/type5.mp3");
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
                subTitle="النوع الخامس (الكنتربوينت المزخرف)"
                iconSrc="icons/shapes.svg"
            />
            <Container>
                <AvatarTitle title="النوع الخامس (الكنتربوينت المزخرف)" avatar="illustrations/rules1.png" />
                <Card>
                    هذا النوع هو خليط من الأنواع الأربعة فهو نغمة مقابل مجموعة نغمات تختلف في أشكالها الإيقاعية ولكن
                    تتمثل في مجموعها زمن نغمة اللحن الأساسي C.F، بالإضافة إلى استخدام العلامات الزمنية المنقوطة والوحدات
                    الأصغر زمناً، ولكن رغم تلك الاضافات
                </Card>
                <div className="grid grid-cols-2 gap-x-8">
                    <CardList
                        list={[
                            "عند استخدام الرباط الزمني بالتأخر، لابد أن يكون زمن النغمة المربوطة على الضغط القوى أكبر من زمن النغمة التي ربطت منها على الضغط الضعيف أو متساوية معها في الزمن.",
                            "عند استخدام الأشكال الأصغر زمنا يجب أن تكون على الضغط الضعيف وتكون في شكل مروري Passing note أو تغيير Changing note.",
                            "يفضل استخدام العلامات المنقوطة على ضغط قوى حتى يعطى نوع من أنواع تأخير الضغط الضعيف وهذا ما يعطى اللحن الأفقي ثراءً إيقاعياً ونغمياً.",
                            " يستعمل الكروش مزدوج وليس بشكل منفرد، حيث يكون بمثابة نوار ويستعمل في الضغط الثاني أو الرابع في المازورة.",
                        ]}
                    />
                    <CardList
                        list={[
                            " يجب استعمال في هذا النوع وفي كل مازورة نوع خاص أو إيقاع مختلف، فعلى سبيل المثال عند استعمال مازورة تحوي على اثنين من البلانشات فبالتالي لا يجوز استعمالها مرة ثانية في مازورة أخرى، على أن يتم المحافظة على إتباع القوانين الخاصة بكل نوع.",
                            " تخضع الكروشات لقوانين النوع الثالث والثاني والرابع أي يأتي الكروش الأول بصورتين هما:",
                            " نوتة متوافقة فتكون لها حرية الحركة أو يونيسون.",
                            "نوتة متنافرة فلابد أن تأتي في صورة مرورية.",
                            " الحركة بين الكروشين يجب أن تكون متصلة بدون قفزات، ويتضح ذلك في الشكل التالي:",
                        ]}
                    />
                    <IllustrationWithSound
                        src="notes/type5.png"
                        audio={audio}
                        onClick={toggle}
                        desc="مثال يوضح النوع الخامس"
                    />
                </div>
            </Container>
        </div>
    );
}
