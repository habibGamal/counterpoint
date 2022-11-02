import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export type Tab = 'Home' | 'Rules' | 'ConterpointTypes';
// Define a type for the slice state
interface RouterState {
    currentTab: Tab
}

// Define the initial state using that type
const initialState: RouterState = {
    currentTab: 'Home',
}

export const routerSlice = createSlice({
    name: 'router',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        changeTab: (state, action: PayloadAction<Tab>) => {
            state.currentTab = action.payload;
        },
    },
})

export default routerSlice.reducer