import React from 'react'
import AnimatedP from '../../compontents/AnimatedP';
import Illustration from '../../compontents/Illustration';
import ListItems from '../../compontents/ListItems';
import Section from '../../compontents/Section';
import musicIcon from '../../assets/sol.png';
import image1 from '../../assets/notes/image013.png';

export default function Type1() {
    return (
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
    )
}
