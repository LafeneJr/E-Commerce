import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  keyword: string;
}

const initialState: FilterState = {
  searchQuery: "",
  selectedCategory: "",
  minPrice: undefined,
  maxPrice: undefined,
  keyword: "",
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number | undefined>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | undefined>) => {
      state.maxPrice = action.payload;
    },
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = "";
      state.selectedCategory = "";
      state.minPrice = undefined;
      state.maxPrice = undefined;
      state.keyword = "";
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setMinPrice,
  setMaxPrice,
  setKeyword,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;