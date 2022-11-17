import image001 from '../assets/notes/image001.png';
import image002 from '../assets/notes/image003.png';
import image003 from '../assets/notes/image005.png';
import image004 from '../assets/notes/image007.png';
import image005 from '../assets/notes/image009.png';
import image006 from '../assets/notes/image011.png';
import musicIcon from '../assets/music_icon.png';
import { motion } from 'framer-motion';
import Illustration from '../compontents/Illustration';
import PageTitle from '../compontents/PageTitle';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import Section from '../compontents/Section';
import ListItems from '../compontents/ListItems';
import AnimatedP from '../compontents/AnimatedP';


export default function Rules() {
    return (
        <div className='mb-8'>
            <PageTitle title='قواعد' icon={faListCheck} />

            <Section title='قواعد اللحن الأساسي C.F أو لحن الكونتربوينت C.P الافقي' musicIcon={musicIcon}>

                <ul className='rules-ul'>
                    <ListItems
                        delay={.05}
                        textList={[
                            ". البداية والنهاية: يجب أن تكون البداية إما على Unison أو الأكتاف Octave، أو الخامسة.",

                            "عدم استعمال Unison ماعدا في البداية أو النهاية.",

                            "تجنّب موازاة الخامسات أو Octaves بين أيّ جزأين (Parallel fifths or Octaves)؛ وتجنّب الخامسات المتوازية المخفية أو Octaves. ",

                            "تجنّب التحرّك بالتوازي ألرابعة (Parallel fourths). ",

                            "تفاد المسافات المتنافرة بين أيّ جزأين: الثانية الكبيرة أو الثانية الصغيرة، السابعة الكبيرة والصغيرة، وأيّ مسافة زائدة أو ناقصة، والرابعة التامة.",

                        ]}
                        />
                    
                    <ListItems
                        textList={[
                            "تجنب استخدام مسافة السابعة أو التاسعة سواء داخلها نغمة أو قفزة في نفس الاتجاه صعودا أو هبوطاً. ",
    
                            "يجب ألا تتحرك النغمات في اتجاه واحد لأكثر من ثمانية أو تسع متتالية. ",
    
                            "يجب ألا تتحرك النغمات بعد القفزة في نفس الاتجاه إلا إذا كانت الحركة خطوة واحدة (في قفزة الثالثة والرابعة التامة والخامسة التامة فقط).",
                            "تجنب استخدام قفزة السادسة الكبيرة، ويمكن استخدام قفزة السادسة الصغيرة الصاعدة فقط ويفضل أن تهبط ثانية مباشرة.",

                            " تجنب استخدام التآلفات المفككة Broken Chords وذلك لأنها تعطى إحساس بالطابع الهارموني وبالتالي في اللحن الكونترابنطي بالمصاحبة الهارمونية. ",

                            " تجنب تكرار التتابعات اللحنية Sequential Repetition على بعد مسافة ثانية أو ثالثة أو رابعة سواء صعوداً أو هبوطاً. ",

                            "استخدام قفزة الأكتاف في حالات ملحة وضرورية منها :",
                        ]}
                    />
                    <ol className='list-decimal mr-16'>
                        <ListItems
                            textList={[
                                "إذا تجاوز أو تخطى اللحن نطاقه الصوتي.",
                                "إذا ضاقت المسافة الرأسية بين اللحنين (النغمتين المتقابلتين).",
                                "إذا اتسعت المسافة الرأسية بين اللحنين (النغمتين المتقابلتين). وفى جميع الحالات لا يسمح بالقفزة لأكثر من مسافة اكتاف.",

                            ]}
                        />
                    </ol>
                    <ListItems
                        textList={[
                            "يمكن استخدام قفزتان متتاليتان في اتجاه واحد أو أن القفزة الثانية تكون عكس الاتجاه لمسافتي الرابعة والخامسة فقط.",
                            "عند استخدام قفزة الأكتاف يفضل أن يليها حركة سلمية عكس الاتجاه وفى جميع الأحوال لا تزيد القفزة عن قفزة الثالثة عكس اتجاه قفزة الأكتاف. ",
                            "ولابد من مراعاة الآتي :"
                        ]}
                    />
                    <ol className='list-decimal mr-16'>
                        <ListItems
                            textList={[
                                "تجنب تعاقب مسافة الاكتاف مباشرة نفس المسافة في شكل متوازي، وكذلك مسافة الخامسة.",
                                " مسموح باستخدام مسافة الثالثة أو السادسة المتوازية ولكن يفضل استخدام الحركة المماثلة لفترة طويلة وأيضا لا يسمح بتوازي أكثر من ثلاث مرات متعاقبة سواء لمسافة الثالثة أو السادسة.",
                                " الحركة العكسية وهي أفضل الحركات اللحنية بين الصوتين وفيها صوت يتحرك إلى أعلى والصوت المقابل يتحرك إلى أسفل.",
                                " الحركة المماثلة وهي تحريك أحد الأصوات بينما الصوت الآخر ثابت.",
                                " لا يسمح بتخطي نطاق الصوت الأخر فالصوت الأعلى لا يتخطى الصوت الأسفل والعكس",

                            ]}
                        />
                    </ol>
                </ul>
            </Section>
            <Section title=' المقامات التي بنيت عليها قواعد وشروط الكتابة الكونتربوينت' musicIcon={musicIcon}>
                <AnimatedP text='وهي المقامات الكنسية أو الجريجورية التي كانت مستخدمة في ذلك الوقت لبناء الألحان الغنائية وهي :F' />

                <Illustration
                    description="مقام دوريان Dorian ويبدأ من درجة (رى) "
                    src={image001}
                />
                <Illustration
                    description="مقام فريجيان Phrygian ويبدأ من درجة (مي) "
                    src={image002}
                />
                <Illustration
                    description="مقام ليديان Lydian ويبدأ من درجة (فا) "
                    src={image003}
                />
                <Illustration
                    description="مقام مكسوليديان Mixolydian ويبدأ من درجة (صول) "
                    src={image004}
                />
                <AnimatedP text='هذه المقامات الأربع كانت المقامات الأصلية التي انتقاها (امبروز) أحد أساقفة ميلانو في القرن الرابع الميلادي تقريباً، وظلت الموسيقى الأوربية سواء الدينية أو الدنيوية تبنى على هذه المقامات الأربع التي عرفت بالمقامات الأصلية حتى القرن السادس عشر تقريبا الى أن أضاف (القس جلارينوس) في منتصف القرن السادس عشر الميلادي مقامين هما :' />
                <Illustration
                    description="مقام الأيوليان Aeolian ويبدأ من درجة (لا) "
                    src={image005}
                />
                <Illustration
                    description="مقام الأيونيان Ionian ويبدأ من درجة (دو) "
                    src={image006}
                />
            </Section>
        </div>
    )
}
