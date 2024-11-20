import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: null, // Initial state for error
  reducers: {
    setError: (state, action) => action.payload, // Set error from payload
    clearError: () => null, // Clear error
  },
});

export const { setError, clearError } = errorSlice.actions; // Export actions
export default errorSlice.reducer; // Export reducer 