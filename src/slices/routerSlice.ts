import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export type Tab = 'Home' | 'Rules' | 'ConterpointTypes' | 'Play' | 'Tests' | 'About' | 'Type1' | 'Type2' | 'Type3' | 'Type4' | 'Type5';
// Define a type for the slice state
interface RouterState {
    currentTab: Tab;
    routeStack: Tab[];
}

// Define the initial state using that type
const initialState: RouterState = {
    currentTab: 'Home',
    routeStack: ['Home']
}

export const routerSlice = createSlice({
    name: 'router',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        pushTab: (state, action: PayloadAction<Tab>) => {
            // state.currentTab = action.payload;
            window.scrollTo({top:0,behavior:'smooth'})
            state.routeStack.push(action.payload);
        },
        pop: (state) => {
            window.scrollTo({top:0,behavior:'smooth'})
            state.routeStack.pop();
        },
        changeTab: (state, action: PayloadAction<Tab>) => {
            if (state.routeStack.length > 0)
                state.routeStack[state.routeStack.length - 1] = action.payload;
            else
                state.routeStack[0] = action.payload;
        },
    },
})

export default routerSlice.reducer