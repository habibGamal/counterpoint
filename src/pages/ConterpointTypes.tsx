import React from 'react'
import image1 from '../assets/notes/image013.png';
import image2 from '../assets/notes/image015.png';
import image3 from '../assets/notes/image017.jpg';
import image4 from '../assets/notes/image019.jpg';
import image5 from '../assets/notes/image021.jpg';
import musicIcon from '../assets/sol.png';
import { motion } from 'framer-motion';
import PageTitle from '../compontents/PageTitle';
import Illustration from '../compontents/Illustration';
import { faShapes } from '@fortawesome/free-solid-svg-icons';
import Section from '../compontents/Section';
import ListItems from '../compontents/ListItems';
import AnimatedP from '../compontents/AnimatedP';
import ListItem from '../compontents/ListItem';


export default function ConterpointTypes() {
    return (
        <div className='my-8'>
            <PageTitle title='انواع الكونتربوينت' icon={faShapes} />
            <Section title='النوع الأول (روند مقابل روند)' musicIcon={musicIcon}>
                <AnimatedP
                    text='وهو نغمة مقابل نغمة، حيث يكون لحن C.F عبارة عن نغمة مدونة بأي شكل إيقاعي (روند أو بلانش أو نوار .....) ويقابلها في لحن C.P نفس الشكل الإيقاعي مع مراعاة القواعد السابقة في وضع لحن C.P من الناحية الأفقية والرأسية، هناك بعض القوانين الخاصة للنوع الأول ومنها :'
                />
                <ul className='rules-ul'>
                    <ListItems
                        delay={.1}
                        textList={[
                            "عدم استعمال نغمة الأساس (Unison) إلا في المازورة الأولى والأخيرة.",
                            "يمكن استعمال الخامسة أو بدل منها الأكتاف لمرة واحدة فقط داخل التمرين وذلك لما يحدث من تناغماً فارغاً.",
                            "نستعمل داخل التمرين المسافات الثالثة والسادسة (3، 6)",
                            "لا يجوز تكرار استعمال الثالثة أو السادسة أكثر من ثلاث مرات متتالية أو تكرار النغمات.",
                        ]}
                    />
                </ul>
                <AnimatedP
                    delay={.3}
                    text='من الأسفل إلى الأعلى سواء كان اللحن المعطى في الأسفل أو الأعلى. في المثال رقم (1) وفي الجزأين، Cantus firmus الجزء السفلي.'
                />
                <AnimatedP
                    delay={.4}
                    text='تحسب المسافات دائماً من الأسفل إلى الأعلى سواء كان اللحن المعطى في الأسفل أو الأعلى. في المثال رقم (1) وفي الجزأين، Cantus firmus الجزء السفلي.'
                />
                <Illustration
                    description="مثال النوع الأول (روند مقابل روند)"
                    src={image1}
                />
            </Section>
            <Section title='النوع الثاني (روند مقابل 2 بلانش)' musicIcon={musicIcon}>
                <AnimatedP
                    text='وهو نغمة مقابل نغمتين، فيكون لحن C.F عبارة عن نغمة ويقابلها في لحن C.P نغمتين والنغمة الواحدة نصف القيمة الزمنية للنغمة التي في لحن C.F، وفى هذه الحالة  أصبح لحن C.P يحتوى على ضغطين، فالضغط الأول يجب أن يكون متوافقا مع نغمة لحن C.F، أما الضغط الثاني إما أن يكون متوافقاً أو متنافراً، وعندما يكون متنافرا لابد أن يكون في شكل مروري Passing note ما بين النغمة التي قبله والنغمة التي تليه مقابل لحن C.F.'
                />
                <AnimatedP
                    text='هناك اعتبارات إضافية في الكونترابنط للنوع الثاني وهي على النحو التّالي:'
                />
                <ul className='rules-ul'>
                    <ListItems
                        textList={[
                            "يجوز البدء بنصف سكتة في الصوت المضاف",
                            "يحذر استعمال الخامسة التامة أو الاكتاف، كجزء من الأنماط المتسلسلة والمتعاقبة(أي وسط التمرين).",
                            "في المازورة الأولى يجب أن يبدأ بسكتة قيمتها بلانش.",
                            "يجب أن ينتهي التمرين باستعمال شكل الروند مقابل روندوليس بلانش.",
                            "كل مازورة يجب أن تحتوي على تألف واحد فقط، وليس تالفين مختلفين.",
                            "المازورة الواحدة يجب أن يكون الضلع الأول من البلانش متناغماًConsonant ويبني على أساس (3، 6، 5، 8)",
                            "البلانش الثاني من كل مازورة يمكن أن يكون على طريقتين هما:",

                        ]}
                    />
                    <ol className="list-decimal mr-16">
                        <ListItems
                            textList={[
                                " يمكن أن تكون نغمة من داخل التآلف أو نغمة الأساس مع اللحن الثاني الذي يليه ويتم الوصول إليه بقفزة.",
                                "نغمة من خارج التآلف، وتستعمل كنغمة عابرة (Passing Note) على أن تكون متصلة بنغمتين مختلفتين ما قبلها وما بعدها، ويمكن أن تؤلف نغمة المرور بين كل أنواع المسافات(محمد الملاح - 2010- ص 27، 28)"

                            ]}
                        />
                    </ol>
                </ul>
                <Illustration
                    description="مثال النوع الثاني (روند مقابل 2 بلانش)"
                    src={image2}
                />
            </Section>
            <Section title='النوع الثالث (روند مقابل 4 نوار)' musicIcon={musicIcon}>
                <AnimatedP
                    text='وهو نغمة مقابل أربعة نغمات، فيكون لحن C.F نغمة يقابلها أربعة نغمات، والنغمة الواحدة تمثل ربع القيمة الزمنية للنغمة التي في لحن C.F، '
                />
                <AnimatedP
                    text='وعلى سبيل المثال (روند في لحن C.F يقابلها 4 نوار في لحن C.P   أو بلانش يقابلها 4 كروش)، فنتج عن ذلك وجود أربعة ضغوط إيقاعية ، فالضغط الأول لابد وان يكون متوافق Consonances أما الضغط الثاني فيكون أما متوافق أو متنافر وإذا جاء متنافرا Dissonances  فيكون في شكل مروري Passing note أو تغيير Changing not '
                />
                <AnimatedP
                    text='، والضغط الثالث لابد أن يكون متوافقاً، أما الضغط الرابع فإما يكون متوافقاً أو يكون متنافراً وإذا جاء متنافراً يكون في شكل مروري Passing note بين النغمة التي قبله والتي تليه مقابل لحن C.F '
                />
                <AnimatedP
                    text='وهناك اعتبارات يجب مراعاتها في النوع الثالث هي :'
                />
                <ul className='rules-ul'>
                    <ListItems
                        textList={[
                            'المازورة الأولى سكتة نوار ثم ثلاثة نوار، مقابل روند',
                            'النوار الأول في المازورة الأولى يجب أن تكون نفس النغمة أو خامسة أو اكتاف',
                            'النوار الأول في كل مازورة يجب أن يكون متوافق ما عدا اليونيسون',
                            'الثلاث نوارات الباقية ممكن أن تكون على شكلين',
                        ]}
                    />
                    <ol className="list-decimal mr-16">
                        <ListItems
                            textList={[
                                'نوتات من داخل التألف ونصل لهم بقفزات (اربيج) بشكل مفكك ويمكن استعمال يونيسون',
                                'أن تكون النوتة من خارج التألف مثل نغمات المرور',
                            ]}
                        />
                    </ol>
                    <ListItems
                        textList={[
                            'المازورة الأخيرة يجب أن تكون روند مقابل روند على أن تكون نفس النغمة أو أوكتاف',
                            'لا يجوز استعمال نفس النغمة فقط على الزمن القوي',
                            'الاكتافين أو الخامسات يجب أن يفرق بينهما على الأقل 4 نوار، ما إذا كانت الخامسات فقط ناتجة عن نوتة مرورية أو تغيير يمكن أن يفرق بينهما نوار واحد أو اثنين أو ثلاثة',
                            'لا يجوز استخدام السنكوب في القفلة أو المازورة التي قبل الأخيرة',
                        ]}
                    />
                </ul>
                <Illustration
                    description="مثال النوع الثالث (روند مقابل 4 نوار)"
                    src={image3}
                />
            </Section>

            <Section title='النوع الرابع (السنكوب)' musicIcon={musicIcon}>
                <AnimatedP
                    text='نغمة مقابل نغمتين، بناء هذا النوع مثل بناء النوع الثاني على نغمة من لحن C.F تقابلها نغمتين من لحن C.P ولكن باستخدام الرباط الزمني حيث تقع نغمة لحن C.P نصفها الأول على الضغط الضعيف المقابل لنغمة لحنC.F'
                />
                <AnimatedP
                    text='والنصف الأخر على الضغط الأول مقابل النغمة التالية في لحن C.F، وهذا ما يسمى الضغط المؤخر Syncopation، وعندما تكون النغمة المربوطة متنافرة لابد أن تهبط درجة إلى أسفل وإذا كانت متوافقة فيتحرك لحن C.P بحرية إلى نغمة متوافقة مع نغمة لحن C.F'
                />
                <AnimatedP
                    text='وهناك اعتبارات يجب مراعاتها في النوع الرابع هي'
                />
                <ul className='rules-ul'>
                    <ListItems
                        textList={[
                            'البداية تكون سكتة بقيمة نصف مازورة، ثم نغمة بلانش مربوطة مع المازورة التي تليها',
                            'المازورة الأخيرة يجب أن تكون روند مقابل روند ويسبقها نغمة بلانش غير مربوطة',
                            'نغمة البلانش الأولى في كل مازورة يمكن أن تكون على شكلين',
                        ]}
                    />
                    <ol className="list-decimal mr-16">
                        <ListItems
                            textList={[
                                'تكون النغمة متوافقة وبالتالي يتبعه حركة غير متصلة',
                                'تكون النغمة متنافرة وبالتالي يهبط بدرجة متصلة أو نصف درجة نحو النغمة الأساسية من التآلف على الزمن الثاني',
                            ]}
                        />
                    </ol>
                    <ListItems
                        textList={[
                            'يمنع استخدام السنكوب في مسافة الثانية تليها يونيسون',
                            'مسافة الخامسة والأكتاف ممنوعة على البلانش الثاني مسموعة فقط على البلانش الأول',
                            'البناء اللحني للصوت العلوي يكون (7-6-8)',
                            'هناك بعض الاستثناءات يمكن إتباعها هي :',
                        ]}
                    />
                    <ol className="list-decimal mr-16">
                        <ListItems
                            textList={[
                                'يجوز في بعض الحالات كسر السنكوب لمرة واحدة فقط في التمرين ويمكن استعمال نغمتا بلانش مختلفات وبدون ربط على أن تكونا هاتان النغمتان نغمات متوافقة ويمكن أن تأتي أول المازورة أو وسطها أو في النهاية',
                                'يجوز البدء في المازورة الثانية، ولكن يحبذ استعمال المازورة الأولى',
                                'يجوز استخدام العبور أو التقاطع (Crossing) لفترة قصيرة نغمتين أو ثلاثة فقط إذا كان هناك مبررات نغمية ولمرة واحدة في التمرين على ألا تكون في بداية التمرين أو نهايته. ( محمد الملاح -2010- ص44, 45)',
                            ]}
                        />
                    </ol>
                </ul>
                <Illustration
                    description="مثال النوع الرابع (السنكوب)"
                    src={image4}
                />
            </Section>
            <Section title='النوع الخامس (الكونتربوينت المزخرف)' musicIcon={musicIcon}>
                <AnimatedP
                    text='وهو نغمة مقابل مجموعة نغمات تختلف في أشكالها الإيقاعية ولكن تتمثل في مجموعها زمن نغمة لحن C.F'
                />
                <AnimatedP
                    text='بمعنى أن هذا النوع هو خليط من الأنواع الأربعة، بالإضافة الى استخدام العلامات الزمنية المنقوطة والوحدات الأصغر زمناً،'
                />
                <AnimatedP
                    text='ولكن رغم تلك الإضافات، فقد وضعت لهذا النوع شروطا وقواعد لاستخدام هذا النوع بالتحديد أهمها'
                />
                <ul className='rules-ul'>
                    <ListItems
                        textList={[
                            'عند استخدام الرباط الزمني بالتأخر، لابد أن يكون زمن النغمة المربوطة على الضغط القوى أكبر من زمن النغمة التي ربطت منها على الضغط الضعيف أو متساوية معها في الزمن',
                            'عند استخدام الأشكال الأصغر زمنا فيجب أن تكون على الضغط الضعيف وتكون في شكل مروري Passing note أو تغيير Changing note',
                            'يفضل استخدام العلامات المنقوطة على ضغط قوى حتى يعطى نوع من أنواع تأخير النبر الضعيف وهذا ما يعطى اللحن الأفقي ثراءً إيقاعياً ونغمياً',
                            'يستعمل الكرش مزدوج وليس بشكل منفرد، حيث يكون بمثابة نوار ويستعمل في الضلع الثاني أو الرابع في المازورة',
                            'يجب استعمال في هذا النوع وفي كل مازورة نوع خاص أو إيقاع مختلف، فعلى سبيل المثال عند استعمال مازورة تحوي على اثنين من البلانشات فبالتالي لا يجوز استعمالها مرة ثانية في مازورة أخرى، على أن يتم المحافظة على إتباع القوانين الخاصة بكل نوع',
                            'تخضع الكروشات لقوانين النوع الثالث أي يأتي الكرش الأول بصورتين هما',
                        ]}
                    />
                    <ol className="list-decimal mr-16">
                        <ListItems
                            textList={[
                                'نوتة متوافقة فتكون لها حرية الحركة أو يونيسون',
                                'نوتة متنافرة فلابد أن تأتي في صورة مرورية',
                            ]}
                        />
                    </ol>
                    <ListItem 
                        text='الحركة بين الكروشين يجب أن تكون متصلة، بدون قفزات'
                    />
                </ul>
                <Illustration
                    description="مثال النوع الخامس (الكونتربوينت المزخرف)"
                    src={image5}
                />
            </Section>
        </div>
    )
}