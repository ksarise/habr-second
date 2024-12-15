import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reviewsReducer from "./configStore";
import reviewsSaga from "./configSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(reviewsSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;