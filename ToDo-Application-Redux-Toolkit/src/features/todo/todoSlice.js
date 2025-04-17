import { createSlice, nanoid } from "@reduxjs/toolkit"; // nanoid is a function that generates unique IDs
// slice is a function that creates a slice of the state
// slice is a function that takes an object and returns an object

const initialState = {
	todos: [{ id: 1, text: "Hello World" }],
};

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			const todo = {
				id: nanoid(), // generates a unique id
				text: action.payload,
			};

			state.todos.push(todo); // push the todo to the todos array
		}, // state is the current state and action is the action that was dispatched
		removeTodo: (state, action) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload); // filter the todos array to remove the todo with the id that was passed in the action
		},
	},
});
// task : update Todo

export const { addTodo, removeTodo } = todoSlice.actions; // destructuring the actions from the slice
// export the actions so they can be used in the components
export default todoSlice.reducer; // export the reducer so it can be used in the store
