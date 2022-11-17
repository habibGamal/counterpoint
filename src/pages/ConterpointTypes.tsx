import React from 'react'
import { motion } from 'framer-motion';
import PageTitle from '../compontents/PageTitle';
import { faShapes } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../hooks';
import { routerSlice } from '../slices/routerSlice';
import { cardAnimation } from '../animation/card';
const Type = ({ name, onClick,delay }: { name: string, onClick: () => {},delay?:number }) => {
    return (
        <>
            <motion.div {...cardAnimation(delay)} onClick={onClick} className="custom-shadow rounded text-center w-[400px] cursor-pointer ">
                <h2 className="p-8 text-3xl text-primary-100">{name}</h2>
            </motion.div>
        </>
    )
}

export default function ConterpointTypes() {
    const dispatch = useAppDispatch();
    return (
        <div className='mb-8'>
            <PageTitle title='انواع الكونتربوينت' icon={faShapes} />
            <div className="grid-cols-2 grid gap-8 justify-items-center my-16 max-w-[900px] mx-auto">
                <Type
                // delay={.05}
                    name="النوع الأول"
                    onClick={() => dispatch(routerSlice.actions.pushTab({ tab: 'Type1' }))}
                />

                <Type
                // delay={.1}
                    onClick={() => dispatch(routerSlice.actions.pushTab({ tab: 'Type2' }))}
                    name="النوع الثاني"
                />

                <Type
                // delay={.15}
                    onClick={() => dispatch(routerSlice.actions.pushTab({ tab: 'Type3' }))}
                    name="النوع الثالث"
                />

                <Type
                // delay={.2}
                    onClick={() => dispatch(routerSlice.actions.pushTab({ tab: 'Type4' }))}
                    name="النوع الرابع"
                />

                <Type
                // delay={.25}
                    onClick={() => dispatch(routerSlice.actions.pushTab({ tab: 'Type5' }))}
                    name="النوع الخامس"
                />
            </div>

        </div>
    )
}
