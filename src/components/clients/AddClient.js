import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: ''

    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newClient = this.state;

        const { firestore, history } = this.props;

        // If no balance, make 0
        if (newClient.balance === '') {
            newClient.balance = 0;
        }

        firestore.add({
            collection: 'clients'
        }, newClient).then(() => history.push('/'));
    };

    render() {
        const { disableBalanceOnAdd } = this.props.settings;

        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link back-link text-secondary">
                            <i className="fas fa-arrow-circle-left"></i> В панель управления
                        </Link>
                    </div>
                    <div className="col-md-6"></div>
                </div>

                <div className="card mt-3">
                    <h4 className="card-header bg-info text-white text-lg-center">
                        <i className="fas fa-user-plus"></i> Добавить клиента
                    </h4>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="fistName" className="font-weight-bold">
                                    <i className="fas fa-user-circle"></i> Имя
                                </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fistName"
                                        name="firstName"
                                        minLength="2"
                                        required
                                        onChange={this.onChange}
                                        value={this.state.firstName}
                                    />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName" className="font-weight-bold">
                                    <i className="far fa-user-circle"></i> Фамилия
                                </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        minLength="2"
                                        required
                                        onChange={this.onChange}
                                        value={this.state.lastName}
                                    />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="font-weight-bold">
                                    <i className="far fa-envelope"></i> Email
                                </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        required
                                        onChange={this.onChange}
                                        value={this.state.email}
                                    />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="font-weight-bold">
                                    <i className="far fa-envelope"></i> Телефон
                                </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        minLength="10"
                                        required
                                        onChange={this.onChange}
                                        value={this.state.phone}
                                    />
                            </div>

                            <div className="form-group">
                                <label htmlFor="balance" className="font-weight-bold">
                                    <i className="fas fa-dollar-sign"></i> Баланс
                                </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="balance"
                                        name="balance"
                                        onChange={this.onChange}
                                        value={this.state.balance}
                                        disabled={disableBalanceOnAdd}
                                    />
                            </div>

                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-outline-dark btn-block font-weight-bold"
                                >
                                    <i className="fas fa-user-plus" /> Добавить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


AddClient.propTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
};


export default compose(
    firestoreConnect(),
    connect((state, props) => ({
        settings: state.settings
    }))
)(AddClient);