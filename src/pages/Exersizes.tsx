import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import Modal from '../compontents/Modal'
import PageTitle from '../compontents/PageTitle'
import { useAppDispatch } from '../hooks'
import { routerSlice } from '../slices/routerSlice'
import {motion} from 'framer-motion'
import { cardAnimation } from '../animation/card'
const data: any = {
    type1: {
        dourian:
        {
            key1: 'treble',
            key2: 'bass',
            voice1: "A|A|G|A|B|C'|C'|B|D'|^C'|D'|]",
            voice2: "D,|F,|E,|D,|G,|F,|A,|G,|F,|E,|D,|]",
        },
        phrygian:
        {
            key1: 'treble',
            key2: 'bass',
            voice1: "B|C'|F|G|A|C'|B|E'|D'|E'|]",
            voice2: "E,|C,|D,|C,|A,,|A,|G,|E,|F,|E,|]",
        },
        lydian:
        {
            key1: 'treble',
            key2: 'bass',
            voice1: "F|E|C|F|F|G|A|G|C|F|E|F|]",
            voice2: "F,|G,|A,|F,|D,|E,|F,|C|A,|F,|G,|F,|]",
        },
        mixolydian: {
            key1: 'treble',
            key2: 'bass',
            voice1: "G|E|D|G|G|G|A|B|G|C'|A|G|^F|G|]",
            voice2: "G,,|C,|B,,|G,,|C,|E,|D,|G,|F,|C,|D,|B,,|A,,|G,,|]",
        },
        aeolian:
        {
            key1: 'treble',
            key2: 'bass',
            voice1: "A|E|G|F|E|C|A,|B,|B,|A,|^G|A|]",
            voice2: "A,,|C,|B,,|D,|C,|E,|F,|E,|D,|C,|B,,|A,,|]",
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
    },
}
const Option = ({ title, onClick }: { title: string, onClick: () => void }) => {
    return <li onClick={onClick} className='p-2 my-2 border rounded hover:bg-secondary-400 hover:text-gray-100 cursor-pointer active:scale-95 transition-transform'>{title}</li>

}
const ExersizeModal = ({ state, close, exersizeType }: {
    state: boolean,
    close: () => void,
    exersizeType: number,
}) => {
    const dispatch = useAppDispatch();
    const play = (stage: string) => {
        dispatch(routerSlice.actions.pushTab({
            tab: 'Play', params: { editable: false, ...data.type1[stage] }
        }));
    }
    return (
        <Modal state={state} close={close}>
            <div className="p-4 font-sans min-w-[300px]">
                <h4 className='text-center text-2xl mb-4'>أختر المقام</h4>
                <ul className='text-xl'>
                    <Option onClick={() => play('dourian')} title="مقام دوريان" />
                    <Option onClick={() => play('phrygian')} title="مقام فريجيان" />
                    <Option onClick={() => play('lydian')} title="مقام ليديان" />
                    <Option onClick={() => play('mixolydian')} title="مقام مكسوليديان" />
                    <Option onClick={() => play('aeolian')} title="مقام الأيوليان" />
                </ul>
            </div>
        </Modal>
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
        <div className="my-8">
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
