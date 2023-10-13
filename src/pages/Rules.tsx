import React from "react";
import Container from "../compontents/Container";
import AvatarTitle from "../compontents/AvatarTitle";
import CardList from "../compontents/CardList";
import Card from "../compontents/Card";
import IllustrationWithSound from "../compontents/IllustrationWithSound";
import PageTitle from "../compontents/PageTitle";

export default function Rules() {
    var audio = new Audio("staves/aeolian.mpeg");
    // audio.currentTime
    return (
        <div className="w-full ">
            <PageTitle
                title="قواعد الكنتربوينت"
                subTitle="قواعد الكنتربوينت التي يجب معرفتها اولا"
                iconSrc="icons/ruler&pen.svg"
            />
            <Container>
                <AvatarTitle
                    title="قواعد اللحن الأساسي C.F أو لحن الكنتربوينت C.P الافقي"
                    avatar="illustrations/rules1.png"
                />
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <CardList
                        list={[
                            " البداية والنهاية: يجب أن تكون البداية إما على Unison أو الأكتاف Octave، أو الخامسة.",

                            "عدم استعمال Unison ماعدا في البداية أو النهاية.",

                            "تجنّب موازاة الخامسات أو Octaves بين أيّ جزأين (Parallel fifths or Octaves)؛ وتجنّب الخامسات المتوازية المخفية أو Octaves. ",

                            "تجنّب التحرّك بالتوازي ألرابعة (Parallel fourths). ",
                        ]}
                    />
                    <CardList
                        list={[
                            "تفاد المسافات المتنافرة بين أيّ جزأين: الثانية الكبيرة أو الثانية الصغيرة، السابعة الكبيرة والصغيرة، وأيّ مسافة زائدة أو ناقصة، والرابعة التامة.",
                            "تجنب استخدام مسافة السابعة أو التاسعة سواء داخلها نغمة أو قفزة في نفس الاتجاه صعودا أو هبوطاً. ",

                            "يجب ألا تتحرك النغمات في اتجاه واحد لأكثر من ثمانية أو تسع متتالية. ",

                            "يجب ألا تتحرك النغمات بعد القفزة في نفس الاتجاه إلا إذا كانت الحركة خطوة واحدة (في قفزة الثالثة والرابعة التامة والخامسة التامة فقط).",
                        ]}
                    />

                    <CardList
                        list={[
                            "تجنب استخدام قفزة السادسة الكبيرة، ويمكن استخدام قفزة السادسة الصغيرة الصاعدة فقط ويفضل أن تهبط ثانية مباشرة.",

                            " تجنب استخدام التآلفات المفككة Broken Chords وذلك لأنها تعطى إحساس بالطابع الهارموني وبالتالي في اللحن الكونترابنطي بالمصاحبة الهارمونية. ",
                            " تجنب تكرار التتابعات اللحنية Sequential Repetition على بعد مسافة ثانية أو ثالثة أو رابعة سواء صعوداً أو هبوطاً. ",
                        ]}
                    />

                    <CardList
                        list={[
                            "استخدام قفزة الأكتاف في حالات ملحة وضرورية منها :",
                            "إذا تجاوز أو تخطى اللحن نطاقه الصوتي.",
                            "إذا ضاقت المسافة الرأسية بين اللحنين (النغمتين المتقابلتين).",
                            "إذا اتسعت المسافة الرأسية بين اللحنين (النغمتين المتقابلتين). وفى جميع الحالات لا يسمح بالقفزة لأكثر من مسافة اكتاف.",
                            "يمكن استخدام قفزتان متتاليتان في اتجاه واحد أو أن القفزة الثانية تكون عكس الاتجاه لمسافتي الرابعة والخامسة فقط.",
                            "عند استخدام قفزة الأكتاف يفضل أن يليها حركة سلمية عكس الاتجاه وفى جميع الأحوال لا تزيد القفزة عن قفزة الثالثة عكس اتجاه قفزة الأكتاف. ",
                        ]}
                    />
                    <CardList
                        list={[
                            "ولابد من مراعاة الآتي :",
                            "تجنب تعاقب مسافة الاكتاف مباشرة نفس المسافة في شكل متوازي، وكذلك مسافة الخامسة.",
                            " مسموح باستخدام مسافة الثالثة أو السادسة المتوازية ولكن يفضل استخدام الحركة المماثلة لفترة طويلة وأيضا لا يسمح بتوازي أكثر من ثلاث مرات متعاقبة سواء لمسافة الثالثة أو السادسة.",
                            " الحركة العكسية وهي أفضل الحركات اللحنية بين الصوتين وفيها صوت يتحرك إلى أعلى والصوت المقابل يتحرك إلى أسفل.",
                            " الحركة المماثلة وهي تحريك أحد الأصوات بينما الصوت الآخر ثابت.",
                            " لا يسمح بتخطي نطاق الصوت الأخر فالصوت الأعلى لا يتخطى الصوت الأسفل والعكس",
                        ]}
                    />
                </div>
                <AvatarTitle
                    title="المقامات التي بنيت عليها قواعد وشروط الكتابة الكنتربوينت"
                    avatar="illustrations/rules2.png"
                />
                <Card>
                    وهي المقامات الكنسية أو الجريجورية التي كانت مستخدمة في ذلك
                    الوقت لبناء الألحان الغنائية وهي :
                </Card>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <IllustrationWithSound
                        src="notes/image001.png"
                        desc="مقام دوريان Dorian ويبدأ من درجة (رى) "
                        audio={(new Audio("/staves/Dorian.mpeg"))}
                    />
                    <IllustrationWithSound
                        src="notes/image003.png"
                        desc="مقام فريجيان Phrygian ويبدأ من درجة (مي) "
                        audio={(new Audio("/staves/Phrygian.mpeg"))}
                    />
                    <IllustrationWithSound
                        src="notes/image005.png"
                        desc="مقام ليديان Lydian ويبدأ من درجة (فا) "
                        audio={(new Audio("/staves/Lydian.mpeg"))}
                    />
                    <IllustrationWithSound
                        src="notes/image007.png"
                        desc="مقام مكسوليديان Mixolydian ويبدأ من درجة (صول) "
                        audio={(new Audio("/staves/Mixolydian.mpeg"))}
                    />
                </div>
                <Card>
                    هذه المقامات الأربع كانت المقامات الأصلية التي انتقاها
                    (امبروز) أحد أساقفة ميلانو في القرن الرابع الميلادي تقريباً،
                    وظلت الموسيقى الأوربية سواء الدينية أو الدنيوية تبنى على هذه
                    المقامات الأربع التي عرفت بالمقامات الأصلية حتى القرن السادس
                    عشر تقريبا الى أن أضاف (القس جلارينوس) في منتصف القرن السادس
                    عشر الميلادي مقامين هما :
                </Card>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <IllustrationWithSound
                        src="notes/image009.png"
                        desc="مقام الأيوليان Aeolian ويبدأ من درجة (لا) "
                        audio={(new Audio("/staves/Aeolian.mpeg"))}
                    />
                    <IllustrationWithSound
                        src="notes/image011.png"
                        desc="مقام الأيونيان Ionian ويبدأ من درجة (دو) "
                        audio={(new Audio("/staves/Ionian.mpeg"))}
                    />
                </div>
            </Container>
        </div>
    );
}
