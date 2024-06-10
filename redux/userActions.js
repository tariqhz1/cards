import { createSlice, nanoid, current } from "@reduxjs/toolkit";

const initialState = {
  templates: {},
  cardInfo: {},
};

const Slice = createSlice({
  name: "personalizedCards",
  initialState,
  reducers: {
    templatesRecords: (state, action) => {
      state.templates = action.payload;
    },
    cardRecords: (state, action) => {
      state.cardInfo = action.payload;
    },
  },
});

export const { templatesRecords, cardRecords } = Slice.actions;

export default Slice.reducer;
