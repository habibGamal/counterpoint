import React from 'react'
import AnimatedP from '../../compontents/AnimatedP';
import Illustration from '../../compontents/Illustration';
import ListItems from '../../compontents/ListItems';
import Section from '../../compontents/Section';
import musicIcon from '../../assets/sol.png';
import image1 from '../../assets/notes/image019.jpg';

export default function Type4() {
    return (
        <Section title='النوع الرابع (السنكوب)' musicIcon={musicIcon}>
            <AnimatedP
                text='نغمة مقابل نغمتين، بناء هذا النوع مثل بناء النوع الثاني على نغمة من لحن C.F تقابلها نغمتين من لحن C.P ولكن باستخدام الرباط الزمني حيث تقع نغمة لحن C.P نصفها الأول على الضغط الضعيف المقابل لنغمة لحنC.F'
            />
            <AnimatedP
                delay={.05}
                text='والنصف الأخر على الضغط الأول مقابل النغمة التالية في لحن C.F، وهذا ما يسمى الضغط المؤخر Syncopation، وعندما تكون النغمة المربوطة متنافرة لابد أن تهبط درجة إلى أسفل وإذا كانت متوافقة فيتحرك لحن C.P بحرية إلى نغمة متوافقة مع نغمة لحن C.F'
            />
            <AnimatedP
                delay={.07}
                text='وهناك اعتبارات يجب مراعاتها في النوع الرابع هي'
            />
            <ul className='rules-ul'>
                <ListItems
                    delay={.1}
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
                src={image1}
            />
        </Section>
    )
}
