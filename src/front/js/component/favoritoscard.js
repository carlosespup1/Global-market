import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal1 } from "../component/modal";
import { Context } from "../store/appContext";

export const FavoritosCard = props => {
	const { store, actions } = useContext(Context);
	const deleteFav = () => {
		const Id_Producto = props.id;

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			id: props.id
		});

		var requestOptions = {
			method: "DELETE",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch("https://3001-moccasin-pigeon-4ixmcu8a.ws-us07.gitpod.io/api/cart", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	};
	return (
		<div className="tarjeta">
			<div className="card" style={{ width: "16rem" }}>
				<img src={props.image} className="card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">{props.product_name}</h5>
					<ul>
						<p className="Precio"> Precio: ₡{props.price}</p>
						<p className="Precio"> Supermercado:</p>
					</ul>
					<button type="button" className="btn btn-outline-success float-right">
						<i className="fa fa-trash" onClick={() => deleteFav()} />
					</button>
				</div>
			</div>
		</div>
	);
};
FavoritosCard.propTypes = {
	id: PropTypes.number,
	price: PropTypes.number,
	product_name: PropTypes.string,
	image: PropTypes.string,
	category: PropTypes.string
};
