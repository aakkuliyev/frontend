// src/Pages/LogoutPage.jsx
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import  "./CSS/LogoutPage.css";

export default class LogoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    componentDidMount() {
        // Удаляем токен
        localStorage.removeItem("token");

        // Ждём 1.5 сек и редиректим
        setTimeout(() => {
            this.setState({ redirect: true });
        }, 1500);
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/" replace />;
        }

        return (
            <div className="logout-page">
                <h2>Logging out...</h2>
                <p>You are being safely redirected.</p>
            </div>
        );
    }
}
