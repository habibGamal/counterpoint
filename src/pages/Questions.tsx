import React, { FormEvent, useState } from "react";
import Container from "../compontents/Container";
import AvatarTitle from "../compontents/AvatarTitle";
import CardList from "../compontents/CardList";
import Card from "../compontents/Card";
import Illustration from "../compontents/Illustration";
import PageTitle from "../compontents/PageTitle";
import Button from "../compontents/Button";
// import { Button, Form, Radio } from "antd";
const trueAndFalse = [
    "1.  استخدام اليونيسون في بداية لحن c.f ",
    "2.  مسموح استخدام اليونيسون في وسط اللحن الأفقي ",
    "3.  مسموح باستخدام المسافات الناقص والصغيرة في اللحن الأفقي ",
    "4. تجنب حركة التوازي والتوازي المخفي من قواعد بناء اللحن في الكنتربوينت ",
    "5. مسموح باستخدام مسافة 6 ك في اللحن الأفقي على أن تهبط مسافة 2 ص ",
    "6. مسموح باستخدام أكثر من 3 ثالثات متتالية في اللحن الأفقي ",
    "7. غير مسموح باستخدام الحركة العكسية بين صوتين  c.F – c.p ",
    "8. مسموح استخدام أكثر من خامسة داخل تمرين النوع الأول ",
    "9. لا يجوز تكرار مسافة الثالثة والسادسة أكثر من 4 مرات داخل التمرين ",
    "10. النوع الثاني عبارة عن سنكوب ويتميز بالقفلة الثابتة ",
    "11. لا يجوز تكرار نفس النوتة بشكل متتالي عند بناء التمرين ",
    "12.   ممنوع استخدام ما فوق الأوكتاف عند بناء التمرين ",
    "13. تبدأ المازورة الأولى في النوع الأول باستخدام السكتة ",
    "14. في النوع الثاني يجب أن تنتهي المازورة بالشكل الإيقاعي روند ",
    "15. في النوع الثاني يجب أن يكون البلانش الثاني متوافق ",
    "16. في النوع الثاني تستخدم النغمة الغير متوافقة كنغمة متميزة CHANGE NOTE ",
    "17. تبدأ المازورة الأولى في النوع الثالث بسكتة نوار ثم ثلاثة نوارات مقابل روند ",
    "18. لابد أن يكون النوار الأول متوافق في النوع الثالث ",
    "19. مسموح باستخدام نوتة الكامبتا في النوع الرابع ",
    "20. اذا كان النوار الرابع متنافر فإنه يأتي في شكل مرور ",
    "21. النوار الثاني في النوع الثالث لابد أن يكون متنافر ويأتي في شكل مرور أو تغير ",
    "22. في النوع الثالث لابد أن تنتهي المازورة الأخيرة بروند ",
    "23. مسموح باستخدام الرباط في النوع الثاني والرابع ",
    "24. لابد أن يكون البلانش الأول في النوع الرابع متوافق ",
    "25. يسمح بفك الرباط مرة واحدة بالتمرين في النوع الرابع ",
    "26. البلانش الثاني يمكن أن يكون متوافق في النوع الرابع ",
    "27. تصرف البلانش الثاني في النوع الثاني مسافة 2 ك صاعدة فقط إذا كانت متنافرة ",
    "28. يجب أن يبدأ النوع الرابع بسكتة بلانش ",
    "29. النوع الخامس هو مزيج من الأربع أنواع ",
    "30. يجوز استخدام نغمة سي b في مقام المكسوليديان ",
    "31. يجوز رفع الحساس في مقام لوكريان ومقام أيونيان ",
    "32. يجوز استخدام نغمة سي b في مقام الليديان ",
    "33. يجوز رفع الحساس في مقام الدوريان ",
    "34. غير مسموح باستخدام نغمة فا #  في مقام الايوليان إذا سبقت الحساس ",
];
const answers = {
    "1-1": "true",
    "1-2": "false",
    "1-3": "false",
    "1-4": "true",
    "1-5": "false",
    "1-6": "false",
    "1-7": "false",
    "1-8": "false",
    "1-9": "false",
    "1-10": "false",
    "1-11": "true",
    "1-12": "true",
    "1-13": "false",
    "1-14": "true",
    "1-15": "true",
    "1-16": "false",
    "1-17": "true",
    "1-18": "true",
    "1-19": "false",
    "1-20": "true",
    "1-21": "false",
    "1-22": "true",
    "1-23": "false",
    "1-24": "false",
    "1-25": "true",
    "1-26": "false",
    "1-27": "false",
    "1-28": "true",
    "1-29": "true",
    "1-30": "false",
    "1-31": "false",
    "1-32": "true",
    "1-33": "true",
    "1-34": "false",
    "2-1": "2",
    "2-2": "1",
    "2-3": "1",
    "2-4": "3",
    "2-5": "3",
    "2-6": "3",
    "2-7": "1",
    "2-8": "1",
    "2-9": "2",
    "2-10": "2",
};
const questions = [
    {
        label: "1- المقام المسموح فيه رفع الحساس",
        name: "2-1",
        options: [
            { label: "مقام فرجيان", value: "1" },
            { label: "مقام مكسوليديان", value: "2" },
            { label: "مقام ليديان", value: "3" },
        ],
    },
    {
        label: "2- المقام المسموح باستخدام فا # إذا سبقت الحساس",
        name: "2-2",
        options: [
            { label: "مقام أيوليان", value: "1" },
            { label: "مقام دوريان", value: "2" },
            { label: "مقام أيونيان", value: "3" },
        ],
    },
    {
        label: "3- ماهي المسافات المسموحة عند بناء اللحن الافقي",
        name: "2-3",
        options: [
            { label: "مسافة 4 تامة", value: "1" },
            { label: "مسافة 7 صغيرة", value: "2" },
            { label: "مسافة 6 كبيرة", value: "3" },
        ],
    },
    {
        label: "4- في اللحن الأفقي C.F يجب أن ينتهي بنغمة الأساس مسبوقة ب",
        name: "2-4",
        options: [
            { label: "الحساس", value: "1" },
            { label: "الدرجة الثالثة", value: "2" },
            { label: "الدرجة الثانية", value: "3" },
        ],
    },
    {
        label: "5- المسافات الغير مسموحة عند بناء لحن الراسي C.P",
        name: "2-5",
        options: [
            { label: "مسافة ثالثة بنوعيها", value: "1" },
            { label: "مسافة ثالثة بنوعيها", value: "2" },
            { label: "مسافة رابعة ناقصة", value: "3" },
        ],
    },
    {
        label: "6- ينتمي هذ اللحن للنوع",
        name: "2-6",
        options: [
            { label: "النوع الاول", value: "1" },
            { label: "النوع الرابع", value: "2" },
            { label: "النوع الثاني", value: "3" },
        ],
        image: "notes/q6.jpg",
    },
    {
        label: "7- يسمي هذ المقام باسم",
        name: "2-7",
        options: [
            { label: "مقام ليديان", value: "1" },
            { label: "مقام مكسوليديان", value: "2" },
            { label: "مقام فريجيان", value: "3" },
        ],
        image: "notes/q7.jpg",
    },
    {
        label: "8- تعتبر نوتة الكامبياتا",
        name: "2-8",
        options: [
            { label: "قفزة لحنية", value: "1" },
            { label: "مرور لحني", value: "2" },
            { label: "نغمة متغيرة", value: "3" },
        ],
    },
    {
        label: "9- يسمي النوع الرابع باسم",
        name: "2-9",
        options: [
            { label: "الكنتربوينت المزخرف", value: "1" },
            { label: "السنكوب", value: "2" },
            { label: "روند مقابل 2 بلانش", value: "3" },
        ],
    },
    {
        label: "10- يتميز مقام ....... بوجود نغمة سيb",
        name: "2-10",
        options: [
            { label: "مقام مكسوليديان", value: "1" },
            { label: "مقام ليديان", value: "2" },
            { label: "مقام ايونيان", value: "3" },
        ],
    },
];
export default function Questions() {
    const [degree, setDegree] = useState<number | null>(null);
    const [values, setValues] = useState<any>({});
    const onFinish = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(values);
        const wrongAns: string[] = [];
        Object.keys(answers).forEach((key: string) => {
            if (values[key] !== answers[key as keyof typeof answers]) {
                wrongAns.push(key);
            }
        });
        Object.keys(answers).forEach((key: string) => {
            const element = document.getElementById(key);
            if (element) {
                element.classList.remove("wrong");
            }
        });
        wrongAns.forEach((item) => {
            const element = document.getElementById(item);
            console.log();

            if (element) {
                element.classList.add("wrong");
            }
        });
        setDegree(44 - wrongAns.length);
    };
    const onChange = (e: any) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    return (
        <div className="w-full">
            <PageTitle title="أسئلة" subTitle="هذه بعض الاسئلة للتقييم" iconSrc="icons/document-text.svg" />
            <Container>
                <form onSubmit={onFinish}>
                    <AvatarTitle title="السؤال الأول: ضع علامة صح أو خطأ" avatar="illustrations/rules1.png" />
                    <Card>
                        {trueAndFalse.map((item, index) => (
                            // <Form.Item label={item} name={`1-${index + 1}`}>
                            //     <Radio.Group>
                            //         <Radio value="true"> صح </Radio>
                            //         <Radio value="false"> خطأ </Radio>
                            //     </Radio.Group>
                            // </Form.Item>
                            <div key={index} className="mb-2">
                                <span id={`1-${index + 1}`}>{item}</span>
                                <br />
                                <input
                                    className="px-1"
                                    value="true"
                                    type="radio"
                                    id={`true${index}`}
                                    name={`1-${index + 1}`}
                                    onChange={onChange}
                                />
                                <label className="px-2 ml-2" htmlFor={`true${index}`}>
                                    صح
                                </label>
                                <input
                                    className="px-1"
                                    value="false"
                                    type="radio"
                                    id={`false${index}`}
                                    name={`1-${index + 1}`}
                                    onChange={onChange}
                                />
                                <label className="px-2" htmlFor={`false${index}`}>
                                    خطأ
                                </label>
                            </div>
                        ))}
                    </Card>
                    <AvatarTitle
                        title="السؤال الثاني: اختر الإجابة الصحيحة مما بين الأقواس"
                        avatar="illustrations/rules2.png"
                    />
                    <Card>
                        {questions.map((question, index) => (
                            <div className="mb-4">
                                <div id={`2-${index + 1}`} className="flex flex-col gap-4">
                                    <span>{question.label}</span>
                                    <img className="w-[600px]" src={question.image} />
                                </div>
                                {question.options.map((option) => (
                                    <>
                                        <input
                                            className="mx-1"
                                            type="radio"
                                            id={`ans${index}${option.value}`}
                                            value={option.value}
                                            name={question.name}
                                            onChange={onChange}
                                        />
                                        <label className="mx-2" htmlFor={`ans${index}${option.value}`}>
                                            {option.label}
                                        </label>
                                    </>
                                ))}
                            </div>
                        ))}
                    </Card>

                    <div className="p-8 flex items-center gap-8">
                        <Button>تصحيح الاجابات</Button>
                        {degree !== null && (
                            <span className="text-lg font-bold border-b-4 border-sky-900">{degree}/ 44</span>
                        )}
                    </div>
                </form>
            </Container>
        </div>
    );
}
