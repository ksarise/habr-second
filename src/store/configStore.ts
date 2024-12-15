import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Review, ReviewsState } from "../types";

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    fetchReviewsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchReviewsSuccess(state, action: PayloadAction<Review[]>) {
      state.loading = false;
      state.reviews = action.payload;
    },
    fetchReviewsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchReviewsStart, fetchReviewsSuccess, fetchReviewsFailure } =
  reviewsSlice.actions;

export default reviewsSlice.reducer;
