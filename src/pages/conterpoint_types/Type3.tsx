import React from 'react'
import AnimatedP from '../../compontents/AnimatedP';
import Illustration from '../../compontents/Illustration';
import ListItems from '../../compontents/ListItems';
import Section from '../../compontents/Section';
import musicIcon from '../../assets/sol.png';
import image1 from '../../assets/notes/image017.jpg';

export default function Type3() {
    return (

        <Section className='mt-8' title='النوع الثالث (روند مقابل 4 نوار)' musicIcon={musicIcon}>
            <AnimatedP
                text='وهو نغمة مقابل أربعة نغمات، فيكون لحن C.F نغمة يقابلها أربعة نغمات، والنغمة الواحدة تمثل ربع القيمة الزمنية للنغمة التي في لحن C.F، '
            />
            <AnimatedP
                delay={.05}
                text='وعلى سبيل المثال (روند في لحن C.F يقابلها 4 نوار في لحن C.P   أو بلانش يقابلها 4 كروش)، فنتج عن ذلك وجود أربعة ضغوط إيقاعية ، فالضغط الأول لابد وان يكون متوافق Consonances أما الضغط الثاني فيكون أما متوافق أو متنافر وإذا جاء متنافرا Dissonances  فيكون في شكل مروري Passing note أو تغيير Changing not '
            />
            <AnimatedP
                delay={.07}
                text='، والضغط الثالث لابد أن يكون متوافقاً، أما الضغط الرابع فإما يكون متوافقاً أو يكون متنافراً وإذا جاء متنافراً يكون في شكل مروري Passing note بين النغمة التي قبله والتي تليه مقابل لحن C.F '
            />
            <AnimatedP
                delay={.09}
                text='وهناك اعتبارات يجب مراعاتها في النوع الثالث هي :'
            />
            <ul className='rules-ul'>
                <ListItems
                    delay={.1}
                    textList={[
                        'المازورة الأولى سكتة نوار ثم ثلاثة نوار، مقابل روند',
                        'النوار الأول في المازورة الأولى يجب أن تكون نفس النغمة أو خامسة أو اكتاف',
                    ]}
                />
                <ListItems
                    textList={[
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
                src={image1}
            />
        </Section>
    )
}
