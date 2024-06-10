import authReducer from "./slices/auth-slice";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
// 	persistStore,
// 	persistReducer,
// 	FLUSH,
// 	REHYDRATE,
// 	PAUSE,
// 	PERSIST,
// 	PURGE,
// 	REGISTER,
// } from "redux-persist";

// const persistConfig = {
// 	key: "root",
// 	storage: AsyncStorage,
// };

const rootReducer = combineReducers({
	auth: authReducer,
});

// const middleware = (getDefaultMiddleware) =>
// 	getDefaultMiddleware({
// 		serializableCheck: {
// 			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// 		},
// 	});

const store = configureStore({
	reducer: rootReducer,
	// middleware: middleware,
});

export default store;
