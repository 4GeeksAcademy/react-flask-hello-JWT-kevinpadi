import { Register } from "../pages/register";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentUser: null,
			dataUser: null,
			logged: false
		},
		actions: {
			profile: async () => {
				const requestOptions = {
					method: "GET",
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				};
				try {
					const response = await fetch('https://glorious-chainsaw-g475p49xxqxhpwqr-3001.app.github.dev/api/user', requestOptions);
					const data = await response.json();

					if (response.status === 200) {
						setStore({ dataUser: data.result });
					} else if (response.status === 400) {
						throw new Error('Bad Request: ' + data.msg);
					} else if (response.status === 500) {
						throw new Error('Internal Server Error: ' + data.msg);
					} else {
						throw new Error(data.msg || response.statusText);
					}
				} catch (error) {
					console.log('Fetch error: ', error);
				}
			},
			register: async (email, password) => {
				console.log(email, password);
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};
				console.log('antes del fetch register');
				try {
					const response = await fetch('https://glorious-chainsaw-g475p49xxqxhpwqr-3001.app.github.dev/api/user', options);
					const data = await response.json();

					if (response.status === 200) {
						return true;
					} else if (response.status === 400) {
						throw new Error('Bad Request: ' + data.msg);
					} else if (response.status === 500) {
						throw new Error('Internal Server Error: ' + data.msg);
					} else {
						throw new Error(data.msg || response.statusText);
					}
				} catch (error) {
					console.log('Fetch error: ', error);
					return false;
				}
			},
			login: async (email, password) => {
				const store = getStore();
				localStorage.setItem('token', null);
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};
				console.log('antes del fetch login');
				try {
					const response = await fetch('https://glorious-chainsaw-g475p49xxqxhpwqr-3001.app.github.dev/api/login', options);
					const data = await response.json();

					if (response.status === 200) {
						localStorage.setItem('token', data.token);
						setStore({ currentUser: { email: email } });
						setStore({ logged: true });
						return true;
					} else if (response.status === 400) {
						throw new Error('Bad Request: ' + data.msg);
					} else if (response.status === 500) {
						throw new Error('Internal Server Error: ' + data.msg);
					} else {
						throw new Error(data.msg || response.statusText);
					}
				} catch (error) {
					console.log('Fetch error: ', error);
					return false;
				}
			},
			validToken: async () => {
				const token = localStorage.getItem('token');
				const options = {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					}
				};
				try {
					const response = await fetch('https://glorious-chainsaw-g475p49xxqxhpwqr-3001.app.github.dev/api/valid-token', options);
					const data = await response.json();

					if (response.status === 200) {
						console.log('Token válido y usuario logeado');
						setStore({ logged: true });
						return true;
					} else if (response.status === 404) {
						setStore({ logged: false });
						console.log('Token no válido y usuario no logeado');
						throw new Error('Bad Request: ' + data.msg);
					} else {
						setStore({ logged: false });
						throw new Error(data.msg || response.statusText);
					}
				} catch (error) {
					setStore({ logged: false });
					console.log('Fetch error: ', error);
					console.log('Token no válido y usuario no logeado');

					return false;
				}
			}

		}
	};
};

export default getState;
