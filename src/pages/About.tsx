import {
    faHandsPraying,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import idea from "../assets/about/idea.png";
import supervisor from "../assets/about/supervisor.png";
import title from "../assets/about/title.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import PageTitle from "../compontents/PageTitle";
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
function Card({
    title,
    desc,
    delay,
}: {
    title: string;
    desc: React.ReactNode;
    delay?: number;
}) {
    return (
        <motion.div
            {...animationProps(delay)}
            className="custom-shadow  my-6 p-8 rounded mx-auto"
        >
            <h3 className="text-4xl text-sky-800 mb-4">{title}</h3>
            <p className="text-sky-800 text-2xl">{desc} </p>
        </motion.div>
    );
}

export default function About() {
    return (
        <div className="w-full">
            <PageTitle
                title="عنا"
                subTitle="معلومات عن البرنامج"
                iconSrc="icons/info-circle.svg"
            />
            <div className="my-12 text-center mx-12">
                <motion.div
                    {...animationProps()}
                    className="flex mx-auto w-fit mb-6 items-center gap-4"
                >
                    <img className="w-10" src={idea} alt="" />
                    <h2 className="text-sky-900 font-medium text-3xl">
                        فكرة البرنامج
                    </h2>
                </motion.div>
                <motion.h3
                    {...animationProps(0.05)}
                    className="text-4xl text-sky-800 mb-4"
                >
                    يوستينا فكتور اميل سعيد
                </motion.h3>
                <motion.p
                    {...animationProps(0.1)}
                    className="text-sky-800 text-2xl"
                >
                    البرنامج جزء من متطلبات الحصول على درجة دكتوراة في الفلسفة
                    في التربية النوعية تخصص التربية الموسيقية (نظريات وتأليف)
                </motion.p>
            </div>
            <div className="my-20 2xl:my-24 text-center mx-12">
                <motion.div
                    {...animationProps(0.15)}
                    className="flex mx-auto w-fit mb-6 items-center gap-4"
                >
                    <img className="w-10" src={supervisor} alt="" />
                    <h2 className="text-sky-900 font-medium text-3xl">
                        تحت عنوان
                    </h2>
                </motion.div>
                <motion.h3
                    {...animationProps(0.2)}
                    className="text-4xl text-sky-800 mb-4"
                >
                    “برنامج إلكتروني قائم على الكونتربوينت المقيد (صوت مقابل
                    صوت) “
                </motion.h3>
            </div>
            <div className="my-20 2xl:my-24 text-center mx-12">
                <motion.div
                    {...animationProps(0.25)}
                    className="flex mx-auto w-fit mb-6 items-center gap-4"
                >
                    <img className="w-10" src={title} alt="" />
                    <h2 className="text-sky-900 font-medium text-3xl">
                        تحت إشراف كلاً من
                    </h2>
                </motion.div>
                <Card
                    delay={0.3}
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
            <div className="my-20 2xl:my-24 text-center mx-12">
                <motion.div
                    {...animationProps()}
                    className="flex mx-auto w-fit mb-6 items-center gap-4"
                >
                    <FontAwesomeIcon
                        icon={faHandsPraying}
                        size="2x"
                        className="text-[#00a2ce]"
                    />
                    <h2 className="text-sky-900 font-medium text-3xl">
                        ويسعدني أن أشكر كلاً من
                    </h2>
                </motion.div>
                <Card title="م/ روبرتو أيمن إميل" desc="مصمم البرنامج" />
                <Card title="م/ حبيب جمال حبيب" desc="مطور البرنامج " />
            </div>
            <div className="my-20 2xl:my-24 text-center mx-12">
                <motion.div
                    {...animationProps()}
                    className="flex mx-auto w-fit mb-6 items-center gap-4"
                >
                    <FontAwesomeIcon
                        icon={faHandsPraying}
                        size="2x"
                        className="text-[#00a2ce]"
                    />
                    <h2 className="text-sky-900 font-medium text-3xl">
                        على ماقدمته لي من دعم ومساعدة خلال تنفيذ البرنامج
                    </h2>
                </motion.div>
                <Card
                    title="والدى الغالى المهندس فكتور إميل سعيد أنطون"
                    desc=""
                />
            </div>
        </div>
    );
}
