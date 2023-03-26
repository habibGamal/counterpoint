import { Button, Form, Input, message } from "antd";
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
export default function Auth() {
    const { setCanAccess } = UserAuth()!;
    const onFinish = async (values: any) => {
        try {
            // await createUserWithEmailAndPassword(auth, values.username + "@counterpoint.com", values.password)
            await signInWithEmailAndPassword(auth, values.username + "@counterpoint.com", values.password);
            setCanAccess!(true);
        } catch (e) {
            message.error("هذا المستخدم لا يمكنه استخدام البرنامج");
        }
    };
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ minWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="اسم المستخدم"
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="كلمة المرور"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button className="h-auto" type="primary" htmlType="submit">
                    دخول
                </Button>
            </Form.Item>
        </Form>
    );
}
