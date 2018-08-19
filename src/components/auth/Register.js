import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from "../../actions/notifyActions";
import Alert from '../layout/Alert';

class Login extends Component {
   state = {
       email: '',
       password: ''
   };

   componentWillMount() {
     const { allowRegistration } = this.props.settings;

     if (!allowRegistration) {
        this.props.history.push('/');
     }
   }

   onChange = e => this.setState({ [e.target.name]: e.target.value });

   onSubmit = e => {
       e.preventDefault();

       const { firebase, notifyUser } = this.props;
       const { email, password } = this.state;

      // Register with firebase
      firebase.createUser({ email, password }).catch(err => 
      notifyUser('Такой пользователь уже существует!', 'error'))
   };

  render() {
    const { message, messageType } = this.props.notify;

    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
            <div className="card">
                <div className="card-body">
                    {message ? (<Alert message={message} messageType={messageType} />) : null}
                    <h1 className="text-lg-center pb-4 pt-3">
                        <span className="text-info">
                            <i className="fas fa-registered"></i> Регистрация
                        </span>
                    </h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">
                                <i className="far fa-envelope"></i> Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                required
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">
                                <i className="fas fa-key"></i> Пароль
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                required
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-info btn-block">
                                <i className="fas fa-registered"></i> Зарегистрироваться
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
    firebaseConnect(),
    connect(
        (state, props) => ({
        notify: state.notify,
        settings: state.settings
    }), {notifyUser})
)(Login);