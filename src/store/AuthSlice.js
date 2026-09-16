import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {authState: localStorage.getItem('hotstar-loggedin') ? JSON.parse(localStorage.getItem('hotstar-loggedin')) : {},
                 
},
reducers:{
    setAuthStatus(state, action){
        state.authState = action.payload
        localStorage.setItem('hotstar-loggedin', JSON.stringify(state.authState))
    },
    logout(state, action){
        state.authState = {status: false, email: ''}
        localStorage.setItem('hotstar-loggedin', JSON.stringify(state.authState))
    }
}
})

export const authSliceActions = authSlice.actions

export default authSlice