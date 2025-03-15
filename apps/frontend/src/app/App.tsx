import { useState } from "react";

export default function App() {
	const [data, setData] = useState("nodatalol");

	const handleFetch = async () => {
		const resp = await fetch("http://localhost:3333/api");
		setData(JSON.stringify(await resp.json()));
	}

	return (
		<>
			<button onClick={handleFetch}>fetch!</button>
			<p>{data}</p>
		</>
	)
}