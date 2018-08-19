import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    setAllowRegistration,
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit
} from '../../actions/settingsActions';

class Settings extends Component {

    render() {
        const {
            disableBalanceOnAdd,
            disableBalanceOnEdit,
            allowRegistration
        } = this.props.settings;

        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link back-link text-secondary">
                            <i className="fas fa-arrow-circle-left"></i> В панель управления
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header"> Настройки</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="allowRegistration">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        name="allowRegistration"
                                        id="allowRegistration"
                                        checked={!!allowRegistration}
                                        onChange={this.allowRegistration}
                                    /> Позволить регистрироваться новым пользователям
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="disableBalanceOnAdd">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        name="disableBalanceOnAdd"
                                        id="disableBalanceOnAdd"
                                        checked={!!disableBalanceOnAdd}
                                        onChange={this.disableBalanceOnAdd}
                                    /> Скрыть баланс на добавление
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="disableBalanceOnEdit">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        name="disableBalanceOnEdit"
                                        id="disableBalanceOnEdit"
                                        checked={!!disableBalanceOnEdit}
                                        onChange={this.disableBalanceOnEdit}
                                    /> Скрыть баланс на редактирование
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired
};

export default connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
}), {
    setAllowRegistration,
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit
})(Settings);