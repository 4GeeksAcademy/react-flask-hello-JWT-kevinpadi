import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Profile = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.profile();
        actions.validToken();
    }, []);
    return (
        <div className="container mt-5">
        <div className="card" style={{ maxWidth: '740px', margin: '0 auto' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src='https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg' className="img-fluid rounded-start" alt="Profile" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">User</h5>
                        <p className="card-text"><strong>Email:</strong> {store.dataUser?.email || 'Cargando..'}</p>
                        <p className="card-text"><strong>Id:</strong> {store.dataUser?.id || 'Cargando..'}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

