import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice"; // import the reducer from the slice

export const store = configureStore({
	reducer: todoReducer, // reducer is the key and todoReducer is the value
	// todoReducer is the reducer function that was created in the slice
}); //it takes object in it
