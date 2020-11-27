import React, { useState, useEffect } from "react";
import "../../styles/App.css";
import List from "./List.jsx";
import PropTypes from "prop-types";

function App() {
	const [currentItem, setCurrentItem] = useState(null);
	const [itemList, updateItemList] = useState([]);
	const onChangeHandelr = e => {
		//console.log("check current value", e.target.value);
		setCurrentItem(e.target.value); //guarda el nuevo Item introducido por el usuario
	};
	const addItemToList = () => {
		//key es para añadirle un identificador único a cada item y así poder borrarlos de manera individual.
		updateItemList([...itemList, { label: currentItem, done: false }]); //va a ir añadiendo los nuevos items empujando en la lista los que ya existan. Nos saca la lista actualizada.

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/virginiak_martinez",
			{
				method: "PUT",
				body: JSON.stringify(itemList), //lo que le mando  a la base de datos
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				console.log(resp.json);
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
		//console.log("lista items", itemList);
		setCurrentItem(""); //hace que se vacíe el input después de añadir un item.
	};

	useEffect(() => {
		console.log("renderizo useEffect");
		/*fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/virginiak_martinez"
		)
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				updateItemList(data);
				console.log(itemList);
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
            });*/
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/virginiak_martinez" //por defecto hace GET al no definir método
		)
			.then(response => response.json())
			.then(responseJSON => {
				updateItemList(responseJSON);
				console.log(responseJSON);
			});
	}, []);

	return (
		<div className="App">
			<div className="App-body">
				<div className="Input-body">
					<input
						placeholder="Write your task..."
						value={currentItem}
						onChange={onChangeHandelr}
					/>
					<button onClick={addItemToList}>+</button>
				</div>
			</div>
			<hr className="line" />
			<div>
				<List itemList={itemList} updateItemList={updateItemList} />
			</div>
		</div>
	);
}

export default App;
