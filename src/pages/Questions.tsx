import React, { useState } from "react";
import Container from "../compontents/Container";
import AvatarTitle from "../compontents/AvatarTitle";
import CardList from "../compontents/CardList";
import Card from "../compontents/Card";
import Illustration from "../compontents/Illustration";
import PageTitle from "../compontents/PageTitle";
import { Button, Form, Radio } from "antd";
const trueAndFalse = [
    "1.  استخدام اليونيسون في بداية لحن c.f ",
    "2.  مسموح استخدام اليونيسون في وسط اللحن الأفقي ",
    "3.  مسموح باستخدام المسافات الناقص والصغيرة في اللحن الأفقي ",
    "4. تجنب حركة التوازي والتوازي المخفي من قواعد بناء اللحن في الكونتربوينت ",
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
export default function Questions() {
    const [degree, setDegree] = useState<number | null>(null);
    const onFinish = (values: any) => {
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
    return (
        <div className="w-full">
            <PageTitle
                title="أسئلة"
                subTitle="هذه بعض الاسئلة للتقييم"
                iconSrc="icons/document-text.svg"
            />
            <Container>
                <Form onFinish={onFinish} layout="vertical">
                    <AvatarTitle
                        title="السؤال الأول: ضع علامة صح أو خطأ"
                        avatar="illustrations/rules1.png"
                    />
                    <Card>
                        {trueAndFalse.map((item, index) => (
                            <Form.Item label={item} name={`1-${index + 1}`}>
                                <Radio.Group>
                                    <Radio value="true"> صح </Radio>
                                    <Radio value="false"> خطأ </Radio>
                                </Radio.Group>
                            </Form.Item>
                        ))}
                    </Card>
                    <AvatarTitle
                        title="السؤال الثاني: اختر الإجابة الصحيحة مما بين الأقواس"
                        avatar="illustrations/rules2.png"
                    />
                    <Card>
                        <Form.Item
                            label="1-	المقام المسموح فيه رفع الحساس"
                            name="2-1"
                        >
                            <Radio.Group>
                                <Radio value="1"> مقام فرجيان </Radio>
                                <Radio value="2"> مقام مكسوليديان </Radio>
                                <Radio value="3"> مقام ليديان </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="2-	المقام المسموح باستخدام فا # إذا سبقت الحساس "
                            name="2-2"
                        >
                            <Radio.Group>
                                <Radio value="1"> مقام أيوليان </Radio>
                                <Radio value="2"> مقام دوريان </Radio>
                                <Radio value="3"> مقام أيونيان </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="3-	ماهي المسافات المسموحة عند بناء اللحن الافقي"
                            name="2-3"
                        >
                            <Radio.Group>
                                <Radio value="1"> مسافة 4 تامة </Radio>
                                <Radio value="2"> مسافة 7 صغيرة </Radio>
                                <Radio value="3"> مسافة 6 كبيرة </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="4-	في اللحن الأفقي C.F يجب أن ينتهي بنغمة الأساس مسبوقة ب "
                            name="2-4"
                        >
                            <Radio.Group>
                                <Radio value="1"> الحساس </Radio>
                                <Radio value="2"> الدرجة الثالثة </Radio>
                                <Radio value="3"> الدرجة الثانية </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="5-	المسافات الغير مسموحة عند بناء لحن الراسي C.P"
                            name="2-5"
                        >
                            <Radio.Group>
                                <Radio value="1"> مسافة ثالثة بنوعيها </Radio>
                                <Radio value="2"> مسافة ثالثة بنوعيها </Radio>
                                <Radio value="3"> مسافة رابعة ناقصة </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label={
                                <div className="flex flex-col gap-4">
                                    <span> 6- ينتمي هذ اللحن للنوع </span>
                                    <img src="notes/q6.jpg" />
                                </div>
                            }
                            name="2-6"
                        >
                            <Radio.Group>
                                <Radio value="1"> النوع الاول </Radio>
                                <Radio value="2"> النوع الرابع </Radio>
                                <Radio value="3"> النوع الثاني </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label={
                                <div className="flex flex-col gap-4">
                                    <span>7- يسمي هذ المقام باسم </span>
                                    <img src="notes/q7.jpg" />
                                </div>
                            }
                            name="2-7"
                        >
                            <Radio.Group>
                                <Radio value="1"> مقام ليديان </Radio>
                                <Radio value="2"> مقام مكسوليديان </Radio>
                                <Radio value="3"> مقام فريجيان </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="8-	تعتبر نوتة الكامبياتا  " name="2-8">
                            <Radio.Group>
                                <Radio value="1">قفزة لحنية </Radio>
                                <Radio value="2"> مرور لحني </Radio>
                                <Radio value="3"> نغمة متغيرة </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="9-	يسمي النوع الرابع باسم " name="2-9">
                            <Radio.Group>
                                <Radio value="1"> الكنتربوينت المزخرف </Radio>
                                <Radio value="2"> السنكوب </Radio>
                                <Radio value="3"> روند مقابل 2 بلانش </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="10- يتميز مقام ....... بوجود نغمة سيb"
                            name="2-10"
                        >
                            <Radio.Group>
                                <Radio value="1"> مقام مكسوليديان </Radio>
                                <Radio value="2"> مقام ليديان </Radio>
                                <Radio value="3"> مقام ايونيان </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Card>

                    <div className="p-8 flex items-center gap-8">
                        <Button htmlType="submit" type="primary" size="large">
                            تصحيح الاجابات
                        </Button>
                        {degree !== null && (
                            <span className="text-lg font-bold border-b-4 border-sky-900">
                                {degree}/ 44
                            </span>
                        )}
                    </div>
                </Form>
            </Container>
        </div>
    );
}
