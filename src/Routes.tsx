import Rules from "./pages/Rules";
import CounterpointTypes from "./pages/CounterpointTypes";
import Type1 from "./pages/counterpoint_types/Type1";
import Type3 from "./pages/counterpoint_types/Type3";
import Type4 from "./pages/counterpoint_types/Type4";
import Type2 from "./pages/counterpoint_types/Type2";
import Type5 from "./pages/counterpoint_types/Type5";
import Exersizes from "./pages/Exersizes";
import Questions from "./pages/Questions";
import Exams from "./pages/Exams";
import About from "./pages/About";
import Home from "./pages/Home";
import Play from "./Play";
import MelodyHorizontalRules from "./pages/MelodyHorizontalRules";
import PlayWithNoControls from "./PlayWithNoControls";
import UploadExersizes from "./pages/UploadExersizes";
import ProgramKeys from "./pages/ProgramKeys";
import UploadExams from "./pages/UploadExams";
import {
    Add,
    ClipboardTick,
    DocumentText,
    Edit,
    HambergerMenu,
    Home2,
    InfoCircle,
    KeyboardOpen,
    Logout,
    NoteAdd,
    Ruler,
    RulerPen,
    Shapes,
} from "iconsax-react";
import { Tab } from "./slices/routerSlice";

type Routes = {
    [key in Tab]: {
        icon?: JSX.Element;
        text: string;
        component: (...args: any) => JSX.Element;
    };
};

export const routes: Routes = {
    Home: { icon: <Home2 />, text: "الرئيسية", component: Home },
    About: { icon: <InfoCircle />, text: "ادارة البرنامج", component: About },
    ProgramKeys: { icon: <KeyboardOpen />, text: "مفاتيح استخدام البرنامج", component: ProgramKeys },
    MelodyHorizontalRules: {
        icon: <Ruler />,
        text: "قواعد اللحن الافقي C.F",
        component: MelodyHorizontalRules,
    },
    Rules: { icon: <RulerPen />, text: "المقامات الكنائسية", component: Rules },
    ConterpointTypes: { icon: <Shapes />, text: "قواعد الكنتربوينت", component: CounterpointTypes },
    Exersizes: { icon: <ClipboardTick />, text: "نماذج استرشادية", component: Exersizes },
    Exams: { icon: <Edit />, text: "اختبر نفسك", component: Exams },
    Play: {
        icon: <NoteAdd />,
        text: "انشاء مقطوعة",
        component: Play,
    },
    Questions: { icon: <DocumentText />, text: "اسئلة", component: Questions },
    UploadExams: { text: "اضافة اختبارات", component: UploadExams },
    UploadExersizes: { text: "اضافة نماذج استرشادية", component: UploadExersizes },
    PlayWithNoControls: { text: "انشاء مقطوعة", component: PlayWithNoControls },
    Type1: { text: "النوع الاول", component: Type1 },
    Type2: { text: "النوع الثاني", component: Type2 },
    Type3: { text: "النوع الثالث", component: Type3 },
    Type4: { text: "النوع الرابع", component: Type4 },
    Type5: { text: "النوع الخامس", component: Type5 },
};
