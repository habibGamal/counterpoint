import { Button } from "antd";
import { useAppDispatch } from "../hooks";
import { Tab, routerSlice } from "../slices/routerSlice";

export default function Home() {
    const dispatch = useAppDispatch();
    const changeTab = (tab: Tab) =>
        dispatch(routerSlice.actions.changeTab(tab));
    return (
        <div className="flex flex-col justify-center gap-8 items-center bg-home-image w-full min-h-screen">
            <div className="grid grid-cols-2 -mt-24 justify-items-center items-center mx-8">
                <div className="mr-16">
                    <h1 className="text-sky-900 text-5xl 2xl:text-8xl font-bold mb-4">
                        تعلُم الكونتربوينت
                    </h1>
                    <p className="text-sky-600 text-3xl font-bold">
                        برنامج تعلم اساسيات الكونتربوينت بالتمارين والاختبارات
                    </p>
                </div>
                <img className="" src="illustrations/home.png" />
            </div>
            <Button
                htmlType="submit"
                type="primary"
                size="large"
                className="flex items-center gap-2"
                onClick={() => changeTab("Rules")}
            >
                تعرف على قواعد الكونتربوينت
                <img className="w-6  icon-white" src={`icons/arrow-left.svg`} />
            </Button>
        </div>
    );
}
