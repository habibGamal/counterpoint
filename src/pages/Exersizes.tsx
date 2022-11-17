import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import Modal from '../compontents/Modal'
import PageTitle from '../compontents/PageTitle'
import { useAppDispatch } from '../hooks'
import { routerSlice } from '../slices/routerSlice'
import { motion } from 'framer-motion'
import { cardAnimation } from '../animation/card'
const data: any = {
    type1: {
        dourian:
        {
            up: {
                key1: 'treble',
                key2: 'bass',
                voice1: "D|F|E|D|G|F|A|G|F|E|D|]",
                voice2: "D,|D,|A,|F,|E,|D,|F,|C|D|^C|D|]",
            },
            down: {
                key1: 'treble',
                key2: 'bass',
                voice1: "A|A|G|A|B|C'|C'|B|D'|^C'|D'|]",
                voice2: "D,|F,|E,|D,|G,|F,|A,|G,|F,|E,|D,|]",
            }
        },
        phrygian: {
            up:
            {
                key1: 'treble',
                key2: 'bass',
                voice1: "E|C|D|C|A,|A|G|E|F|E|]",
                voice2: "E,|A,|D,|E,|F,|F,|C|C|D|E|]",
            },
            down:
            {
                key1: 'treble',
                key2: 'bass',
                voice1: "B|C'|F|G|A|C'|B|E'|D'|E'|]",
                voice2: "E,|C,|D,|C,|A,,|A,|G,|E,|F,|E,|]",
            }
        },
        lydian: {
            up:
            {
                key1: 'treble',
                key2: 'bass',
                voice1: "F|G|A|F|D|E|F|C'|A|F|G|F|]",
                voice2: "F,|E,|F,|A,|_B,|G,|A,|E,|F,|D,|E,|F,|]",
            },
            down:
            {
                key1: 'treble',
                key2: 'bass',
                voice1: "F|E|C|F|F|G|A|G|C|F|E|F|]",
                voice2: "F,|G,|A,|F,|D,|E,|F,|C|A,|F,|G,|F,|]",
            }
        },
        mixolydian: {
            up:
            {
                key1: 'treble',
                key2: 'bass',
                voice1: "G,|C|B,|G,|C|E|D|G|F|C|D|B,|A,|G,|]",
                voice2: "G,|A,|G,|E,|E,|C,|G,|B,|C|A,|^F,|G,|^F,|G,|]",
            },
            down:
            {
                key1: 'treble',
                key2: 'bass',
                voice1: "G|E|D|G|G|G|A|B|G|C'|A|G|^F|G|]",
                voice2: "G,,|C,|B,,|G,,|C,|E,|D,|G,|F,|C,|D,|B,,|A,,|G,,|]",
            }
        },
        aeolian: {
            up:
            {
                key1: 'treble',
                key2: 'bass',
                voice1: "A|C'|B|D'|C'|E'|F'|E'|D'|C'|B|A|]",
                voice2: "A,|A,|G,|F,|E,|E,|D,|C,|G,|A,|^G,|A,|]",
            },
            down:
            {
                key1: 'treble',
                key2: 'bass',
                voice1: "A|E|G|F|E|C|A,|B,|B,|A,|^G|A|]",
                voice2: "A,,|C,|B,,|D,|C,|E,|F,|E,|D,|C,|B,,|A,,|]",
            }
        },
    },
    type3: {
        dourian:
        {
            key1: 'treble',
            key2: 'treble',
            voice1: "D/4E/4F/4G/4|A/4B/4C'/4D'/4|E'/4D'/4B/4C'/4|_B/4C'/4D'/4E'/4|F'/4F/4A/4_B/4|C'/4A/4_B/4C'/4|_B/4A/4G/4B/4|A/4D/4E/4F/4|G/4A/4B/4^C'/4|D'|]",
            voice2: "D|F|E|G|F|A|G|F|E|D|]",
        }
    }
}
const Option = ({ title, onClick }: { title: string, onClick: () => void }) => {
    return <li onClick={onClick} className='p-2 my-2 border rounded hover:bg-secondary-400 hover:text-gray-100 cursor-pointer active:scale-95 transition-transform'>{title}</li>

}
const ChooseCantusModal = ({ state, close, exersizeType, stage }: {
    state: boolean,
    close: () => void,
    exersizeType: number,
    stage: string,
}) => {
    const dispatch = useAppDispatch();
    const play = (cantus: string) => {
        dispatch(routerSlice.actions.pushTab({
            tab: 'Play', params: { editable: false, ...data.type1[stage][cantus], index: cantus === 'up' ? 1 : 0 }
        }));
    }
    return (
        <Modal state={state} close={close}>
            <div className="p-4 font-sans min-w-[300px]">
                <h4 className='text-center text-2xl mb-4'>Cantus firmus</h4>
                <ul className='text-xl text-left'>
                    <Option onClick={() => play('up')} title="Soprano" />
                    <Option onClick={() => play('down')} title="Bass" />
                </ul>
            </div>
        </Modal>
    )
}
const ExersizeModal = ({ state, close, exersizeType }: {
    state: boolean,
    close: () => void,
    exersizeType: number,
}) => {
    const [modalState, setModalState] = useState(false);
    const [stage, setStage] = useState('dourian');
    const open = (stage: string) => {
        close();
        setStage(stage)
        setModalState(true)
    };
    const closeChooseModal = () => setModalState(false);
    return (
        <>
            <ChooseCantusModal state={modalState} close={closeChooseModal} exersizeType={exersizeType} stage={stage} />
            <Modal state={state} close={close}>
                <div className="p-4 font-sans min-w-[300px]">
                    <h4 className='text-center text-2xl mb-4'>أختر المقام</h4>
                    <ul className='text-xl'>
                        <Option onClick={() => open('dourian')} title="مقام دوريان" />
                        <Option onClick={() => open('phrygian')} title="مقام فريجيان" />
                        <Option onClick={() => open('lydian')} title="مقام ليديان" />
                        <Option onClick={() => open('mixolydian')} title="مقام مكسوليديان" />
                        <Option onClick={() => open('aeolian')} title="مقام الأيوليان" />
                        <Option onClick={() => null} title="مقام اوكريان" />
                        <Option onClick={() => null} title="مقام ايونيان" />
                    </ul>
                </div>
            </Modal>
        </>
    )
}
const Exersize = ({ name, exersizeType }: { name: string, exersizeType: number }) => {
    const [modalState, setModalState] = useState(false);
    const open = () => setModalState(true);
    const close = () => setModalState(false);
    return (
        <>
            <ExersizeModal state={modalState} close={close} exersizeType={exersizeType} />
            <motion.div {...cardAnimation()} onClick={() => open()} className="custom-shadow rounded text-center w-[400px] cursor-pointer">
                <h2 className="p-8 text-3xl text-primary-100">{name}</h2>
            </motion.div>
        </>
    )
}
export default function Exersizes() {
    return (
        <div className="mb-8">
            <PageTitle title='تمارين محلولة' icon={faChalkboardUser} />
            {/* <Modal state={modalState} close={close} /> */}
            <div className="grid-cols-2 grid gap-8 justify-items-center my-16 max-w-[900px] mx-auto">
                <Exersize
                    name='تمرين النوع الاول'
                    exersizeType={0}
                />
                <Exersize
                    name='تمرين النوع االثاني'
                    exersizeType={1}
                />
                <Exersize
                    name='تمرين النوع الثالث'
                    exersizeType={2}
                />
                <Exersize
                    name='تمرين النوع الرابع'
                    exersizeType={3}
                />
                <Exersize
                    name='تمرين النوع الخامس'
                    exersizeType={4}
                />
            </div>
        </div>
    )
}
