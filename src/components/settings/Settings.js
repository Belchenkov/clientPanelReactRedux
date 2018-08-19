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
    disableBalanceOnAddChange = () => {
        const { setDisableBalanceOnAdd } = this.props;
        setDisableBalanceOnAdd();
    };
    disableBalanceOnEditChange = () => {
        const { setDisableBalanceOnEdit } = this.props;
        setDisableBalanceOnEdit();
    };

    allowRegistrationChange = () => {
        const { setAllowRegistration } = this.props;
        setAllowRegistration();
    };

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
                    <h4 className="card-header bg-info text-lg-center text-white font-weight-bold">
                        <i className="fas fa-cogs"></i> Настройки
                    </h4>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="allowRegistration">
                                    <input
                                        type="checkbox"
                                        name="allowRegistration"
                                        id="allowRegistration"
                                        checked={!!allowRegistration}
                                        onChange={this.allowRegistrationChange}
                                    /> Позволить регистрироваться новым пользователям
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="disableBalanceOnAdd">
                                    <input
                                        type="checkbox"
                                        name="disableBalanceOnAdd"
                                        id="disableBalanceOnAdd"
                                        checked={!!disableBalanceOnAdd}
                                        onChange={this.disableBalanceOnAddChange}
                                    /> Скрыть баланс на добавление
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="disableBalanceOnEdit">
                                    <input
                                        type="checkbox"
                                        name="disableBalanceOnEdit"
                                        id="disableBalanceOnEdit"
                                        checked={!!disableBalanceOnEdit}
                                        onChange={this.disableBalanceOnEditChange}
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