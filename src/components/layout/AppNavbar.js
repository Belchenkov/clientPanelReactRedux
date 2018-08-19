import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

class AppNavbar extends Component {
    state = {
        isAuthenticated: false
    };

    static getDerivedStateFromProps(props, state) {
        const { auth } = props;

        if (auth.uid) {
            return { isAuthenticated: true }
        } else {
            return { isAuthenticated: false }
        }
    }

    onLogoutClick = e => {
        e.preventDefault();

        const { firebase } = this.props;
        firebase.logout();

    };

    render() {
        const { isAuthenticated } = this.state;
        const { auth } = this.props;
        const { allowRegistration } = this.props.settings;

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-info mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img alt="Logo" src="data:image/png;base64,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" />
                         ClientPanel
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarMain"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mr-auto">
                            { isAuthenticated  ? (
                                <li className="nav-item">
                                    <Link to="/" className="nav-link ml-5 nav-a">
                                        <i className="fas fa-wrench mr-1"></i>  Панель управления
                                    </Link>
                                </li>
                            ) : null}
                        </ul>
                        { isAuthenticated  ? (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <span className="nav-link">
                                        <i className="fas fa-user-check"></i> { auth.email }
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <a href="/settings" className="nav-link nav-a">
                                        <i className="fas fa-user-cog"></i> Настройки
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#!"
                                        className="nav-link nav-a"
                                        onClick={this.onLogoutClick}
                                    >
                                        <i className="fas fa-sign-out-alt"></i> Выйти
                                    </a>
                                </li>
                            </ul>
                        ) : null}

                        { !isAuthenticated ? (
                            <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link nav-a">
                                <i className="fas fa-sign-in-alt"></i> Войти</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link nav-a">
                                <i className="fas fa-registered"></i> Зарегистрироваться</Link>
                            </li>
                        </ul>
                        ) : null }
                        
                    </div>
                </div>
            </nav>
        );
    }
}

AppNavbar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
};

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth,
        settings: state.settings
    }))
)(AppNavbar);