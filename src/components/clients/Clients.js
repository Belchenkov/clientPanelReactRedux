import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Clients extends Component {
    render() {
        const clients = [
            {
                id: '234234234',
                firstName: 'Kevin',
                lastName: 'Johnson',
                email: 'kevin@gmail.com',
                phone: '234-323-1233',
                balance: '30'
            },
            {
                id: '2342344534',
                firstName: 'Bob',
                lastName: 'Johnson',
                email: 'kevin@gmail.com',
                phone: '234-323-1233',
                balance: '30'
            }
        ];

        if (clients) {
            return (
                <div>
                   <div className="row">
                       <div className="col-md-6">
                           <h2>
                               {''}
                               <i className="fas fa-users"></i> Клиенты{''}
                           </h2>
                       </div>
                       <div className="col-md-6">

                       </div>
                   </div>
                    <table className="table text-lg-center mt-4 table-striped">
                        <thead className="thead-inverse bg-info text-white">
                        <tr>
                            <th>
                                <i className="fas fa-user-tie"></i> Имя</th>
                            <th>
                                <i className="far fa-envelope"></i> Email
                            </th>
                            <th>
                                <i className="fas fa-money-bill-wave"></i> Баланс
                            </th>
                            <th />
                        </tr>
                        </thead>
                        <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.firstName} {client.lastName}</td>
                                <td>{client.email}</td>
                                <td>{parseFloat(client.balance).toFixed(2)}</td>
                                <td>
                                    <Link
                                        to={`/clients/${client.id}`}
                                        className="btn btn-outline-dark btn-sm"
                                    >
                                        <i className="fas fa-arrow-circle-right"></i> Подробнее
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return <h1>Загрузка ...</h1>
        }
    }
}

export default Clients;