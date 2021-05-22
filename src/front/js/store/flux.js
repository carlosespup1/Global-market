import { data } from "jquery";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// token: sessionStorage.getItem("my_token") || "",
			login: false,
			products: [],
			supermarket: [],
			cupons: [],
			fav: [],
			search: []
		},
		actions: {
			logged: () => {
				// let status = JSON.parse(sessionStorage.getItem("my_token"));
				setStore({ login: true });
				// status != true ? setStore({ login: false }) : setStore({ login: status });
			},
			logout: () => {
				setStore({ login: false });
			},

			// getToken: () => {
			// 	let my_tokenUnique = sessionStorage.getItem("my_token");
			// 	const store = getStore();
			// 	setStore({ my_token: my_tokenUnique });
			// },
			// logout: () => {
			// 	sessionStorage.removeItem("my_token");
			// 	window.location.reload(false);
			// },

			loadProducts: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us07.gitpod.io/api/product";
				const response = await fetch(url);
				const data = await response.json();
				console.log("fluxprod", data);
				setStore({ products: data.Results });
			},

			loadSupermarket: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us07.gitpod.io/api/market";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ supermarket: data.Results });
			},

			loadSearch: async (product, location) => {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
					product: product,
					location: location
				});

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				const fetchData = await fetch(
					"https://3001-moccasin-pigeon-4ixmcu8a.ws-us07.gitpod.io/api/product",
					requestOptions
				);
				const data = await fetchData.json();
				console.log("data", data);
				setStore({ search: data.Result });
			},

			loadCupons: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us07.gitpod.io/api/coupon";
				const response = await fetch(url);
				const data = await response.json();
				console.log("data", data);
				setStore({ coupons: data.Results });
			},

			loadFav: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us07.gitpod.io/api/cart";
				const response = await fetch(url);
				const data = await response.json();
				console.log("fav", data);
				setStore({ fav: data.Results });
			},

			EliminarFavorito: id => {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var requestOptions = {
					method: "DELETE",
					headers: myHeaders
				};

				fetch("https://3001-moccasin-pigeon-4ixmcu8a.ws-us07.gitpod.io/api/cart/" + id, requestOptions)
					.then(response => response.text())
					.then(result => {
						const NuevoArrayFavoritos = getStore().fav.filter((item, index) => {
							return item.id != id;
						});

						setStore({ fav: NuevoArrayFavoritos });
					})
					.catch(error => console.log("error", error));
			},

			AgregarFavoritos: (id, product_name) => {
				setStore({ fav: getStore().fav.concat([id, product_name]) });
			},
			//Probar remover favoritos.
			RemoverFavoritos: index => {
				const NuevoArrayFavoritos = getStore().fav.filter((item, index) => {
					return index !== indice;
				});

				setStore({ fav: NuevoArrayFavoritos });
			}
		}
	};
};

export default getState;
