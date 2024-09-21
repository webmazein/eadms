import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log(action, "in slice")
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      console.log('in slice')
      state.isAuthenticated = false
      state.user = null
      state.token = null
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
