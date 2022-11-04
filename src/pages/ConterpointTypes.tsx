import React from 'react'
import image1 from '../assets/notes/image013.png';
import image2 from '../assets/notes/image015.png';
import image3 from '../assets/notes/image017.jpg';
import image4 from '../assets/notes/image019.jpg';
import image5 from '../assets/notes/image021.jpg';
import musicIcon from '../assets/sol.png';
import { motion } from 'framer-motion';
import PageTitle from '../compontents/PageTitle';
import Illustration from '../compontents/Illustration';
import { faShapes } from '@fortawesome/free-solid-svg-icons';
import Section from '../compontents/Section';
import ListItems from '../compontents/ListItems';
import AnimatedP from '../compontents/AnimatedP';
import ListItem from '../compontents/ListItem';
import { useAppDispatch } from '../hooks';
import {routerSlice} from '../slices/routerSlice';


export default function ConterpointTypes() {
    const dispatch = useAppDispatch();
    return (
        <div className='my-8'>
            <PageTitle title='انواع الكونتربوينت' icon={faShapes} />
            <div className="grid grid-cols-2 gap-8 mt-8">
                <Illustration
                    onClick={()=>dispatch(routerSlice.actions.pushTab('Type1'))}
                    description="مثال النوع الأول (روند مقابل روند)"
                    src={image1}
                />

                <Illustration
                    onClick={()=>dispatch(routerSlice.actions.pushTab('Type2'))}
                    description="مثال النوع الثاني (روند مقابل 2 بلانش)"
                    src={image2}
                />

                <Illustration
                    onClick={()=>dispatch(routerSlice.actions.pushTab('Type3'))}
                    description="مثال النوع الثالث (روند مقابل 4 نوار)"
                    src={image3}
                />

                <Illustration
                    onClick={()=>dispatch(routerSlice.actions.pushTab('Type4'))}
                    description="مثال النوع الرابع (السنكوب)"
                    src={image4}
                />

                <Illustration
                    onClick={()=>dispatch(routerSlice.actions.pushTab('Type5'))}
                    description="مثال النوع الخامس (الكونتربوينت المزخرف)"
                    src={image5}
                />
            </div>
            
        </div>
    )
}
