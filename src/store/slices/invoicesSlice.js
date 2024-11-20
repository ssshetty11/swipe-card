import { createSlice } from '@reduxjs/toolkit';

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: [],
  reducers: {
    setInvoices: (state, action) => action.payload,
  },
});

export const { setInvoices } = invoicesSlice.actions;
export default invoicesSlice.reducer;
