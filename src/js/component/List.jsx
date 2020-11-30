import React from "react";
import PropTypes from "prop-types";
import "../../styles/List.css";

function List(props) {
	//console.log("props", props);
	const deleteItem = key => {
		const newList = props.itemList.filter(itemObj => {
			return itemObj.label != key; //Va a devolver todos los items de la lista menos el item que hemos borrado
		});
		props.updateItemList(newList);
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/virginiak_martinez",
			{
				method: "PUT",
				body: JSON.stringify(newList), //lo que le mando  a la base de datos
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
		<div>
			{props.itemList.map((itemObj, index) => {
				//itemObj va a contener todos los items uno por uno
				if (itemObj.label != "cualquiercosa") {
					return (
						<div key={index} className="Item">
							<p>{itemObj.label}</p>
							<button
								className="buttonDeleteTask"
								onClick={() => deleteItem(itemObj.label)}>
								<i className="fas fa-minus" />
							</button>
						</div>
					);
				}
			})}
		</div>
	);
}

List.propTypes = {
	itemList: PropTypes.array,
	updateItemList: PropTypes.func
};

export default List;
