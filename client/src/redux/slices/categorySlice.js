import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCategories } from "../../api/product";

// ✅ 1️⃣ Async thunk to fetch categories from backend
export const getCategories = createAsyncThunk(
  "categories/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchAllCategories(); // calls your /product/categories API
      return res.data; // returns the array of categories
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ 2️⃣ Slice definition
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [], // will store array of categories
    loading: false, // spinner control
    error: null, // store errors if API fails
  },
  reducers: {
    // You can add manual reducers later (like clearCategories)
  },
  extraReducers: (builder) => {
    builder
      // When API starts loading
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // When API call succeeds
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      // When API call fails
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      });
  },
});

// ✅ 3️⃣ Export reducer
export default categorySlice.reducer;
