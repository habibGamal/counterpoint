import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from './hooks';
import ConterpointTypes from './pages/ConterpointTypes';
import Home from './pages/Home';
import Rules from './pages/Rules';
import { routerSlice, Tab } from './slices/routerSlice';
import { motion } from 'framer-motion';
export default function App() {
    const currentTabName = useAppSelector(state => state.routerSlice.currentTab);
    const dispach = useAppDispatch();

    const renderTab = (currentTab: Tab) => {
        if (currentTab === 'Home') return <Home />;
        if (currentTab === 'Rules') return <Rules />;
        if (currentTab === 'ConterpointTypes') return <ConterpointTypes />;
    }
    return (
        <motion.div
            className='app rtl relative'>
            <div className="w-full h-[100px] piano-bg"></div>
            {renderTab(currentTabName)}
            {
                currentTabName === 'Home' ||
                <button onClick={() => dispach(routerSlice.actions.changeTab('Home'))} className="rounded-full bg-secondary-400 w-[70px] h-[70px] flex items-center justify-center fixed bottom-4 left-4 shadow-xl">
                    <FontAwesomeIcon color='#fff' size='2x' icon={faAngleLeft} />
                </button>
            }
        </motion.div>
    )
}
