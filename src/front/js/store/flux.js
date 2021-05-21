const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// token: sessionStorage.getItem("my_token") || "",
			login: false,
			products: [],
			supermarket: [],
			cupons: [],
			fav: []
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
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/cart";
				const response = await fetch(url);
				const data = await response.json();
				console.log("fluxprod", data);
				setStore({ products: data.Results });
			},

			loadSupermarket: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/market";
				const response = await fetch(url);
				const data = await response.json();
				setStore({ supermarket: data.Results });
			},

			loadCupons: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/coupon";
				const response = await fetch(url);
				const data = await response.json();
				console.log("data", data);
				setStore({ coupons: data.Results });
			},

			loadFav: async () => {
				const url = "https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/cart";
				const response = await fetch(url);
				const data = await response.json();
				console.log("fav", data);
				setStore({ fav: data.Results });
			},

			AgregarFavoritos: (id, product_name) => {
				setStore({ favorites: getStore().favorites.concat([id, product_name]) });
			},
			//Probar remover favoritos.
			RemoverFavoritos: index => {
				const NuevoArrayFavoritos = getStore().favorites.filter((item, index) => {
					return index !== indice;
				});

				setStore({ favorites: NuevoArrayFavoritos });
			}
		}
	};
};

export default getState;
