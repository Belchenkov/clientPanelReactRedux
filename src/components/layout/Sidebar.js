import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Clients extends Component {
    render() {
        return (
            <Link to="/client/add" className="btn btn-success btn-block">
                <i className="fas fa-plus"></i> Добавить
            </Link>
        );
    }
}

export default Clients;