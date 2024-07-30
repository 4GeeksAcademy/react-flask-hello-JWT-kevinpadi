import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { store, actions } = useContext(Context)
	useEffect(() => {

		const checkToken = async () => {
			await actions.validToken();
			if(localStorage.getItem('token')){
				store.logged = true
			}
		};
		checkToken();
	}, [location.pathname]);

	const logOut = () => {
		localStorage.removeItem('token')
		navigate('/');
	}
	
	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 text-light">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{(store.logged) &&
						<button className="btn btn-outline-danger" onClick={logOut}>Log out</button>
					}

				</div>
			</div>
		</nav>
	);
};
