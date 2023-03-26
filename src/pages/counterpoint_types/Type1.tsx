import React from "react";
import Container from "../../compontents/Container";
import PageTitle from "../../compontents/PageTitle";
import AvatarTitle from "../../compontents/AvatarTitle";
import CardList from "../../compontents/CardList";
import Card from "../../compontents/Card";
import Illustration from "../../compontents/Illustration";

export default function Type1() {
  return (
    <div className="w-full">
      <PageTitle
        title="انواع الكونتربوينت"
        subTitle="النوع الأول (روند مقابل روند)"
        iconSrc="icons/shapes.svg"
      />
      <Container>
        <AvatarTitle
          title="النوع الأول (روند مقابل روند)"
          avatar="illustrations/rules1.png"
        />
        <Card>
          وهو نغمة مقابل نغمة، حيث يكون لحن C.F عبارة عن نغمة مدونة بأي شكل
          إيقاعي (روند أو بلانش أو نوار .....) ويقابلها في لحن C.P نفس الشكل
          الإيقاعي مع مراعاة القواعد السابقة في وضع لحن C.P من الناحية الأفقية
          والرأسية، هناك بعض القوانين الخاصة للنوع الأول ومنها{" "}
        </Card>
        <div className="grid grid-cols-2 gap-x-8">
          <CardList
            list={[
              "عدم استعمال نغمة الأساس (Unison) إلا في المازورة الأولى والأخيرة.",
              "يمكن استعمال الخامسة أو بدل منها الأكتاف لمرة واحدة فقط داخل التمرين وذلك لما يحدث من تناغماً فارغاً.",
              "نستعمل داخل التمرين المسافات الثالثة والسادسة (3، 6)",
              "لا يجوز تكرار استعمال الثالثة أو السادسة أكثر من ثلاث مرات متتالية أو تكرار النغمات.",
            ]}
          />
          <Illustration 
            src="notes/image013.png"
            desc="تحسب المسافات دائماً من الأسفل إلى الأعلى سواء كان اللحن المعطى في الأسفل أو الأعلى. 
            في المثال رقم (1) وفي الجزأين، Cantus firmus الجزء السفلي. 
            "
          />
        </div>
      </Container>
    </div>
  );
}
