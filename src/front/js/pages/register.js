import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Register = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const { store, actions } = useContext(Context);

	const fetchToRegister = async(e) => {
		e.preventDefault()
		const registro = await actions.register(email, password)
		if(registro){
			navigate('/')
		}
	}

	return (
		<div className="container d-flex justify-content-center  flex-column col-10 col-md-5 mt-5 text-light">
			<h1 className="display-1 mt-5 pt-5">Registro</h1>
			<form className="mt-4" onSubmit={fetchToRegister}>
				<div className="mb-3">
					<label className="form-label">Email address</label>
					<input onChange={(e)=> setEmail(e.target.value)}  type="email" className="form-control bg-dark text-light" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				</div>
				<div className="mb-3">
					<label className="form-label">Password</label>
					<input onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control bg-dark text-light" id="exampleInputPassword1"/>
				</div>
				<button type="submit" className="btn btn-outline-primary">Registrarme</button>
			<Link to="/">
				<button className="btn btn-outline-primary ms-2">Ya tengo cuenta</button>
			</Link>
			</form>
		</div>
	);
};
