import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.css";

export const Login = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	const { store, actions } = useContext(Context);

	const fetchToLogin = async (e) => {
		e.preventDefault()
		const login = await actions.login(email, password)

		if (login) {
			navigate('/profile')
		}
	}

	return (
		<div className="container d-flex justify-content-center flex-column col-10 col-md-5 mt-5 text-light">
			<h1 className="display-1 mt-5 pt-5">Login</h1>
			<form className="mt-4" onSubmit={fetchToLogin}>
				<div className="mb-3">
					<label className="form-label">Email address</label>
					<input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control bg-dark text-light" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
				</div>
				<div className="mb-3">
					<label className="form-label">Password</label>
					<input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control bg-dark text-light" id="exampleInputPassword1" required/>
				</div>
				<div className="mt-3">
					<button type="submit" className="btn btn-outline-primary">Ingresar</button>
					<Link to="/register">
						<button className="btn btn-outline-primary ms-2">Registrarme</button>
					</Link>
				</div>
			</form>
		</div>
	);
};
