import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

 class Login extends Component {
   state = {
       email: '',
       password: ''
   };

   onChange = e => this.setState({ [e.target.name]: e.target.value });

   onSubmit = e => {
       e.preventDefault();

       const { firebase } = this.props;
       const { email, password } = this.state;

       firebase.login({
           email,
           password
       }).catch(err => alert('Невалидные Email или пароль!'));
   };

  render() {
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
            <div className="card">
                <div className="card-body">
                    <h1 className="text-lg-center pb-4 pt-3">
                        <span className="text-info">
                            <i className="fas fa-lock"></i> Войти
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
                                <i className="fas fa-sign-in-alt"></i> Войти
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

Login.PropTypes = {
  firebase: PropTypes.object.isRequired
}

export default firebaseConnect()(Login);