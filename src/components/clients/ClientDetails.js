import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';

class ClientDetails extends Component {

    render() {
        const { client } = this.props;

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
                                ><i class="far fa-edit"></i> Редактировать</Link>
                                <button className="btn btn-danger">
                                    Удалить <i class="far fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>  
                    <div className="card">
                        <h3 className="card-header text-lg-center bg-info text-white font-weight-bold">
                            <i class="fas fa-user-tie"></i> {client.firstName} {client.lastName}
                        </h3>
                        <hr/>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8 col-sm-6">
                                    <h4>
                                        <i class="fas fa-hashtag"></i> ID: {' '} <span className="text-dark">{client.id}</span>
                                    </h4>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <h3 className="pull-rig">
                                        <i class="fas fa-money-bill"></i> 
                                         {' '}Баланс: 
                                        <span 
                                            className={classnames({
                                                'text-danger': client.balance > 0,
                                                'text-success': client.balance === 0
                                            })}
                                        >
                                          ${parseFloat(client.balance).toFixed(2)}</span>
                                    </h3>
                                    {/*Balance Form*/}
                                </div>
                            </div>
                            <ul className="list-grou">
                                <li className="list-group-item">
                                    <i class="far fa-envelope"></i> Email: {client.email}
                                </li>
                                <li className="list-group-item">
                                    <i class="fas fa-phone"></i> Телефон {client.phone}
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