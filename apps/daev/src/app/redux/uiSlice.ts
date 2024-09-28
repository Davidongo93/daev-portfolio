import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  cliMode: boolean;
}

const initialState: UiState = {
  cliMode: true, // Por defecto, iniciamos en `cli`
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCliMode: (state, action: PayloadAction<boolean>) => {
      state.cliMode = action.payload;
    },
  },
});

export const { setCliMode } = uiSlice.actions;
export default uiSlice.reducer;
