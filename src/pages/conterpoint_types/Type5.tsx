import React from 'react'
import AnimatedP from '../../compontents/AnimatedP';
import Illustration from '../../compontents/Illustration';
import ListItems from '../../compontents/ListItems';
import Section from '../../compontents/Section';
import musicIcon from '../../assets/sol.png';
import image1 from '../../assets/notes/image021.jpg';
import ListItem from '../../compontents/ListItem';

export default function Type5() {
    return (
        <Section className='mt-8' title='النوع الخامس (الكونتربوينت المزخرف)' musicIcon={musicIcon}>
            <AnimatedP
                text='وهو نغمة مقابل مجموعة نغمات تختلف في أشكالها الإيقاعية ولكن تتمثل في مجموعها زمن نغمة لحن C.F'
            />
            <AnimatedP
                delay={.03}
                text='بمعنى أن هذا النوع هو خليط من الأنواع الأربعة، بالإضافة الى استخدام العلامات الزمنية المنقوطة والوحدات الأصغر زمناً،'
            />
            <AnimatedP
                delay={.05}
                text='ولكن رغم تلك الإضافات، فقد وضعت لهذا النوع شروطا وقواعد لاستخدام هذا النوع بالتحديد أهمها'
            />
            <ul className='rules-ul'>
                <ListItems
                    delay={.1}
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
                src={image1}
            />
        </Section>
    )
}
