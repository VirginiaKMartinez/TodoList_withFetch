import React from "react";
import App from "./App.jsx";
import PropTypes from "prop-types";

//create your first component
export function Home() {
	return (
		<div className="text-center mt-5">
			<h1>
				<i className="fab fa-react" />
				React ToDo List
			</h1>
			<App />
		</div>
	);
}
