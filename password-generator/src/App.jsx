import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
	const [password, setPassword] = useState("");

	// useRef
	const passRef = useRef(null);

	const copyPassToClipboard = useCallback(() => {
		passRef.current?.select();
		// passRef.current?.setSelectionRange(0, 5);
		window.navigator.clipboard.writeText(password);
	}, [password]);

	//useCallback for optimization
	const passwordGenerator = useCallback(() => {
		let pass = "";
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

		if (numberAllowed) str += "0123456789";
		if (specialCharAllowed) str += "{}[]()*&!@#$%^?~+=-_";

		for (let i = 0; i < length; i++) {
			let char = Math.floor(Math.random() * str.length + 1);
			pass += str.charAt(char);
		}

		setPassword(pass);
	}, [length, numberAllowed, specialCharAllowed, setPassword]);

	useEffect(() => {
		passwordGenerator();
	}, [length, numberAllowed, specialCharAllowed, passwordGenerator]);

	// const passwordGenerator = useEffect(() => {
	// 	let pass = "";
	// 	let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	// 	if (numberAllowed) str += "0123456789";
	// 	if (specialCharAllowed) str += "{}[]()*&!@#$%^?~+=-_";

	// 	for (let i = 0; i < length; i++) {
	// 		let char = Math.floor(Math.random() * str.length + 1);
	// 		pass += str.charAt(char);
	// 	}

	// 	setPassword(pass);
	// }, [length, numberAllowed, specialCharAllowed, setPassword]);

	return (
		<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-600">
			<h1 className="text-white text-center my-1">Password Generator</h1>
			<div className="flex shadow rounded-lg overflow-hidden mb-4">
				<input
					type="text"
					value={password}
					className="w-full outline-none py-1 px-3"
					style={{ backgroundColor: "white" }}
					placeholder="Password"
					readOnly
					ref={passRef}
				/>
				<button
					onClick={copyPassToClipboard}
					className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
				>
					Copy
				</button>
			</div>
			<div className="flex text-sm gap-x-2">
				<div className="flex items-center gap-x-1">
					<input
						type="range"
						min={5}
						max={50}
						value={length}
						className="cursor-pointer"
						onChange={(e) => {
							setLength(e.target.value);
						}}
					/>
					<label>Length: {length}</label>
				</div>
				<div className="flex items-center gap-x-1">
					<input
						type="checkbox"
						defaultChecked={numberAllowed}
						id="numberInput"
						onChange={() => {
							setNumberAllowed((prev) => !prev);
						}}
					/>
					<label htmlFor="numberInput">Numbers</label>
				</div>
				<div className="flex items-center gap-x-1">
					<input
						type="checkbox"
						defaultChecked={specialCharAllowed}
						id="specialCharInput"
						onChange={() => {
							setSpecialCharAllowed((prev) => !prev);
						}}
					/>
					<label htmlFor="specialCharInput">Special Char</label>
				</div>
			</div>
		</div>
	);
}

export default App;
