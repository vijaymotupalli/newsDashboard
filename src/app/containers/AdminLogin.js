import React from "react";
import {setLoginSuccess, login} from "../actions/index";
import {connect} from "react-redux";
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './styles.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem("loginuser")) {
            this.props.setLoginSuccess(true);
        }else this.props.setLoginSuccess(false);
        this.state = {
            email: "",
            password: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const {email, password} = this.state;
        this.props.login(email, password);
        this.setState({
            email: '',
            password: ''
        });
    }

    render() {
        let {isLoginPending, isLoginSuccess, loginError} = this.props;
        return (
            <div>
                { isLoginSuccess && <Redirect to={{pathname: '/admin/dashboard/videos'}}/>}

                <div className="bgLogin">
                    <div className="logo"></div>
                    <section className="login">
                        <form className="form-signin" onSubmit={this.onSubmit}>
                            <div className="form-group pr">
                                <input type="text" className="form-control" placeholder="Email" name="email" required
                                       onChange={e => this.setState({email: e.target.value})} value={this.state.email}/>
                                <i className="mdi mdi-account" />
                            </div>
                            <div className="form-group pr">
                                <input type="password" className="form-control" placeholder="Password" name="password" required
                                       onChange={e => this.setState({password: e.target.value})} value={this.state.password}/>
                                <i className="mdi mdi-lock" />
                            </div>
                            <div className="form-group text-center">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label><input type="checkbox" name="rememberMe" value="1"/> Remember Password </label>
                                </div>
                                <div className="col-md-6 text-right">
                                </div>
                            </div>
                            <div className="text-center">
                                <label className="errorcolor">
                                    { isLoginPending && <div>Please wait...</div>  }
                                    { isLoginSuccess && <div>Success.</div> }
                                    { loginError && <div>{loginError}</div> }
                                </label>
                            </div>
                        </form>
                    </section>
                </div>
            </div>

        )
    }
}
;

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.Login.isLoginPending,
        isLoginSuccess: state.Login.isLoginSuccess,
        loginError: state.Login.loginError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoginSuccess: (status) => dispatch(setLoginSuccess(status)),
        login: (email, password) => dispatch(login(email, password))

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
