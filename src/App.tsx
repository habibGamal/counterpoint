import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from './hooks';
import ConterpointTypes from './pages/ConterpointTypes';
import Home from './pages/Home';
import Rules from './pages/Rules';
import { routerSlice, Tab } from './slices/routerSlice';
import { motion } from 'framer-motion';
import Play from './Play';
import About from './pages/About';
import Type1 from './pages/conterpoint_types/Type1';
import Type2 from './pages/conterpoint_types/Type2';
import Type3 from './pages/conterpoint_types/Type3';
import Type4 from './pages/conterpoint_types/Type4';
import Type5 from './pages/conterpoint_types/Type5';
import Exersizes from './pages/Exersizes';
import Exams from './pages/Exams';
export default function App() {
    const { routeStack, routeParams } = useAppSelector(state => state.routerSlice);
    const dispach = useAppDispatch();
    const renderTab = (routeStack: Tab[]) => {
        const currentTab = routeStack[routeStack.length - 1];
        if (currentTab === 'Home') return <Home />;
        if (currentTab === 'Rules') return <Rules />;
        if (currentTab === 'ConterpointTypes') return <ConterpointTypes />;
        if (currentTab === 'Exersizes') return <Exersizes />;
        if (currentTab === 'Play') return <Play {...routeParams} />;
        if (currentTab === 'Exams') return <Exams />;
        if (currentTab === 'About') return <About />;
        if (currentTab === 'Type1') return <Type1 />;
        if (currentTab === 'Type2') return <Type2 />;
        if (currentTab === 'Type3') return <Type3 />;
        if (currentTab === 'Type4') return <Type4 />;
        if (currentTab === 'Type5') return <Type5 />;
    }
    return (
        <motion.div
            className='app rtl relative'>
            <div className="w-full h-[100px] piano-bg"></div>
            {renderTab(routeStack)}
            {
                routeStack[routeStack.length - 1] === 'Home' ||
                <button onClick={() => dispach(routerSlice.actions.pop())} className="rounded-full bg-secondary-400 w-[70px] h-[70px] flex items-center justify-center fixed bottom-4 left-4 shadow-xl">
                    <FontAwesomeIcon color='#fff' size='2x' icon={faAngleLeft} />
                </button>
            }
        </motion.div>
    )
}
