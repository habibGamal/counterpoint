import React, { useEffect, useLayoutEffect } from "react";
import { init } from "./lib/extend/js/init";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useAppDispatch } from "./hooks";
import { routerSlice } from "./slices/routerSlice";
import { onkeydownEvent } from "./lib/extend/js/ui/commands";
import { synthControl } from "./lib/extend/js/audio/audio";
const data: any = {
    dorian: {
        soprano:
            "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtiYASABERgDJ7EByFmAUg4AoP2GzBtwZ0GMFnGxpSAQwDO8xBwniV6tZoYbtiOGgDKAewAOAOjQAhBWYAEYYpVKFZ-YgBNb8ogFcA5n6UXviyhPgAlgB2fgC0ACwA7ACs9o5kLm7uMd6E.oHE2SFhUbGJSQAx4vCI7gBIADoAvUA_",
        bass: "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtjEAERGumWup-5hlx9r-bNUgQwDOgmAFwWAfBYACFgDwWAQhmT5LcdzhoAygHsADgDo0AISGHpYYpVKF--YgBNpgogFcA5h8ov8.QvgAlgB2HgC0ACwA7ACsltZkdg6OYa6Ent7EqX4BIeHRMQAxDHQAEI4AKAA.2EA__",
    },
    lydian: {
        soprano:
            "IgYAwgggzAAAgDGANhyAgaBAMBgAXAJwFMAjAGyJgDIAERGAcjsQApnr2ASdgUndvoAqdm3pN6A-szgAoNCQCGAZyWJ2MdZvobtWqboP6jcNAGUA9gAcAdGgBCy6wAIwRCiQIK8RACZOlhACuAObBFP54CgR4AJYAdsEAtAAsAOwArC5upJ7ePokBBCFhRAWR0fFJaekAMdrwMACgPgBIPgATQA_",
        bass: "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtjEAERGumWup-5hlx9rtnhNUgIYBnITAD4LAAQsAhCwl0AuCwB482SwDEGutLoL4aAMoB7AA4A6NACFhFyWGKVShAfmIATSUKIBXAOb-lN74AoT4AJYAdv4AtAAsAOwArA5OZK7uHrE-hAFBxDmh4dFxSckAMQx0ANAeAEj4AIVAA",
    },
    frigian: {
        soprano:
            "IgYAwgggzAAAgDGANhyAgaBAMBgAXAJwFMAjAGyJgFIAERGAYjsQBJnr2AKdgMnYHJ2ten3rD4AKDQkAhgGc5idjGWr6K9WvpaliOGgDKAewAOAOjQAheWYAEYIhRIEZeIgBNbcwgFcA5n4UXngyBHgAlgB2fgC0ACwA7ACs9o6kLm7uMd4E.oFE2SFhUbGJSQAx6vQAoO4ASAB.ALFAA___",
        bass: "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtjEAERGumWup-5hlx9rt-bNUgIYBnITAB4LADgsAuFJYAsFgGxZLCXQD46jkzhoAygHsADgDo0AIWFmABGGKVShAfmIATW0KIBXAOZ-lF74AoT4AJYAdn4AtAAsAOwArPaOZC5u7jHehP6BxNkhYVGxiUkAMQzwMLjuAEikABNAA_",
    },
    maxolidian: {
        soprano:
            "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtiYByABERgCp7EBKFmACg-YYBoOAag4A6DgIa9EwhuwbcGdRHGxpSAQwDOmxBxh6DDfUcMNTuk5bNW4aAMoB7AA4i0AIS0iABGGKVShOr4xAAmXppEAK4A5tGU4fjqhPgAlgB20QC0ACwA7ACsPn5kgcEhmRGEMXHEFYnJ6Vl5-QAxRgwgIQBIAB7AQA_",
        bass: "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtjEAERGumWup-5hlx9rtn11hNKQCGAZxEwAmCwA4LANgsAWDJYA8FgFwWAfDUq6WugrrK6UxHDQBlAPYAHAHRoAQqIcACMMUqlCQ.MQAJu4iRACuAOYRlCH4QoT4AJYAdhEAtAAsAOwArJ7eZH4BgWmhhJHRxKVxCSnp2TkAMQwMgQCouBJAA",
    },
    iolian: {
        soprano:
            "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtiYAKABERgCp7EBKFmAag-YYBoOAWg4CG3BrzYc6iONjSkAhgGdliDjA1aGmndob71e4.DQBlAPYAHAHRoAQipsACMMUqlCi.MQAmz5SIAVwBzEMoA.EVCfABLADsQwQAWAHYAVld3Mi8fX0FAwlDw4gKomISktPSAGJ0GAGhfACQADwBPIA_",
        bass: "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtjEAERGumWup-5hlx9rtnubNUgEMAzsJgAsFgBwWAbBYBcaSwB4LAPirFyuvLqTEcNAGUA9gAcAdGgBCIywAIwxSqUKD8xACYPhRAK4A5oGUvviChPgAlgB2gQC0ACwA7ACsTi5k7p5e8X6EQSHEeeGRsQkpqQAxDPAwANBeAEgAngD7QA___",
    },
    ionian: {
        soprano:
            "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtiYBiABERgFJ7EAyFmAcg-YYAoO3BrzY8OAEg51EcbGlIBDAM5LEHGOs0MN2rQz1rdR-GgDKAewAOAOjQAhZdYAEYYpVKEF-YgBMnSogBXAHNgyn98BUJ8AEsAO2CAWgAWAHYAVhc3Mk9vH0SAwhCw4gLI6PiktPSAGO0GAGgfACQADwApoA_",
        bass: "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtjEAERGumWup-5hlx9rtnubNUgEMAzsJgAcFgDwWAfBYACaSwCEi5XXl0ZdALgtJiOGgDKAewAOAOjQAhEVYVhilUoUH5iAEwXCiAVwBzQMpffEFCfABLADtAgFoAFgB2AFYnFzJ3Ty94v0IgkOI88MjYhJTUgBiGOgBoLwAkAE8AAKA_",
    },
    locrian: {
        soprano:
            "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtiYBKABERgCp7EBqFmAGg4DoOBaDtwZ8Gwth2YM6iONjSkAhgGdliDjA1aGmndob71e4.DQBlAPYAHHmgBCKngAIwxSqUKL8xACZPlRACuAObBlP74ioT4AJYAdsH8ACwA7ACsLm5knt4-.AGEIWHE-ZHR8YmpaQAxOgwA0D4ASADeAApAA__",
        bass: "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtjEAERGumWup-5hlx9rtnubNUgEMAzsJgBsFgBwWAXBYA8FgAIWAfEUrNdeXRl1JiOGgDKAewAOAOjQAhEVeVhilUoUH5iAE2XCiAVwBzQMpffEFCfABLADtAgFoAFgB2AFYnFzJ3Ty94v0IgkOI88MjYhJTUgBiGeBgAcC8AJAAvAFsgA___",
    },
    default: "",
};
export default function Play({ stage, cantus }: { stage?: string; cantus?: string }) {
    console.log("executed");

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (stage && cantus && data[stage] && data[stage][cantus]) init(data[stage][cantus]);
        else
            init(
                // debug
                "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtjE1EYASNOADkQDJHYYBSLAagCZEDOADZEAYkYBWIYzEwAFB0QByZTHaYBq5QAgAlNLbq1WgCzG4nYS25zjWgOyIeomAfUAqPYa2DFjLbsbgFWOn6ISmH09jBq0ZraccoACJIhdCnM8NhopACGAM6FMAC4KbQA-BWIAHg1ZQ0ABA0AhA3VtPW05YhwaADKAPYADgB0aABCRWNNYMSUpIT5-MQAJk2FRACuAOa7lJv4-YT4AJYAdrsAtGaOUnMLZMura9dbhHsHxO.Hp5c3O5SAAxtDBAGg1gApgATAG-gA___"
                // with analisys
                // "IgYAwgggzAAAgDGANhyAgaBAAoAYAFwCcBTAIwBtjEAERGumWup-5hlx9r-bNUgQwDOg1qM5sJYjtO5w0AZQD2ABwB0aAEJDVAAjDFKpQv3zEAJjsFEArgHNblS.n6F8ASwB2tgLQAWAOwArHoGZMamZt5WhHYOxFHOrp4-AYEAMQzwMAAQZgBdAAkA9EA__"
                // // without analisys
                // "IgABEAwDckoEHgIAFADAAuAnApgIwBscwAEMU8kM86imy2qh5-iFePAQwGdu7-mrAYxEthYcPADKAewAOAOngAhHgoAEAYRxE8WThhwATdd2wBXAOaWipjJywYAlgDtLAWgAsAdgCsWnXx9QyN3MywrGxww-0dXDx9fABjKCBAASCMAGgBQnKA__"
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
            <ArrowLeftOutlined
                onClick={() => dispatch(routerSlice.actions.pop())}
                className="absolute left-8 top-8 text-3xl text-white cursor-pointer transition hover:scale-110"
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
                <div className="p-2 hidden" id="analysisConsole" />
                <div style={{ display: "none" }} id="console"></div>
            </div>
        </div>
    );
}
