import React from "react";
import Container from "../../compontents/Container";
import PageTitle from "../../compontents/PageTitle";
import AvatarTitle from "../../compontents/AvatarTitle";
import CardList from "../../compontents/CardList";
import Card from "../../compontents/Card";
import Illustration from "../../compontents/Illustration";

export default function Type3() {
  return (
    <div className="w-full">
      <PageTitle
        title="انواع الكونتربوينت"
        subTitle="النوع الثالث (روند مقابل 4 نوار)"
        iconSrc="icons/shapes.svg"
      />
      <Container>
        <AvatarTitle
          title="النوع الثالث (روند مقابل 4 نوار)"
          avatar="illustrations/rules1.png"
        />
        <Card>
          وهو نغمة مقابل أربعة نغمات، فيكون لحن C.F نغمة يقابلها أربعة نغمات،
          والنغمة الواحدة تمثل ربع القيمة الزمنية للنغمة التي في لحن C.F، وعلى
          سبيل المثال (روند في لحن C.F يقابلها 4 نوار في لحن C.P أو بلانش
          يقابلها 4 كروش)،
        </Card>
        <div className="grid grid-cols-2 gap-x-8">
          <Card>
            فنتج عن ذلك وجود أربعة ضغوط إيقاعية ، فالضغط الأول لابد وان يكون
            متوافق Consonances أما الضغط الثاني فيكون أما متوافق أو متنافر وإذا
            جاء متنافرا Dissonances فيكون في شكل مروري Passing note أو تغيير
            Changing not ، والضغط الثالث لابد أن يكون متوافقاً، أما الضغط الرابع
            فإما يكون متوافقاً أو يكون متنافراً وإذا جاء متنافراً يكون في شكل
            مروري Passing note بين النغمة التي قبله والتي تليه مقابل لحن C.F
          </Card>
          <CardList
            list={[
              "وهناك اعتبارات يجب مراعاتها في النوع الثالث هي :",
              "المازورة الأولى سكتة نوار ثم ثلاثة نوار، مقابل روند",
              "النوار الأول في المازورة الأولى يجب أن تكون نفس النغمة أو خامسة أو اكتاف",
              "النوار الأول في كل مازورة يجب أن يكون متوافق ما عدا اليونيسون",
              "الثلاث نوارات الباقية ممكن أن تكون على شكلين",
            ]}
          />
          <CardList
            list={[
              "نوتات من داخل التألف ونصل لهم بقفزات (اربيج) بشكل مفكك ويمكن استعمال يونيسون",
              "أن تكون النوتة من خارج التألف مثل نغمات المرور",
              "المازورة الأخيرة يجب أن تكون روند مقابل روند على أن تكون نفس النغمة أو أوكتاف",
            ]}
          />
          <CardList
            list={[
              "لا يجوز استعمال نفس النغمة فقط على الزمن القوي",
              "الاكتافين أو الخامسات يجب أن يفرق بينهما على الأقل 4 نوار، ما إذا كانت الخامسات فقط ناتجة عن نوتة مرورية أو تغيير يمكن أن يفرق بينهما نوار واحد أو اثنين أو ثلاثة",
              "لا يجوز استخدام السنكوب في القفلة أو المازورة التي قبل الأخيرة",
            ]}
          />
          <Illustration
            src="notes/image017.jpg"
            desc="مثال النوع الثالث (روند مقابل 4 نوار)"
          />
        </div>
      </Container>
    </div>
  );
}
