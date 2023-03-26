import React from "react";
import Container from "../../compontents/Container";
import PageTitle from "../../compontents/PageTitle";
import AvatarTitle from "../../compontents/AvatarTitle";
import CardList from "../../compontents/CardList";
import Card from "../../compontents/Card";
import Illustration from "../../compontents/Illustration";

export default function Type2() {
  return (
    <div className="w-full">
      <PageTitle
        title="انواع الكونتربوينت"
        subTitle="النوع الثاني (روند مقابل 2 بلانش)"
        iconSrc="icons/shapes.svg"
      />
      <Container>
        <AvatarTitle
          title="النوع الثاني (روند مقابل 2 بلانش)"
          avatar="illustrations/rules1.png"
        />
        <Card>
          وهو نغمة مقابل نغمتين، فيكون لحن C.F عبارة عن نغمة ويقابلها في لحن C.P
          نغمتين والنغمة الواحدة نصف القيمة الزمنية للنغمة التي في لحن C.F، وفى
          هذه الحالة أصبح لحن C.P يحتوى على ضغطين، فالضغط الأول يجب أن يكون
          متوافقا مع نغمة لحن C.F، أما الضغط الثاني إما أن يكون متوافقاً أو
          متنافراً، وعندما يكون متنافرا لابد أن يكون في شكل مروري Passing note
          ما بين النغمة التي قبله والنغمة التي تليه مقابل لحن C.F.
          <br />
          هناك اعتبارات إضافية في الكونترابنط للنوع الثاني وهي على النحو التّالي: 
        </Card>
        <div className="grid grid-cols-2 gap-x-8">
          <CardList
            list={[
              "يجوز البدء بنصف سكتة في الصوت المضاف",
              "يحذر استعمال الخامسة التامة أو الاكتاف، كجزء من الأنماط المتسلسلة والمتعاقبة(أي وسط التمرين).",
              "في المازورة الأولى يجب أن يبدأ بسكتة قيمتها بلانش.",
              "يجب أن ينتهي التمرين باستعمال شكل الروند مقابل روندوليس بلانش.",
              "كل مازورة يجب أن تحتوي على تألف واحد فقط، وليس تالفين مختلفين.",
              "المازورة الواحدة يجب أن يكون الضلع الأول من البلانش متناغماًConsonant ويبني على أساس (3، 6، 5، 8)",
              
            ]}
            />
          
          <CardList
            list={[
              "البلانش الثاني من كل مازورة يمكن أن يكون على طريقتين هما:",
              " يمكن أن تكون نغمة من داخل التآلف أو نغمة الأساس مع اللحن الثاني الذي يليه ويتم الوصول إليه بقفزة.",
              "نغمة من خارج التآلف، وتستعمل كنغمة عابرة (Passing Note) على أن تكون متصلة بنغمتين مختلفتين ما قبلها وما بعدها، ويمكن أن تؤلف نغمة المرور بين كل أنواع المسافات(محمد الملاح - 2010- ص 27، 28)"

          ]}
          />
          <Illustration
            src="notes/image015.png"
            desc="مثال النوع الثاني (روند مقابل 2 بلانش)"
          />
        </div>
      </Container>
    </div>
  );
}
