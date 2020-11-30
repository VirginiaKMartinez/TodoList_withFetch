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
				return resp.json();
			})
			.then(data => {})
			.catch(error => {});
		//console.log("lista items", itemList);
		setCurrentItem(""); //hace que se vacíe el input después de añadir un item.
	};

	useEffect(() => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/virginiak_martinez" //por defecto hace GET al no definir método
		)
			.then(response => response.json())
			.then(responseJSON => {
				updateItemList(responseJSON);
			});
	}, []);

	useEffect(() => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/virginiak_martinez",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(itemList)
			}
		)
			.then(response => response.json())
			.then(data => {})
			.catch(error => {});
	});
	const deleteAll = () => {
		updateItemList([
			{
				label: "cualquiercosa",
				done: false
			}
		]);

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/virginiak_martinez",
			{
				method: "PUT",
				body: JSON.stringify(),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				return resp.json();
			})
			.then(data => {})
			.catch(error => {});
	};
	return (
		<div className="App">
			<div className="App-body">
				<div className="Input-body">
					<input
						placeholder="Write your task..."
						value={currentItem}
						onChange={onChangeHandelr}
					/>
					<button className="buttonAddItem" onClick={addItemToList}>
						<i className="fas fa-plus" />
					</button>
				</div>
			</div>
			<hr className="line" />
			<div>
				<List itemList={itemList} updateItemList={updateItemList} />
			</div>
			<div className="TaskCounter">
				<p>{itemList.length} Tasks left</p>
			</div>
			<div className="buttonDeleteAll-body">
				<button
					id="buttonDeleteAll"
					onClick={() => {
						deleteAll();
					}}>
					Delete all tasks
				</button>
			</div>
		</div>
	);
}

export default App;
