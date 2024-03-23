// import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import {
    doc,
    onSnapshot,
    updateDoc,
    setDoc,
    deleteDoc,
    collection,
    serverTimestamp,
    getDocs,
    query,
    where,
    orderBy,
    getDoc,
    limit,
} from "firebase/firestore";
import db, { auth } from "./firebase";

import { UserAuth } from "./context/AuthContext";
import firebase from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
export default function Auth() {
    const { setCanAccess } = UserAuth()!;
    const [values, setValues] = useState({ username: "", password: "" });
    const updateValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const [isError, setIsError] = useState(false);
    const onFinish = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // await createUserWithEmailAndPassword(auth, values.username + "@counterpoint.com", values.password)
            await signInWithEmailAndPassword(auth, values.username + "@counterpoint.com", values.password);
            setCanAccess!(true);
        } catch (e) {
            setIsError(true);
            // message.error("هذا المستخدم لا يمكنه استخدام البرنامج");
        }
    };
    const [showPass, setShowPass] = useState(false);
    return (
        <>
            <div className="flex w-full max-w-[500px]  flex-col justify-center px-6 py-12 lg:px-8">
                {isError && (
                    <div className="rounded-xl border border-red-500 bg-red-100 p-4">
                        <p>تأكد من اسم المستخدم وكلمة المرور</p>
                    </div>
                )}
                <div className="mt-10 w-full">
                    <form className="space-y-6" onSubmit={onFinish}>
                        <div>
                            <label htmlFor="username" className="block text-xl font-medium leading-6 text-gray-900">
                                اسم المستخدم
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={values.username}
                                    required
                                    onChange={updateValues}
                                    className="text-xl block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block font-medium leading-6 text-xl text-gray-900">
                                    كلمة المرور
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPass ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={values.password}
                                    onChange={updateValues}
                                    required
                                    className="text-xl block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <input id="showPass" type="checkbox" onChange={(e) => setShowPass(!showPass)} />
                                <label htmlFor="showPass" className="mx-4 font-medium leading-6 text-xl text-gray-900">
                                    اظهار كلمة المرور
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                دخول
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
        // <Form
        //     name="basic"
        //     labelCol={{ span: 8 }}
        //     wrapperCol={{ span: 16 }}
        //     style={{ minWidth: 600 }}
        //     initialValues={{ remember: true }}
        //     onFinish={onFinish}
        //     autoComplete="off"
        // >
        //     <Form.Item
        //         label="اسم المستخدم"
        //         name="username"
        //         rules={[{ required: true, message: "Please input your username!" }]}
        //     >
        //         <Input />
        //     </Form.Item>

        //     <Form.Item
        //         label="كلمة المرور"
        //         name="password"
        //         rules={[{ required: true, message: "Please input your password!" }]}
        //     >
        //         <Input.Password />
        //     </Form.Item>

        //     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        //         <Button classNameName="h-auto" type="primary" htmlType="submit">
        //             دخول
        //         </Button>
        //     </Form.Item>
        // </Form>
    );
}
