import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export type Tab = 'Home' | 'Rules' | 'ConterpointTypes' | 'Exersizes' | 'Play' | 'Exams' | 'About' | 'Type1' | 'Type2' | 'Type3' | 'Type4' | 'Type5';
// Define a type for the slice state
interface RouterState {
    routeStack: Tab[];
    routeParams: any;
}

// Define the initial state using that type
const initialState: RouterState = {
    routeStack: ['Home'],
    routeParams: null,
}

export const routerSlice = createSlice({
    name: 'router',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        pushTab: (state, action: PayloadAction<{ tab: Tab, params?: any }>) => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            state.routeStack.push(action.payload.tab);
            state.routeParams = action.payload.params;
            console.log(state.routeStack);
            
        },
        pop: (state) => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
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