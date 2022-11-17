import { faHandsPraying, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import PageTitle from '../compontents/PageTitle'
import idea from '../assets/about/idea.png'
import supervisor from '../assets/about/supervisor.png'
import title from '../assets/about/title.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
const animate = {
    visible: { opacity: 1, scale: 1, y: 0 },
    hidden: { opacity: 0, scale: .8, y: 100 },
}
const animationProps = (delay?: number) => ({
    variants: animate,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true },
    transition: { duration: .5, type: 'just', delay }
})
function Card({ title, desc, delay }: { title: string, desc: React.ReactNode, delay?: number }) {
    return (
        <motion.div
            {...animationProps(delay)} className="custom-shadow w-[880px] my-6 p-8 rounded mx-auto">
            <h3 className="text-4xl text-primary-200 mb-4">{title}</h3>
            <p className="text-primary-200 text-2xl">{desc} </p>
        </motion.div>
    );
}


export default function About() {
    return (
        <div className='mb-8'>
            <PageTitle title='عنا' icon={faInfoCircle} />
            <div className="my-12 text-center">
                <motion.div
                    {...animationProps()}
                    className="flex mx-auto w-fit mb-6 items-center gap-4">
                    <img className="w-10" src={idea} alt="" />
                    <h2 className="text-primary-100 text-3xl">فكرة البرنامج</h2>
                </motion.div>
                <motion.h3 {...animationProps(.05)} className="text-4xl text-primary-200 mb-4">يوستينا فكتور اميل سعيد</motion.h3>
                <motion.p {...animationProps(.1)} className="text-primary-200 text-2xl">البرنامج جزء من متطلبات الحصول على درجة دكتوراة في الفلسفة في التربية النوعية
                    تخصص التربية الموسيقية (نظريات وتأليف)
                </motion.p>
            </div>
            <div className="my-20 2xl:my-24 text-center">
                <motion.div {...animationProps(.15)} className="flex mx-auto w-fit mb-6 items-center gap-4">
                    <img className="w-10" src={supervisor} alt="" />
                    <h2 className="text-primary-100 text-3xl">تحت عنوان</h2>
                </motion.div>
                <motion.h3 {...animationProps(.2)} className="text-4xl text-primary-200 mb-4">“برنامج إلكتروني قائم على الكونتربوينت المقيد (صوت مقابل صوت) “</motion.h3>
            </div>
            <div className="my-20 2xl:my-24 text-center">
                <motion.div {...animationProps(.25)} className="flex mx-auto w-fit mb-6 items-center gap-4">
                    <img className="w-10" src={title} alt="" />
                    <h2 className="text-primary-100 text-3xl">تحت إشراف كلاً من</h2>
                </motion.div>
                <Card
                    delay={.3}
                    title="أ.د/ أبرار مصطفى إبراهيم علي"
                    desc="أستاذ النظريات والتأليف بقسم التربية الموسيقية ووكيل شئون التعليم والطلاب – كلية التربية النوعية"
                />
                <Card
                    title="أ.م.د/ رويدا صابر أحمد "
                    desc="أستاذ النظريات والتأليف المساعد بقسم التربية الموسيقية كلية التربية النوعية – جامعة أسيوط "
                />
                <Card
                    title="د/ سعد حسن"
                    desc="مدرس تكنولوجيا التعليم – بقسم تكنولوجيا التعليم كلية التربية النوعية – جامعة أسيوط  "
                />
            </div>
            <div className="my-20 2xl:my-24 text-center">
                <motion.div {...animationProps()} className="flex mx-auto w-fit mb-6 items-center gap-4">
                    <FontAwesomeIcon icon={faHandsPraying} size="2x" className="text-primary-200" />
                    <h2 className="text-primary-100 text-3xl">ويسعدني أن أشكر كلاً من</h2>
                </motion.div>
                <Card
                    title="أ.د/ أبرار مصطفى إبراهيم علي"
                    desc="أستاذ النظريات والتأليف بقسم التربية الموسيقية ووكيل شئون التعليم والطلاب – كلية التربية النوعية"
                />
                <Card
                    title="أ.م.د/ رويدا صابر أحمد "
                    desc="أستاذ النظريات والتأليف المساعد بقسم التربية الموسيقية كلية التربية النوعية – جامعة أسيوط "
                />
                <Card
                    title="د/ سعد حسن محي الدين"
                    desc="مدرس تكنولوجيا التعليم – بقسم تكنولوجيا التعليم كلية التربية النوعية – جامعة أسيوط  "
                />
                <Card
                    title="م/ روبرتو أيمن إميل"
                    desc="مصمم البرنامج"
                />
                <Card
                    title="م/ حبيب جمال حبيب"
                    desc="مطور البرنامج "
                />
            </div>
            <div className="my-20 2xl:my-24 text-center">
                <motion.div {...animationProps()} className="flex mx-auto w-fit mb-6 items-center gap-4">
                    <FontAwesomeIcon icon={faHandsPraying} size="2x" className="text-primary-200" />
                    <h2 className="text-primary-100 text-3xl">على ماقدمته لي من دعم ومساعدة خلال تنفيذ البرنامج</h2>
                </motion.div>
                <Card
                    title="والدى الغالى المهندس فكتور إميل سعيد أنطون"
                    desc=""
                />

            </div>
        </div>
    )
}
