import React, { useEffect, useLayoutEffect } from "react";
import "./lib/abc/abcjs-audio.css";
import { init } from "./lib/extend/js/init";
import { ArrowLeft2 } from "iconsax-react";
import { useAppDispatch } from "./hooks";
import { routerSlice } from "./slices/routerSlice";
import { onkeydownEvent } from "./lib/extend/js/ui/commands";
import { synthControl } from "./lib/extend/js/audio/audio";
import { testData as data } from "./TestData";
export default function Play({
    voice,
    location,
    exersizeType,
}: {
    exersizeType?: string;
    voice?: string;
    location?: string;
}) {
    const lockCF = (nd: any) => {
        if (location == "up") {
            nd.set_voiceLocked(0, true);
            nd.set_species(0, 0);
            nd.set_species(1, exersizeType);
        } else if (location == "down") {
            nd.set_voiceLocked(1, true);
            nd.set_species(1, 0);
            nd.set_species(0, exersizeType);
        }
    };
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (voice) init(voice, lockCF);
        else
            init(
                // debug down
                // "IgYAwgggzAAAgDGANhyAgaBAMBgAXAJwFMAjAGyJgBIAERGACjsQFJnr2Bydp-gMnZt6tejGZw4aEgEMAzrMRphSxAHwVMALgaAOBoB4GgFi7T9ANhnEATA2X6J-rfoAMO1ZiH62-nsQAIe0Q.RC9EH2CNCJhHRAACdwCgmhCtdjFESQBlAHsABwA6NAAhOQK4sCIKEgJpPCIAEzjZQgBXAHN2ima8aQI8AEsAO3aAWgAWAHYAVgqq0lr6htGWgg6uohXe.uGxqemAGNF4eAaABYBlgBogA_"
                // debug up
                // "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtjE1EYASNOADkQDJHYYBSLAagCZEDOADZEAYkYBWIYzEwAFB0QByZTHaYBq5QAgAlNLbq1WgCzG4nYS25zjWgOyIeomAfUAqPYa2DFjLbsbgFWOn6ISmH09jBq0ZraccoACJIhdCnM8NhopACGAM6FMAC4KbQA-BWIAHg1ZQ0ABA0AhA3VtPW05YhwaADKAPYADgB0aABCRWNNYMSUpIT5-MQAJk2FRACuAOa7lJv4-YT4AJYAdrsAtGaOUnMLZMura9dbhHsHxO.Hp5c3O5SAAxtDBAGg1gApgATAG-gA___"
                // with analisys
                // "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtjEAERGumWup-5hlx9r-bNUgQwDOg1qM5sJYjtO5w0AZQD2ABwB0aAEJDVAAjDFKpQv3zEAJjsFEArgHNblS.n6F8ASwB2tgLQAWAOwArHoGZMamZt5WhHYOxFHOrp4-AYEAMQzwMAAQZgBdAAkA9EA__"
                // without analisys
                "IgABEAwDckoEHgIAFADAAuAnApgIwBscwAEMU8kM86imy2qh5-iFePAQwGdu7-mrAYxEthYcPADKAewAOAOngAhHgoAEAYRxE8WThhwATdd2wBXAOaWipjJywYAlgDtLAWgAsAdgCsWnXx9QyN3MywrGxww-0dXDx9fABjKCBAASCMAGgBQnKA__"
            );
        window.onkeydown = onkeydownEvent;
        return () => {
            window.onkeydown = null;
            synthControl.pause();
        };
    }, []);
    useLayoutEffect(() => {
        document.body.style.background = "linear-gradient(166deg, #0e3069 , #3580bd 60%)";
        return () => {
            document.body.style.background = "";
        };
    }, []);
    return (
        <div className="load-bootstrap ltr w-full relative">
            {/* <ArrowLeftOutlined
                onClick={() => dispatch(routerSlice.actions.pop())}
            /> */}
            <ArrowLeft2
                className="absolute left-8 top-8 text-3xl text-white cursor-pointer transition hover:scale-110"
                size="32"
                color="#fff"
                onClick={() => dispatch(routerSlice.actions.pop())}
            />
            <div className="flex flex-col gap-4 justify-center min-h-screen">
                <div
                    id="toolbar"
                    className="no-print flex flex-wrap rounded-xl shadow-xl w-fit mx-auto  p-2 px-3 bg-[#ffffff0a] gap-1 items-center"
                />
                <div className="no-print hidden" style={{ position: "fixed", bottom: 50, right: 20, zIndex: 99 }}>
                    <a href="#" className="imgmo2" id="zoom-in">
                        <img alt="in" width={40} style={{ opacity: "0.15" }} src="img/zoom-in.png" />
                    </a>
                    <br />
                    <a href="#" className="imgmo2" id="zoom-out">
                        <img alt="out" width={40} style={{ opacity: "0.15" }} src="img/zoom-out.png" />
                    </a>
                </div>
                <div
                    id="toolbar2"
                    className="no-print flex flex-wrap rounded-xl shadow-xl w-fit mx-auto  p-2 px-3 bg-[#ffffff0a] gap-1 items-center"
                />
                <div
                    id="toolbar3"
                    className="no-print flex flex-wrap rounded-xl shadow-xl w-fit mx-auto  p-2 px-3 bg-[#ffffff0a] gap-1 items-center"
                />

                <div className="h-[500px] w-fit mx-auto rounded-xl shadow-xl bg-white pb-4" id="abc"></div>

                <div
                    id="toolbar4"
                    className="no-print relative z-20 flex flex-wrap rounded-xl shadow-xl w-fit mx-auto  p-2 px-3 bg-[#ffffff0a] gap-1"
                />
                <div id="customResults"></div>
                <div id="audio" className=""></div>
                <div className="p-1" id="testResult" />
                <div id="testResult2" />
                <table style={{ display: "none" }}>
                    <tbody>
                        <tr>
                            <td>&nbsp;</td>
                            <td>
                                <b>
                                    <a style={{ textDecoration: "none", color: "#2266aa" }} href="#" id="filename" />
                                </b>
                                <span>
                                    <a
                                        href="#"
                                        id="mode"
                                        style={{ display: "inline-block", fontWeight: "normal", color: "#77aaff" }}
                                    />
                                </span>
                                <span>
                                    <a href="#" id="tempo" style={{ display: "inline-block", color: "black" }} />
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div id="jquery_jplayer" />
                <div id="jplayer" />

                <div className="p-2" id="analysisConsole" />
            </div>
            <div>
                <div className="modal bg-[#00000038]" id="Modal1" tabIndex={-1} role="dialog">
                    <div id="ModalDialog1" className="modal-dialog" role="document">
                        <div className="modal-content !bg-sky-50">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalTitle1" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body max-h-[80vh] overflow-y-auto" id="ModalBody1" />
                            <div className="modal-footer" id="ModalFooter1" />
                        </div>
                    </div>
                </div>
                <div className="modal" id="Modal2" tabIndex={-1} role="dialog">
                    <div id="ModalDialog2" className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalTitle2" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body" id="ModalBody2" />
                            <div className="modal-footer" id="ModalFooter2" />
                        </div>
                    </div>
                </div>
                <div style={{ display: "none" }} id="console"></div>
            </div>
        </div>
    );
}
