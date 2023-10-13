import React from "react";
import idea from "../assets/about/idea.png";
import supervisor from "../assets/about/supervisor.png";
import title from "../assets/about/title.png";
import { motion } from "framer-motion";
import PageTitle from "../compontents/PageTitle";
import { Lovely } from "iconsax-react";
const animate = {
    visible: { opacity: 1, scale: 1, y: 0 },
    hidden: { opacity: 0, scale: 0.8, y: 100 },
};
const animationProps = (delay?: number) => ({
    variants: animate,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true },
    transition: { duration: 0.5, type: "just", delay },
});
function Card({ title, desc, delay }: { title: string; desc: React.ReactNode; delay?: number }) {
    return (
        <motion.div {...animationProps(delay)} className="shadow bg-white max-w-[90%]  my-6 p-8 rounded mx-auto">
            <h3 className="text-4xl text-sky-800 mb-4">{title}</h3>
            <p className="text-sky-800 text-2xl">{desc} </p>
        </motion.div>
    );
}
function Title({ text, src, delay }: { text: string; src: string; delay?: number }) {
    return (
        <motion.div {...animationProps(delay)} className="flex mx-auto w-fit mb-6 items-center gap-4">
            <img className="w-10" src={src} alt="" />
            <h2 className="text-sky-900 font-medium text-3xl">{text}</h2>
        </motion.div>
    );
}

function TitleFavIcon({ text, icon, delay }: { text: string; icon: JSX.Element; delay?: number }) {
    return (
        <motion.div {...animationProps(delay)} className="flex mx-auto w-fit mb-6 items-center gap-4">
            {icon}
            <h2 className="text-sky-900 font-medium text-3xl">{text}</h2>
        </motion.div>
    );
}
export default function About() {
    return (
        <div className="w-full bg-home-image">
            <PageTitle title="ادارة البرنامج" subTitle="معلومات عن البرنامج" iconSrc="icons/info-circle.svg" />
            <div className="my-12 text-center mx-12">
                <Title text="فكرة البرنامج" src={idea} />
                <motion.h3 {...animationProps(0.05)} className="text-4xl text-sky-800 mb-4">
                    يوستينا فكتور اميل سعيد
                </motion.h3>
                <motion.p {...animationProps(0.1)} className="text-sky-800 text-2xl">
                    البرنامج جزء من متطلبات الحصول على درجة دكتوراة في الفلسفة في التربية النوعية تخصص التربية الموسيقية
                    (نظريات وتأليف)
                </motion.p>
            </div>
            <div className="my-20 2xl:my-24 text-center mx-12">
                <Title text="تحت عنوان" delay={0.15} src={supervisor} />
                <motion.h3 {...animationProps(0.2)} className="text-4xl text-sky-800 mb-4">
                    “برنامج إلكتروني قائم على الكنتربوينت المقيد (صوت مقابل صوت)“
                </motion.h3>
            </div>
            <div className="my-20 2xl:my-24 text-center mx-12">
                <Title text="المراجعة والاشراف العلمي " delay={0.25} src={title} />
                <Card
                    delay={0.3}
                    title="أ.د/ أبرار مصطفى إبراهيم علي"
                    desc="أستاذ النظريات والتأليف بقسم التربية الموسيقية ووكيل شئون التعليم والطلاب – بكلية التربية النوعية – جامعة أسيوط"
                />
                <Card
                    title="أ.م.د/ رويدا صابر أحمد "
                    desc="أستاذ النظريات والتأليف المساعد بقسم التربية الموسيقية - بكلية التربية النوعية – جامعة أسيوط "
                />
            </div>
            <div className="my-20 2xl:my-24 text-center mx-12">
                <Title text="المراجعة والاشراف التكنولوجي" delay={0.25} src={title} />

                <Card
                    title="د/ سعد حسن"
                    desc="مدرس تكنولوجيا التعليم – بقسم تكنولوجيا التعليم بكلية التربية النوعية – جامعة أسيوط  "
                />
            </div>
            <div className="my-20 2xl:my-24 text-center mx-12">
                <TitleFavIcon text="ويسعدني أن أشكر كلاً من" icon={<Lovely size="32" color="#00a2ce" />} />
                <Card title="م/ روبرتو أيمن إميل" desc="مصمم البرنامج" />
                <Card title="م/ حبيب جمال حبيب" desc="مطور البرنامج " />
            </div>
            <div className="my-20 2xl:my-24 text-center mx-12">
                <TitleFavIcon
                    text="شكرا على ماقدمته لي من دعم ومساعدة خلال تنفيذ البرنامج"
                    icon={<Lovely size="32" color="#00a2ce" />}
                />
                <Card title="والدى الغالى المهندس فكتور إميل سعيد أنطون" desc="" />
            </div>
        </div>
    );
}
