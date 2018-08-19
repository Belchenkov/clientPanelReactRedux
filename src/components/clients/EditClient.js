import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class EditClient extends Component {
  constructor(props) {
    super(props);

    // Create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const { client, firestore, history } = this.props;

    // Update Clients
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value
    }

    // Update client in firestore
    firestore.update({ collection: 'clients', doc: client.id }, updClient)
      .then(history.push('/'));
  }

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;

    if (client) {
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
                  <i className="fas fa-user-edit"></i> Редактировать клиента
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
                                  ref={this.firstNameInput}
                                  defaultValue={client.firstName}
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
                                  ref={this.lastNameInput}
                                  required
                                  defaultValue={client.lastName}
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
                                  ref={this.emailInput}
                                  required
                                  defaultValue={client.email}
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
                                  ref={this.phoneInput}
                                  required
                                  defaultValue={client.phone}
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
                                  ref={this.balanceInput}
                                  name="balance"
                                  defaultValue={client.balance}
                                  disabled={disableBalanceOnEdit}
                              />
                      </div>

                      <div className="form-group">
                          <button
                              type="submit"
                              className="btn btn-outline-dark btn-block font-weight-bold"
                          >
                              <i className="fas fa-edit" /> Обновить
                          </button>
                      </div>
                  </form>
              </div>
          </div>
        </div>
      )
    } else {
      return <Spinner />
    }

    
  }
}

EditClient.PropTypes = {
  firestore: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [
      { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
      client: ordered.client && ordered.client[0],
      settings: settings 
  }))
)(EditClient);