import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';

class ClientDetails extends Component {
    state = {
        showBalanceUpdate: false,
        balanceUpdateAmount: ''
    };

    onChange = e => this.setState({[e.target.name]: e.target.value});

    // Update Balance
    balanceSubmit = e => {
        e.preventDefault();

        const { client, firestore } = this.props;
        const { balanceUpdateAmount } = this.state;

        const clientUpdate = {
            balance: parseFloat(balanceUpdateAmount)
        };

        // Update in firestore
        firestore.update({collection: 'clients', doc: client.id}, clientUpdate);

        // Disabled Update Form
        this.setState({
            showBalanceUpdate: false
        });
    };

    // Delete Client
    onDeleteClick = () => {
        const { client, firestore, history } = this.props;

        firestore.delete({collection: 'clients', doc: client.id})
            .then(history.push('/'))
    }

    render() {
        const { client } = this.props;
        const { showBalanceUpdate, balanceUpdateAmount } = this.state;

        let balanceForm = '';

        // If balance form should display
        if (showBalanceUpdate) {
            balanceForm = (
                <form onSubmit={this.balanceSubmit}>
                    <div className="input-group my-3">
                        <input 
                            type="text" 
                            className="form-control"
                            name="balanceUpdateAmount"    
                            placeholder="Обновить баланс ..."
                            value={balanceUpdateAmount}
                            onChange={this.onChange}
                        />
                        <div className="input group-append">
                            <button 
                                className="btn btn-dark"
                                type="submit"
                            >Обновить</button>
                        </div>
                    </div>
                </form>
            );
        } else {
            balanceForm = null;
        }

        if (client) {
            return (
                <div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link back-link text-secondary">
                                <i className="fas fa-arrow-circle-left"></i> В панель управления
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <div className="btn-group float-right">
                                <Link 
                                    to={`/client/edit/${client.id}`} 
                                    className="btn btn-dark"
                                ><i className="far fa-edit"></i> Редактировать</Link>
                                <button 
                                    className="btn btn-danger"
                                    onClick={this.onDeleteClick}    
                                >
                                    Удалить <i className="far fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>  
                    <div className="card">
                        <h3 className="card-header text-lg-center bg-info text-white font-weight-bold">
                            <i className="fas fa-user-tie"></i> {client.firstName} {client.lastName}
                        </h3>
                        <hr/>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8 col-sm-6">
                                    <h4>
                                        <i className="fas fa-hashtag"></i> ID: {' '} <span className="text-dark">{client.id}</span>
                                    </h4>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <h3 className="pull-rig">
                                        <i className="fas fa-money-bill"></i> 
                                         {' '}Баланс: 
                                        <span 
                                            className={classnames({
                                                'text-danger': client.balance > 0,
                                                'text-success': client.balance === 0
                                            })}
                                        >
                                          ${parseFloat(client.balance).toFixed(2)}</span>
                                          <small className="ml-4">
                                              <a href="#!" onClick={() => this.setState({
                                                  showBalanceUpdate: !this.state.showBalanceUpdate
                                              })}>
                                                 <i className="fas fa-pencil-alt text-dark"></i>
                                              </a>
                                          </small>
                                    </h3>
                                    { balanceForm }
                                </div>
                            </div>
                            <ul className="list-grou">
                                <li className="list-group-item">
                                    <i className="far fa-envelope"></i> Email: {client.email}
                                </li>
                                <li className="list-group-item">
                                    <i className="fas fa-phone"></i> Телефон {client.phone}
                                </li>
                            </ul>
                        </div>
                    </div>              
                </div>
            );
        } else {
            return <Spinner />
        }
    }
}

ClientDetails.PropTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0] 
    }))
)(ClientDetails);