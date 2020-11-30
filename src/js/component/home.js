import React from "react";
import App from "./App.jsx";
import PropTypes from "prop-types";
import "../../styles/home.css";

//create your first component
export function Home() {
	return (
		<div className="text-center mt-5">
			<h2 className="textH2">
				<i className="fab fa-react" />
				React
			</h2>
			<h1 className="textH1">ToDo List</h1>
			<App />
		</div>
	);
}
