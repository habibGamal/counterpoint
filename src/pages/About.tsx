import { faHandsPraying, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import PageTitle from '../compontents/PageTitle'
import idea from '../assets/about/idea.png'
import supervisor from '../assets/about/supervisor.png'
import title from '../assets/about/title.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Card({ title, desc }: { title: string, desc: React.ReactNode }) {
    return (<div className="custom-shadow w-[880px] my-6 p-8 rounded mx-auto">
        <h3 className="text-4xl text-primary-200 mb-4">{title}</h3>
        <p className="text-primary-200 text-2xl">{desc} </p>
    </div>);
}


export default function About() {
    return (
        <div className='my-8'>
            <PageTitle title='عنا' icon={faInfoCircle} />
            <div className="my-12 text-center">
                <div className="flex mx-auto w-fit mb-6 items-center gap-4">
                    <img className="w-10" src={idea} alt="" />
                    <h2 className="text-primary-100 text-3xl">فكرة البرنامج</h2>
                </div>
                <h3 className="text-4xl text-primary-200 mb-4">يوستينا فكتور اميل سعيد</h3>
                <p className="text-primary-200 text-2xl">البرنامج جزء من متطلبات الحصول على درجة دكتوراة في الفلسفة في التربية النوعية
                    تخصص التربية الموسيقية (نظريات وتأليف)</p>
            </div>
            <div className="my-24 text-center">
                <div className="flex mx-auto w-fit mb-6 items-center gap-4">
                    <img className="w-10" src={supervisor} alt="" />
                    <h2 className="text-primary-100 text-3xl">تحت عنوان</h2>
                </div>
                <h3 className="text-4xl text-primary-200 mb-4">“برنامج إلكتروني قائم على الكونتربوينت المقيد (صوت مقابل صوت) “</h3>
            </div>
            <div className="my-24 text-center">
                <div className="flex mx-auto w-fit mb-6 items-center gap-4">
                    <img className="w-10" src={title} alt="" />
                    <h2 className="text-primary-100 text-3xl">تحت إشراف كلاً من</h2>
                </div>
                <Card
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
            <div className="my-24 text-center">
                <div className="flex mx-auto w-fit mb-6 items-center gap-4">
                    <FontAwesomeIcon icon={faHandsPraying} size="2x" className="text-primary-200"/>
                    <h2 className="text-primary-100 text-3xl">ويسعدني أن أشكر كلاً من</h2>
                </div>
                <Card
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
                <Card
                    title="والدى الغالى المهندس فكتور إميل سعيد أنطون"
                    desc=""
                />
                <Card
                    title="على ماقدمته لي من دعم ومساعدة خلال تنفيذ البرنامج"
                    desc={
                        <>
                            م/ حبيب جمال حبيب
                            <br />
                            م/ روبرتو أيمن إيميل
                        </>
                    }
                />
            </div>
        </div>
    )
}
