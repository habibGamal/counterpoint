import React from "react";
import Container from "../compontents/Container";
import PageTitle from "../compontents/PageTitle";
import AvatarTitle from "../compontents/AvatarTitle";
import CardList from "../compontents/CardList";
import Card from "../compontents/Card";
import Illustration from "../compontents/Illustration";

export default function ProgramKeys() {
    return (
        <div className="w-full">
            <PageTitle title="مفاتيح استخدام البرنامج" subTitle="دليلك لأستخدام البرنامج" iconSrc="icons/keyboard-open.svg" />
            <Container>
                <AvatarTitle title="مفاتيح استخدام برنامج County Voice" avatar="illustrations/rules1.png" />
                <Card>
                    "County Voice" هو برنامج الكتروني لتعلم قواعد الكنتربوينت المقيد (صوت من صوت) يمتاز بسهولة الوصول
                    الى القواعد النظرية والنماذج الاسترشادية المحلولة، حيث يمكن للطلاب المتخصصين الاطلاع على هذه النماذج
                    وحل العديد من التمارين، فالبرنامج يحتوي على مزايا عديدة، أبرزها
                </Card>
                <div className="grid grid-cols-2 gap-x-8">
                    <CardList
                        list={[
                            "يحتوي البرنامج على قواعد اللحن الافقي C.F",
                            "يحتوي البرنامج على قواعد الكنتربوينت المقيد بأنواعه الخمس.",
                            "يحتوي على العديد من التمارين المحلولة على المقامات الكنائسية المختلفة وعلى مفاتيح موسيقية مختلفة.",
                            "يحتوى على مجموعة من التمارين الغير محققه لمساعدة الطلاب فى التدريب على إتقان استخدام قواعد الكنتربوينت المقيد من صوتين",
                        ]}
                    />
                    <CardList
                        list={[
                            "يحتوي على صفحة انشاء مقطوعة ليتكمن من كتابة خطي الكانتوس فيرموس والكنتربوينت بكل أرياحية ويسر.",
                            "يحتوي على مجموعة من الأسئلة النظرية في قواعد اللحن الافقي C.F وقواعد الكنتربوينت المقيد بأنواعه الخمس.",
                        ]}
                    />
                </div>
                <AvatarTitle title="اختصارات برنامج County Voice" avatar="illustrations/rules1.png" />
                <div className="grid grid-cols-2 gap-x-8">
                    <CardList
                        list={[
                            "رجوع = Ctrl+Z",
                            "Redo = Ctrl+Y  ",
                            "سكتة = Numpad 0 ",
                            "علامة الروند = Numpad 1",
                            "علامة البلانش = Numpad 2 ",
                            "علامة النوار = Numpad 4",
                            "علامة الكروش = Numpad 8 ",
                            "علامة الدبل كروش = Numpad 6 ",
                        ]}
                    />
                    <CardList
                        list={[
                            "نغمة دو = C",
                            "نغمة ري = D ",
                            "نغمة مي= E",
                            "نغمة فا = F",
                            "نغمة صول = G",
                            "نغمة لا = A",
                            "نغمة سي = B",
                            "إضافة نص فوق النغمة = Alt+T",
                            "تشغيل صوت = space",
                        ]}
                    />
                    <CardList
                        list={[
                            "سكتة = Delete ",
                            "التحرك نغمة لليسار = Left Arrow ",
                            "التحرك نغمة لليمين = Right Arrow ",
                            "التحرك نغمة لأعلى = Up Arrow ",
                            "التحرك نغمة لأسفل = Down Arrow",
                            "التحرك نغمة اوكتاف للأعلى = Shift + Up Arrow ",
                            "التحرك نغمة اوكتاف للأسفل = Shift + Down Arrow",
                        ]}
                    />
                    <CardList
                        list={[
                            "مسح مازوره = Ctrl+Delete ",
                            "إضافة مازوره = Ctrl+B",
                            "نسخ مازوره = Alt+C",
                            "لصق مازوره = Alt+V ",
                            "لتحديد أكثر من مازوره = الضغط على Shift والاستمرار على الضغط أثناء التحديد",
                            "علامة الخفض = -",
                            "علامة الرفع= +",
                        ]}
                    />
                </div>
                <AvatarTitle title="الملاحظات التي تظهر في ايقونة اختبر نفسك" avatar="illustrations/rules1.png" />

                <div className="grid grid-cols-2 gap-x-8">
                    <Illustration
                        src="illustrations/warning1.png"
                        desc="أذا ظهر علم أحمر فهذا يدل على خط في قواعد الكنتربوينت أو يدل على وجود توازى راسى"
                    />
                    <Illustration
                        src="illustrations/warning2.png"
                        desc="اذا ظهر قوس احمر فهذا يدل على مسافة صوتية غير مسموحة"
                    />
                    <Illustration
                        src="illustrations/warning3.png"
                        desc="اذا ظهر خطي بالوان الاحمر احدهم في خط الكانتوس فيرموس والأخر في خط الكنتربوينت فهذا يدل على وجود توازى افقي أو وجود سكيونس"
                    />
                </div>
            </Container>
        </div>
    );
}
