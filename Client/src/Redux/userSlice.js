import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null, // Initial state is null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload; // Set the user ID when dispatched
    },
    clearUserId: (state) => {
      state.userId = null; // Clear the user ID when logged out
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;
