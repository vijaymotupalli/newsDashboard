import React from "react";
import {setLoginSuccess, login} from "../actions/index";
import {connect} from "react-redux";
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './styles.css';


class SuperAdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillMount(props){
        if (localStorage.getItem("loginuser")) {
            this.props.setLoginSuccess(true);
            this.props.history.push("/dashboard/videos")
        }else this.props.setLoginSuccess(false);
    }

    onSubmit(e) {
        e.preventDefault();
        const {email, password} = this.state;
        this.props.login(email, password).then((result)=>{
            this.props.history.push("/dashboard/videos")
        });
        this.setState({
            email: '',
            password: ''
        });
    }

    render() {
        let {isLoginPending, isLoginSuccess, loginError} = this.props;
        return (
            <div>
                <section className="login-block">
                    <div className="container login">
                        <div className="row">
                            <div className="login-sec">
                                <h2 className="text-center">Login Now</h2>
                                <form className="login-form" onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Username</label>

                                        <i className="fa fa-envelope-o" />
                                            <input type="text" className="form-control" placeholder="Enter Email"
                                                   onChange={e => this.setState({email: e.target.value})} value={this.state.email}
                                            />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                        <input type="password" className="form-control" placeholder="Enter Password"
                                               onChange={e => this.setState({password: e.target.value})} value={this.state.password}/>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="checkbox" className="form-check-input" />
                                                <small> Remember Me</small>
                                        </label>
                                        <br/>
                                        <div className="text-center">
                                            <label className="errorcolor">
                                                { isLoginPending && <div>Please wait...</div>  }
                                                { isLoginSuccess && <div>Success.</div> }
                                                { loginError && <div>{loginError}</div> }
                                            </label><br/>
                                            <button type="submit" className="btn btn-login float-right">Submit</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            {/*<div className="col-md-8 banner-sec">*/}
                            {/*</div>*/}
                        </div>
                        </div>
                </section>
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


export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminLogin);
